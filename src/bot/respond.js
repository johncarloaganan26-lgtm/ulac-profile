// Turns a visitor question into a reply. Pure logic: no API, no key, no network.
import { bestMatch, ACCEPT, CLARIFY } from './match';
import { intents, FALLBACK } from './intents';
import { logUnmatched } from './log';

export { ACCEPT, CLARIFY };

// Open-ended follow-ups ("what about...?", "tell me more") reuse the previous topic.
const RELATIVE_STARTS = [
  'what about', 'how about', 'tell me more', 'more details', 'more about',
  'go on', 'anything else', 'what else', 'and then', 'elaborate',
  'why', 'really', 'continue', 'more'
];

const rotation = {};

function pickReply(intent) {
  const replies = intent.replies || [];
  if (!replies.length) return '';
  const index = (rotation[intent.id] || 0) % replies.length;
  rotation[intent.id] = index + 1;
  return replies[index];
}

export function respond(text, ctx = {}) {
  const match = bestMatch(text);
  const { intent, score, normQuery } = match;

  // Empty / whitespace input.
  if (!normQuery) {
    return {
      text: FALLBACK.replies[0],
      chips: FALLBACK.chips,
      links: [],
      intentId: null,
      score: 0,
      matched: false,
      clarify: false
    };
  }

  if (intent && score >= ACCEPT) {
    return {
      text: pickReply(intent),
      chips: intent.chips || [],
      links: intent.links || [],
      intentId: intent.id,
      score,
      matched: true,
      clarify: false
    };
  }

  // Relative follow-up carrying the previous topic.
  const isRelative = RELATIVE_STARTS.some(r => normQuery === r || normQuery.startsWith(r));
  if (isRelative && ctx.lastIntentId) {
    const previous = intents.find(i => i.id === ctx.lastIntentId);
    if (previous) {
      return {
        text: pickReply(previous),
        chips: previous.chips || [],
        links: previous.links || [],
        intentId: previous.id,
        score: Math.max(score, ACCEPT),
        matched: true,
        clarify: false,
        contextual: true
      };
    }
  }

  // Near miss: confirm before answering.
  if (intent && score >= CLARIFY) {
    return {
      text: `Not sure I caught that — did you mean: \u201c${intent.question}\u201d?`,
      chips: intent.question ? [intent.question] : [],
      links: [],
      intentId: intent.id,
      score,
      matched: false,
      clarify: true
    };
  }

  // Miss: log it so it becomes the next intent, then offer a way forward.
  logUnmatched(text);
  return {
    text: FALLBACK.replies[0],
    chips: FALLBACK.chips,
    links: [],
    intentId: FALLBACK.id,
    score,
    matched: false,
    clarify: false
  };
}
