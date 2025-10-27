import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { olympiadsService } from '@/api/services/olympiads';

function createMiniTests(olympiad) {
  const basePrice = typeof olympiad?.fee === 'number' ? Math.round(olympiad.fee * 0.1) : 0;
  const formattedSubject = olympiad?.subject || 'Demo';
  const focusArea = olympiad?.title?.split(' - ')[0] || formattedSubject;

  return [
    {
      id: `${olympiad.id}-mini-1`,
      title: `${focusArea} — Express`,
      duration: '20 daqiqa',
      questionCount: '10 ta savol',
      focus: 'Fundamental tushunchalar va tezkor yechimlar.',
      price: basePrice
    },
    {
      id: `${olympiad.id}-mini-2`,
      title: `${formattedSubject} Challenge`,
      duration: '35 daqiqa',
      questionCount: '18 ta savol',
      focus: 'Murakkab topshiriqlar va vaqtni boshqarish mashqlari.',
      price: basePrice
    },
    {
      id: `${olympiad.id}-mini-3`,
      title: 'Finalga tayyorgarlik',
      duration: '45 daqiqa',
      questionCount: '24 ta savol',
      focus: 'Final bosqichidagi eng qiyin savollarga mos keluvchi mashqlar.',
      price: basePrice
    }
  ];
}

export const useOlympiadStore = defineStore('student-olympiads', () => {
  const olympiads = ref([]);
  const myOlympiads = ref([]);
  const currentOlympiad = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const miniTests = ref({});
  const purchasedMiniTests = ref({});

  // Fetch all olympiads
  async function fetchOlympiads(params = {}) {
    loading.value = true;
    error.value = null;
    try {
      const data = await olympiadsService.getAll(params);
      olympiads.value = data.olympiads || data.data?.olympiads || [];
      return olympiads.value;
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
      console.error('Fetch olympiads error:', err);
      return [];
    } finally {
      loading.value = false;
    }
  }

  // Fetch my registered olympiads
  async function fetchMyOlympiads() {
    loading.value = true;
    error.value = null;
    try {
      const data = await olympiadsService.getMyOlympiads();
      myOlympiads.value = data.olympiads || data || [];
      return myOlympiads.value;
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
      console.error('Fetch my olympiads error:', err);
      return [];
    } finally {
      loading.value = false;
    }
  }

  // Fetch olympiad by ID
  async function fetchOlympiadById(id) {
    loading.value = true;
    error.value = null;
    try {
      const data = await olympiadsService.getById(id);
      currentOlympiad.value = data.olympiad || data;
      return currentOlympiad.value;
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
      console.error('Fetch olympiad error:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  // Register for olympiad
  async function register(olympiadId) {
    loading.value = true;
    error.value = null;
    try {
      await olympiadsService.register(olympiadId);
      await fetchMyOlympiads(); // Refresh my olympiads
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
      console.error('Register olympiad error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Unregister from olympiad
  async function unregister(olympiadId) {
    loading.value = true;
    error.value = null;
    try {
      await olympiadsService.unregister(olympiadId);
      await fetchMyOlympiads(); // Refresh my olympiads
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
      console.error('Unregister olympiad error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function isRegistered(id) {
    return myOlympiads.value.some(o => o.id === id);
  }

  function listMiniTests(olympiad) {
    if (!olympiad?.id) return [];
    if (!miniTests.value[olympiad.id]) {
      miniTests.value[olympiad.id] = createMiniTests(olympiad);
    }
    return miniTests.value[olympiad.id];
  }

  function purchaseMiniTest(olympiadId, testId) {
    const current = purchasedMiniTests.value[olympiadId] || [];
    if (!current.includes(testId)) {
      purchasedMiniTests.value[olympiadId] = [...current, testId];
    }
  }

  function isMiniTestPurchased(olympiadId, testId) {
    return purchasedMiniTests.value[olympiadId]?.includes(testId) ?? false;
  }

  const registeredCount = computed(() => myOlympiads.value.length);
  const upcomingOlympiads = computed(() =>
    olympiads.value.filter(o => o.status === 'upcoming' || o.status === 'ongoing')
  );
  const finishedOlympiads = computed(() =>
    olympiads.value.filter(o => o.status === 'completed' || o.status === 'finished')
  );

  return {
    olympiads,
    myOlympiads,
    currentOlympiad,
    loading,
    error,
    registeredCount,
    upcomingOlympiads,
    finishedOlympiads,
    fetchOlympiads,
    fetchMyOlympiads,
    fetchOlympiadById,
    register,
    unregister,
    isRegistered,
    listMiniTests,
    purchaseMiniTest,
    isMiniTestPurchased
  };
});
