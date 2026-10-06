import { normalize, contentTokens, levenshtein, closeEnough } from '../normalize';
import { respond } from '../respond';
import { intents, FALLBACK } from '../intents';
import { getUnmatched, clearUnmatched } from '../log';

beforeEach(() => clearUnmatched());

describe('normalisation', () => {
  test('lowercases, strips punctuation and collapses spaces', () => {
    expect(normalize('  What\u2019s UP?!  ')).toBe('whats up');
  });

  test('drops stopwords so scoring sees the content words', () => {
    expect(contentTokens('what are his skills')).toEqual(['skills']);
    expect(contentTokens('what can you do')).toEqual(['what', 'can', 'you', 'do']);
  });

  test('typo distance helpers', () => {
    expect(levenshtein('skill', 'skil')).toBe(1);
    expect(levenshtein('skills', 'skil')).toBe(2);
    expect(closeEnough('skils', 'skill')).toBe(true);
    expect(closeEnough('cat', 'car')).toBe(false); // too short to fuzzy-match
  });
});

describe('intent matching', () => {
  const cases = [
    ['hi there', 'greeting'],
    ['what are his skills', 'skills'],
    ['what stack does he use', 'skills'],
    ['skils', 'skills'], // typo
    ['tell me about dormpulse', 'dormpulse'],
    ['tell me about laundro', 'laundrosaas'],
    ['how do i reach him', 'contact'],
    ['where does he study', 'education'],
    ['is he available for work', 'availability'],
    ['what has he built', 'projects'],
    ['who are you', 'bot'],
    ['what is the weather tomorrow', 'offtopic'],
    ['where can i see his resume', 'resume'],
    ['how much does he charge', 'pricing']
  ];

  test.each(cases)('%s → %s', (question, expectedId) => {
    const result = respond(question);
    expect(result.matched).toBe(true);
    expect(result.intentId).toBe(expectedId);
    expect(result.text.length).toBeGreaterThan(0);
  });

  test.each(
    intents.filter(i => i.question).map(i => [i.question, i.id])
  )('canonical question %s → %s', (question, expectedId) => {
    expect(respond(question).intentId).toBe(expectedId);
  });
});

describe('fallback behaviour', () => {
  test('unknown question falls back, offers chips, and is logged', () => {
    const result = respond('what is the airspeed velocity of an unladen swallow');
    expect(result.matched).toBe(false);
    expect(result.intentId).toBe(FALLBACK.id);
    expect(result.chips.length).toBeGreaterThan(0);
    expect(getUnmatched().some(e => e.q.includes('airspeed'))).toBe(true);
  });

  test('near miss asks for clarification instead of guessing', () => {
    const result = respond('please tell me about that job thing random place');
    expect(result.clarify).toBe(true);
    expect(result.matched).toBe(false);
    expect(result.chips).toEqual(['What is his work experience?']);
  });

  test('empty input still gets a useful reply', () => {
    const result = respond('   ');
    expect(result.matched).toBe(false);
    expect(result.text.length).toBeGreaterThan(0);
  });

  test('never echoes raw input back (no XSS surface)', () => {
    const result = respond('<script>alert(1)</script>');
    expect(result.text).not.toContain('<script>');
    expect(result.text).not.toContain('alert(1)');
  });
});

describe('context follow-ups', () => {
  test('carries the previous topic into relative questions', () => {
    const first = respond('what are his skills');
    expect(first.intentId).toBe('skills');

    const second = respond('what about that?', { lastIntentId: first.intentId });
    expect(second.intentId).toBe('skills');
    expect(second.contextual).toBe(true);
  });
});

describe('knowledge base integrity', () => {
  test('every suggested chip resolves to a real answer', () => {
    [...intents, FALLBACK].forEach(intent => {
      (intent.chips || []).forEach(chip => {
        expect({ chip, matched: respond(chip).matched }).toEqual({ chip, matched: true });
      });
    });
  });

  test('every intent has replies and a unique id', () => {
    const ids = new Set();
    [...intents, FALLBACK].forEach(intent => {
      expect(Array.isArray(intent.replies) && intent.replies.length > 0).toBe(true);
      expect(ids.has(intent.id)).toBe(false);
      ids.add(intent.id);
    });
  });

  test('links are safe hrefs', () => {
    intents.forEach(intent => {
      (intent.links || []).forEach(link => {
        expect(link.label).toBeTruthy();
        expect(link.href).toMatch(/^(https?:\/\/|\/|mailto:)/);
      });
    });
  });

  test('rotates reply variants so repeats do not sound robotic', () => {
    const first = respond('what are his skills').text;
    const second = respond('what are his skills').text;
    expect(first).not.toBe(second);
  });
});
