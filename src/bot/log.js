// Unmatched-question log: the backlog of intents to add next.
// localStorage only — no network, no secrets, capped so it cannot grow forever.

const KEY = 'ulac_bot_unmatched';
const MAX_ENTRIES = 100;

function store() {
  try {
    if (typeof localStorage !== 'undefined') return localStorage;
  } catch (_) {
    /* private mode / disabled storage */
  }
  return null;
}

export function logUnmatched(text) {
  const s = store();
  if (!s) return;
  try {
    const current = JSON.parse(s.getItem(KEY) || '[]');
    current.push({ q: String(text).slice(0, 300), at: new Date().toISOString() });
    s.setItem(KEY, JSON.stringify(current.slice(-MAX_ENTRIES)));
  } catch (_) {
    /* ignore corrupted or full storage */
  }
}

export function getUnmatched() {
  const s = store();
  if (!s) return [];
  try {
    const parsed = JSON.parse(s.getItem(KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

export function clearUnmatched() {
  const s = store();
  if (!s) return;
  try {
    s.removeItem(KEY);
  } catch (_) {
    /* ignore */
  }
}
