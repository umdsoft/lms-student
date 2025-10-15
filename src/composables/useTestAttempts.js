import { ref } from 'vue';

const STORAGE_KEY = 'lms-course-test-attempts';

function readStorage() {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch (error) {
    console.warn('Failed to parse test attempts from storage', error);
    return {};
  }
}

function writeStorage(payload) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('Failed to persist test attempts', error);
  }
}

export function useTestAttempts() {
  const attempts = ref([]);

  function loadAttempts(testId) {
    const source = readStorage();
    attempts.value = Array.isArray(source[testId]) ? source[testId] : [];
    return attempts.value;
  }

  function addAttempt(testId, attempt) {
    const source = readStorage();
    const next = Array.isArray(source[testId]) ? [...source[testId], attempt] : [attempt];
    source[testId] = next;
    writeStorage(source);
    attempts.value = next;
    return attempt;
  }

  function getAttempt(testId, attemptId) {
    const source = readStorage();
    const list = Array.isArray(source[testId]) ? source[testId] : [];
    return list.find((item) => item.id === attemptId) ?? null;
  }

  return {
    attempts,
    loadAttempts,
    addAttempt,
    getAttempt
  };
}
