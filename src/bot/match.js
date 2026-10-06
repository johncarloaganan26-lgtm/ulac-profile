// Intent scoring: phrases beat keywords, keywords tolerate typos.
import { normalize, contentTokens, closeEnough } from './normalize';
import { intents } from './intents';

// A question is confidently answered at/above ACCEPT, offered as a
// "did you mean?" between CLARIFY and ACCEPT, and falls through below that.
export const ACCEPT = 0.5;
export const CLARIFY = 0.32;

const MAX_KEYWORD_SCORE = 0.88;

export function scoreIntent(intent, normQuery, qTokens) {
  let best = 0;

  // Phrases must match on token boundaries — otherwise "hi" fires inside
  // "thing", "him" and "his" and hijacks every question.
  const padded = ` ${normQuery} `;
  const queryTokens = normQuery ? normQuery.split(' ') : [];
  for (const raw of intent.patterns || []) {
    const pattern = normalize(raw);
    if (!pattern) continue;
    // Longer matched phrase = more specific intent, so "work experience"
    // beats the shorter "his work" when both are present.
    const phraseScore = Math.min(0.99, 0.85 + 0.005 * pattern.length);
    if (normQuery === pattern) best = Math.max(best, 1);
    else if (padded.includes(` ${pattern} `)) best = Math.max(best, phraseScore);
    else if (pattern.length >= 4 && queryTokens.some(t => t.startsWith(pattern))) best = Math.max(best, 0.85);
  }

  const keywords = (intent.keywords || []).map(normalize).filter(Boolean);
  if (keywords.length && qTokens.length) {
    const matchedKeywords = keywords.filter(k => qTokens.some(t => closeEnough(t, k))).length;
    if (matchedKeywords > 0) {
      const matchedTokens = qTokens.filter(t => keywords.some(k => closeEnough(t, k))).length;
      const keywordRatio = matchedKeywords / keywords.length;
      const queryRatio = matchedTokens / qTokens.length;
      const score = 0.35 + 0.3 * keywordRatio + 0.45 * queryRatio;
      best = Math.max(best, Math.min(MAX_KEYWORD_SCORE, score));
    }
  }

  return best;
}

export function bestMatch(text) {
  const normQuery = normalize(text);
  const qTokens = contentTokens(text);
  let intent = null;
  let score = 0;
  for (const candidate of intents) {
    const s = scoreIntent(candidate, normQuery, qTokens);
    if (s > score) {
      score = s;
      intent = candidate;
    }
  }
  return { intent, score, normQuery, qTokens };
}
