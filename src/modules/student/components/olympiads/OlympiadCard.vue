<template>
  <article class="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4 border border-transparent hover:border-primary-200 transition">
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-1">
        <h3 class="text-lg font-semibold text-primary-800">{{ olympiad.title }}</h3>
        <p class="text-sm text-slate-500">{{ olympiad.host }}</p>
        <span
          v-if="statusLabel"
          class="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600"
        >
          {{ statusLabel }}
        </span>
      </div>
      <ProgressBadge :tone="olympiad.level" :label="levelLabel" />
    </div>
    <p class="text-sm text-slate-600 leading-relaxed">{{ olympiad.description }}</p>
    <div class="grid grid-cols-2 gap-4 text-sm text-slate-500">
      <p><span class="font-semibold text-primary-700">{{ t('olympiads.card.start') }}:</span> {{ olympiad.start }}</p>
      <p><span class="font-semibold text-primary-700">{{ t('olympiads.card.duration') }}:</span> {{ olympiad.duration }}</p>
      <p><span class="font-semibold text-primary-700">{{ t('olympiads.card.format') }}:</span> {{ olympiad.format }}</p>
      <p><span class="font-semibold text-primary-700">{{ t('olympiads.card.subject') }}:</span> {{ olympiad.subject }}</p>
    </div>
    <div class="flex flex-col gap-3 pt-4 border-t border-primary-50 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-xs uppercase text-slate-400">{{ t('olympiads.card.feeLabel') }}</p>
        <p class="text-lg font-semibold text-primary-700">{{ formattedFee }}</p>
      </div>
      <div class="flex flex-wrap items-center gap-2 justify-end">
        <button
          v-if="!isFinished"
          type="button"
          class="inline-flex items-center gap-2 rounded-2xl border border-primary-100 px-4 py-2 text-sm font-semibold text-primary-600 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:border-primary-50 disabled:bg-primary-50/60 disabled:text-primary-300"
          :disabled="isRegistered"
          @click="openModal"
        >
          <span v-if="isRegistered">✅</span>
          {{ joinLabel }}
        </button>
        <RouterLink
        :to="{ name: 'student.olympiads.details', params: { id: olympiad.id } }"
          class="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
        >
          {{ detailsLabel }}
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>

    <OlympiadRegistrationModal
      v-if="!isFinished"
      :olympiad="olympiad"
      :student="student"
      :open="showModal"
      @close="closeModal"
      @confirm="confirmRegistration"
    />
  </article>
</template>

<script setup>
import { computed, ref } from 'vue';
import ProgressBadge from '@/shared/components/ui/ProgressBadge.vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from '@/shared/composables/useAuth';
import { useOlympiadStore } from '@/modules/student/stores/olympiads';
import { useNotifications } from '@/shared/composables/useNotifications';
import OlympiadRegistrationModal from '@/modules/student/components/olympiads/OlympiadRegistrationModal.vue';

const props = defineProps({
  olympiad: {
    type: Object,
    required: true
  }
});

const { t, locale } = useI18n({ useScope: 'global' });
const { user } = useAuth();
const olympiadStore = useOlympiadStore();
const { notifySuccess } = useNotifications();

const showModal = ref(false);

const levelLabel = computed(() => {
  switch (props.olympiad.level) {
    case 'success':
      return t('olympiads.levelLabels.success');
    case 'warning':
      return t('olympiads.levelLabels.warning');
    default:
      return t('olympiads.levelLabels.info');
  }
});

const statusLabel = computed(() => {
  if (!props.olympiad.status) return '';
  return t(`olympiads.details.statusTag.${props.olympiad.status}`);
});

const isFinished = computed(() => props.olympiad.status === 'finished');
const isRegistered = computed(() => olympiadStore.isRegistered(props.olympiad.id));

const joinLabel = computed(() =>
  isRegistered.value ? t('olympiads.card.registered') : t('olympiads.card.action')
);

const detailsLabel = computed(() =>
  isFinished.value ? t('olympiads.card.viewResults') : t('olympiads.card.details')
);

const formattedFee = computed(() =>
  t('app.header.balanceValue', {
    value: new Intl.NumberFormat(locale.value === 'ru' ? 'ru-RU' : 'uz-UZ').format(props.olympiad.fee)
  })
);

const student = computed(() => ({
  fullName: user.value?.fullName ?? t('app.header.guestName'),
  email: user.value?.email ?? '—',
  phone: user.value?.phone ?? '—'
}));

function openModal() {
  if (isRegistered.value) return;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function confirmRegistration() {
  olympiadStore.register(props.olympiad);
  notifySuccess('olympiadsRegister', { title: props.olympiad.title });
  closeModal();
}
</script>
