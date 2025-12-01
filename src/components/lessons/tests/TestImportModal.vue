<template>
  <BaseModal
    :show="show"
    :title="t('lessons.tests.import.title')"
    size="xl"
    max-height="90vh"
    @update:show="handleClose"
  >
    <div class="space-y-6">
      <!-- Info box -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex gap-3">
          <svg class="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div>
            <h4 class="font-medium text-blue-900">{{ t('lessons.tests.import.infoTitle') }}</h4>
            <p class="mt-1 text-sm text-blue-700">{{ t('lessons.tests.import.infoDescription') }}</p>
            <button
              type="button"
              class="mt-2 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              @click="downloadTemplate"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              {{ t('lessons.tests.import.downloadTemplate') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Upload zone -->
      <div
        class="relative border-2 border-dashed rounded-xl p-8 text-center transition-colors"
        :class="isDragging
          ? 'border-blue-500 bg-blue-50'
          : selectedFile
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'"
        @dragenter.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <input
          ref="fileInput"
          type="file"
          accept=".xlsx,.xls"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          @change="handleFileSelect"
        />

        <div v-if="!selectedFile">
          <svg class="mx-auto w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
          <p class="mt-2 text-sm font-medium text-gray-700">{{ t('lessons.tests.import.dropzone') }}</p>
          <p class="mt-1 text-xs text-gray-500">XLSX, XLS</p>
        </div>

        <div v-else class="flex items-center justify-center gap-3">
          <div class="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div class="text-left">
            <p class="text-sm font-medium text-gray-900">{{ selectedFile.name }}</p>
            <p class="text-xs text-gray-500">{{ formatFileSize(selectedFile.size) }}</p>
          </div>
          <button
            type="button"
            class="p-2 text-gray-400 hover:text-red-500 transition-colors"
            @click.stop="clearFile"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Parsing results -->
      <div v-if="parseResult" class="space-y-4">
        <!-- Stats -->
        <div class="flex gap-4">
          <div class="flex-1 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p class="text-2xl font-bold text-green-600">{{ parseResult.valid.length }}</p>
            <p class="text-sm text-green-700">{{ t('lessons.tests.import.validTests') }}</p>
          </div>
          <div class="flex-1 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-2xl font-bold text-red-600">{{ parseResult.errors.length }}</p>
            <p class="text-sm text-red-700">{{ t('lessons.tests.import.errors') }}</p>
          </div>
        </div>

        <!-- Errors list -->
        <div v-if="parseResult.errors.length > 0" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 class="font-medium text-red-900 mb-2">{{ t('lessons.tests.import.errorsList') }}</h4>
          <ul class="space-y-1 text-sm text-red-700 max-h-32 overflow-y-auto">
            <li v-for="(error, index) in parseResult.errors" :key="index">
              {{ t('lessons.tests.import.row') }} {{ error.row }}: {{ error.message }}
            </li>
          </ul>
        </div>

        <!-- Preview table -->
        <div v-if="parseResult.valid.length > 0" class="border border-gray-200 rounded-lg overflow-hidden">
          <div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h4 class="font-medium text-gray-900">{{ t('lessons.tests.import.preview') }}</h4>
          </div>
          <div class="overflow-x-auto max-h-64">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 sticky top-0">
                <tr>
                  <th class="px-4 py-2 text-left font-medium text-gray-600">#</th>
                  <th class="px-4 py-2 text-left font-medium text-gray-600">{{ t('lessons.tests.import.question') }}</th>
                  <th class="px-4 py-2 text-left font-medium text-gray-600">{{ t('lessons.tests.import.difficulty') }}</th>
                  <th class="px-4 py-2 text-left font-medium text-gray-600">{{ t('lessons.tests.import.points') }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(test, index) in parseResult.valid.slice(0, 10)" :key="index">
                  <td class="px-4 py-2 text-gray-500">{{ index + 1 }}</td>
                  <td class="px-4 py-2 text-gray-900 truncate max-w-xs">{{ test.question }}</td>
                  <td class="px-4 py-2">
                    <span
                      class="px-2 py-0.5 rounded-full text-xs font-medium"
                      :class="getDifficultyClass(test.difficulty)"
                    >
                      {{ getDifficultyLabel(test.difficulty) }}
                    </span>
                  </td>
                  <td class="px-4 py-2 text-gray-600">{{ test.points }}</td>
                </tr>
              </tbody>
            </table>
            <p v-if="parseResult.valid.length > 10" class="px-4 py-2 text-sm text-gray-500 bg-gray-50">
              {{ t('lessons.tests.import.andMore', { count: parseResult.valid.length - 10 }) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Error message -->
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    </div>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        @click="handleClose"
      >
        {{ t('common.actions.cancel') }}
      </button>
      <button
        type="button"
        class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!canImport || importing"
        @click="handleImport"
      >
        {{ importing
          ? t('common.loading')
          : t('lessons.tests.import.importButton', { count: parseResult?.valid.length || 0 })
        }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import * as XLSX from 'xlsx';
import BaseModal from '@/components/common/BaseModal.vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  importing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:show', 'import']);

const { t } = useI18n();

const fileInput = ref(null);
const selectedFile = ref(null);
const isDragging = ref(false);
const parseResult = ref(null);
const error = ref('');

const canImport = computed(() => {
  return parseResult.value?.valid.length > 0;
});

const handleFileSelect = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    processFile(file);
  }
};

const handleDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) {
    processFile(file);
  }
};

const processFile = async (file) => {
  error.value = '';
  parseResult.value = null;

  // Validate file type
  const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
  if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls)$/i)) {
    error.value = t('lessons.tests.import.invalidFileType');
    return;
  }

  selectedFile.value = file;

  try {
    const data = await readExcelFile(file);
    parseResult.value = parseTestData(data);
  } catch (err) {
    error.value = t('lessons.tests.import.parseError');
    console.error('Parse error:', err);
  }
};

const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        resolve(jsonData);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

const parseTestData = (data) => {
  const valid = [];
  const errors = [];

  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row || row.length === 0 || !row[0]) continue;

    const rowNum = i + 1;

    try {
      // Expected format: Question, A, B, C, D, Correct (A/B/C/D), Difficulty, Points
      const question = String(row[0] || '').trim();
      const optionA = String(row[1] || '').trim();
      const optionB = String(row[2] || '').trim();
      const optionC = String(row[3] || '').trim();
      const optionD = String(row[4] || '').trim();
      const correctAnswer = String(row[5] || 'A').toUpperCase().trim();
      const difficulty = String(row[6] || 'medium').toLowerCase().trim();
      const points = parseInt(row[7]) || 10;

      // Validate
      if (!question) {
        errors.push({ row: rowNum, message: t('lessons.tests.import.errorEmptyQuestion') });
        continue;
      }

      if (!optionA || !optionB) {
        errors.push({ row: rowNum, message: t('lessons.tests.import.errorMinOptions') });
        continue;
      }

      const options = [
        { text: optionA, isCorrect: correctAnswer === 'A' },
        { text: optionB, isCorrect: correctAnswer === 'B' }
      ];

      if (optionC) options.push({ text: optionC, isCorrect: correctAnswer === 'C' });
      if (optionD) options.push({ text: optionD, isCorrect: correctAnswer === 'D' });

      if (!options.some(o => o.isCorrect)) {
        options[0].isCorrect = true;
      }

      const validDifficulties = ['easy', 'medium', 'hard'];
      const normalizedDifficulty = validDifficulties.includes(difficulty) ? difficulty : 'medium';

      valid.push({
        question,
        options,
        difficulty: normalizedDifficulty,
        points: Math.min(Math.max(points, 1), 100)
      });
    } catch (err) {
      errors.push({ row: rowNum, message: t('lessons.tests.import.errorParsing') });
    }
  }

  return { valid, errors };
};

const downloadTemplate = () => {
  const templateData = [
    ['Savol', 'A', 'B', 'C', 'D', 'Togri javob', 'Qiyinlik', 'Ball'],
    ['2 + 2 = ?', '3', '4', '5', '6', 'B', 'easy', 10],
    ['Pythagor teoremasi qanday?', 'a + b = c', 'a² + b² = c²', 'a × b = c', 'a - b = c', 'B', 'medium', 15]
  ];

  const ws = XLSX.utils.aoa_to_sheet(templateData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Tests');
  XLSX.writeFile(wb, 'test_template.xlsx');
};

const clearFile = () => {
  selectedFile.value = null;
  parseResult.value = null;
  error.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const handleImport = () => {
  if (canImport.value) {
    emit('import', parseResult.value.valid);
  }
};

const handleClose = () => {
  clearFile();
  emit('update:show', false);
};

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const getDifficultyClass = (difficulty) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-700';
    case 'medium': return 'bg-yellow-100 text-yellow-700';
    case 'hard': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getDifficultyLabel = (difficulty) => {
  switch (difficulty) {
    case 'easy': return t('lessons.tests.difficulty.easy');
    case 'medium': return t('lessons.tests.difficulty.medium');
    case 'hard': return t('lessons.tests.difficulty.hard');
    default: return difficulty;
  }
};

// Reset when modal closes
watch(() => props.show, (newVal) => {
  if (!newVal) {
    clearFile();
  }
});
</script>
