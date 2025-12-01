<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 overflow-y-auto"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500/60 transition-opacity" aria-hidden="true" @click="handleClose" />
      <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

      <div class="inline-block w-full transform overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:max-w-2xl sm:align-middle">
        <form @submit.prevent="handleSubmit">
          <div class="bg-white px-6 pb-6 pt-5 sm:p-8">
            <div class="mb-6">
              <h2 class="text-xl font-semibold text-gray-900">
                {{ mode === 'edit' ? t('directions.form.title.edit') : t('directions.form.title.create') }}
              </h2>
              <p class="mt-1 text-sm text-gray-500">{{ t('directions.form.subtitle') }}</p>
            </div>

            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label for="direction-name" class="block text-sm font-medium text-gray-700">
                  {{ t('directions.form.name') }}
                  <span class="text-red-500">*</span>
                </label>
                <input
                  id="direction-name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div class="sm:col-span-2">
                <label for="direction-description" class="block text-sm font-medium text-gray-700">
                  {{ t('directions.form.description') }}
                </label>
                <textarea
                  id="direction-description"
                  v-model="formData.description"
                  rows="3"
                  class="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label for="direction-status" class="block text-sm font-medium text-gray-700">
                  {{ t('directions.form.status') }}
                </label>
                <select
                  id="direction-status"
                  v-model="formData.status"
                  class="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="active">{{ t('directions.status.active') }}</option>
                  <option value="inactive">{{ t('directions.status.inactive') }}</option>
                </select>
              </div>

              <div>
                <label for="direction-order" class="block text-sm font-medium text-gray-700">
                  {{ t('directions.form.displayOrder') }}
                </label>
                <input
                  id="direction-order"
                  v-model.number="formData.displayOrder"
                  type="number"
                  min="0"
                  class="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label for="direction-color" class="block text-sm font-medium text-gray-700">
                  {{ t('directions.form.color') }}
                </label>
                <select
                  id="direction-color"
                  v-model="formData.color"
                  class="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option
                    v-for="color in colorOptions"
                    :key="color.value"
                    :value="color.value"
                  >
                    {{ color.label }}
                  </option>
                </select>
              </div>

              <div>
                <label for="direction-icon" class="block text-sm font-medium text-gray-700">
                  {{ t('directions.form.icon') }}
                </label>
                <select
                  id="direction-icon"
                  v-model="formData.icon"
                  class="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option
                    v-for="icon in iconOptions"
                    :key="icon.value"
                    :value="icon.value"
                  >
                    {{ icon.label }}
                  </option>
                </select>
              </div>

              <div class="sm:col-span-2">
                <label class="block text-sm font-medium text-gray-700">{{ t('directions.form.preview') }}</label>
                <div class="mt-2 flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div
                    class="flex h-16 w-16 items-center justify-center rounded-xl text-3xl"
                    :class="gradientPreview"
                  >
                    {{ iconPreview }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-900">{{ formData.name || t('directions.form.previewPlaceholder') }}</p>
                    <p class="text-sm text-gray-500">{{ formData.description || t('directions.form.previewDescription') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col-reverse gap-3 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              @click="handleClose"
            >
              {{ t('directions.form.cancel') }}
            </button>
            <button
              type="submit"
              class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              {{ t('directions.form.save') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  direction: {
    type: [Object, null],
    default: null
  },
  mode: {
    type: String,
    default: 'create'
  }
});

const emit = defineEmits(['update:show', 'save']);

const { t } = useI18n();

const defaultForm = () => ({
  name: '',
  description: '',
  color: 'blue',
  icon: 'book',
  status: 'active',
  displayOrder: 0
});

const formData = reactive(defaultForm());

const colorOptions = computed(() => [
  { value: 'blue', label: t('directions.colors.blue') },
  { value: 'purple', label: t('directions.colors.purple') },
  { value: 'orange', label: t('directions.colors.orange') },
  { value: 'green', label: t('directions.colors.green') },
  { value: 'red', label: t('directions.colors.red') },
  { value: 'indigo', label: t('directions.colors.indigo') },
  { value: 'pink', label: t('directions.colors.pink') },
  { value: 'yellow', label: t('directions.colors.yellow') }
]);

const iconOptions = computed(() => [
  { value: 'book', label: t('directions.icons.book') },
  { value: 'beaker', label: t('directions.icons.beaker') },
  { value: 'laptop', label: t('directions.icons.laptop') },
  { value: 'globe', label: t('directions.icons.globe') },
  { value: 'calculator', label: t('directions.icons.calculator') },
  { value: 'atom', label: t('directions.icons.atom') },
  { value: 'dna', label: t('directions.icons.dna') },
  { value: 'palette', label: t('directions.icons.palette') },
  { value: 'microscope', label: t('directions.icons.microscope') }
]);

const gradientPreview = computed(() => {
  const colorMap = {
    purple: 'bg-gradient-to-br from-purple-500 to-purple-600 text-white',
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white',
    orange: 'bg-gradient-to-br from-orange-500 to-orange-600 text-white',
    green: 'bg-gradient-to-br from-green-500 to-green-600 text-white',
    red: 'bg-gradient-to-br from-red-500 to-red-600 text-white',
    indigo: 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white',
    pink: 'bg-gradient-to-br from-pink-500 to-pink-600 text-white',
    yellow: 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white'
  };
  return colorMap[formData.color] || colorMap.blue;
});

const iconPreview = computed(() => {
  const iconMap = {
    book: '📚',
    beaker: '🧪',
    laptop: '💻',
    globe: '🌍',
    calculator: '🔢',
    atom: '⚛️',
    dna: '🧬',
    palette: '🎨',
    microscope: '🔬'
  };
  return iconMap[formData.icon] || '📚';
});

watch(
  () => props.direction,
  (direction) => {
    if (direction) {
      Object.assign(formData, {
        name: direction.name ?? '',
        description: direction.description ?? '',
        color: direction.color ?? 'blue',
        icon: direction.icon ?? 'book',
        status: direction.status ?? 'active',
        displayOrder: direction.displayOrder ?? 0
      });
    } else {
      Object.assign(formData, defaultForm());
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  if (!formData.name.trim()) {
    return;
  }

  // Emit save event with form data
  emit('save', { ...formData });

  // Close modal after emitting save
  // Parent will handle success notification
  emit('update:show', false);
};

const handleClose = () => {
  emit('update:show', false);
};
</script>
