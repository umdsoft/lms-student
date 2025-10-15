import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

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

export const useOlympiadStore = defineStore('olympiads', () => {
  const registeredIds = ref([]);
  const miniTests = ref({});
  const purchasedMiniTests = ref({});

  function isRegistered(id) {
    return registeredIds.value.includes(id);
  }

  function register(olympiad) {
    if (!olympiad?.id) return;
    if (!isRegistered(olympiad.id)) {
      registeredIds.value.push(olympiad.id);
    }
    if (!miniTests.value[olympiad.id]) {
      miniTests.value[olympiad.id] = createMiniTests(olympiad);
    }
  }

  function unregister(id) {
    registeredIds.value = registeredIds.value.filter((item) => item !== id);
    delete miniTests.value[id];
    delete purchasedMiniTests.value[id];
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

  const registeredCount = computed(() => registeredIds.value.length);

  return {
    registeredIds,
    registeredCount,
    register,
    unregister,
    isRegistered,
    listMiniTests,
    purchaseMiniTest,
    isMiniTestPurchased
  };
});
