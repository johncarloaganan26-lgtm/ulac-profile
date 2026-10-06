// Text normalisation helpers for the FAQ bot. Zero dependencies.

const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', 'can', 'could', 'would', 'will', 'shall', 'should',
  'has', 'have', 'had', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
  'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its', 'our', 'their',
  'this', 'that', 'these', 'those', 'there', 'then',
  'what', 'which', 'who', 'whom', 'whose', 'when', 'where', 'why', 'how',
  'tell', 'show', 'give', 'say', 'please', 'about', 'of', 'to', 'for', 'in',
  'on', 'at', 'by', 'with', 'from', 'and', 'or', 'but', 'if', 'so', 'as',
  'up', 'out', 'just', 'very', 'really', 'some', 'any', 'than', 'too', 'also'
]);

// Lowercase, drop curly quotes/apostrophes, strip punctuation, collapse spaces.
export function normalize(text) {
  return String(text == null ? '' : text)
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, '')
    .replace(/'/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Meaningful tokens only, so "what are his skills" scores on "skills".
// Falls back to raw tokens when the whole question is stopwords.
export function contentTokens(text) {
  const tokens = normalize(text).split(' ').filter(Boolean);
  const content = tokens.filter(t => !STOPWORDS.has(t));
  return content.length ? content : tokens;
}

export function levenshtein(a, b) {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = new Array(n + 1);
  let cur = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    const swap = prev;
    prev = cur;
    cur = swap;
  }
  return prev[n];
}

// Typo tolerance: 1 edit allowed, but only for words long enough to stay safe.
export function closeEnough(a, b) {
  if (a === b) return true;
  if (Math.min(a.length, b.length) < 4) return false;
  if (Math.abs(a.length - b.length) > 1) return false;
  return levenshtein(a, b) <= 1;
}
