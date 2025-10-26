<template>
  <article class="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-amber-200">
    <!-- Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

    <!-- Card Content -->
    <div class="relative z-10 p-6 flex flex-col gap-5">
      <!-- Header -->
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1 space-y-2">
          <div class="flex items-center gap-2">
            <Trophy :size="20" class="text-amber-600" />
            <h3 class="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
              {{ olympiad.title }}
            </h3>
          </div>
          <div class="flex items-center gap-2">
            <Building2 :size="14" class="text-slate-400" />
            <p class="text-sm text-slate-600 font-medium">{{ olympiad.host }}</p>
          </div>
          <span
            v-if="statusLabel"
            class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary-50 to-primary-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-700 shadow-sm"
          >
            <Circle :size="6" class="fill-current" />
            {{ statusLabel }}
          </span>
        </div>
        <ProgressBadge :tone="olympiad.level" :label="levelLabel" />
      </div>

      <!-- Description -->
      <p class="text-sm text-slate-600 leading-relaxed line-clamp-2">{{ olympiad.description }}</p>

      <!-- Details Grid -->
      <div class="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
        <div class="flex items-start gap-2">
          <Calendar :size="16" class="text-primary-500 mt-0.5" />
          <div>
            <p class="text-xs font-semibold text-slate-500">{{ t('olympiads.card.start') }}</p>
            <p class="text-sm font-bold text-slate-700">{{ olympiad.start }}</p>
          </div>
        </div>
        <div class="flex items-start gap-2">
          <Clock :size="16" class="text-primary-500 mt-0.5" />
          <div>
            <p class="text-xs font-semibold text-slate-500">{{ t('olympiads.card.duration') }}</p>
            <p class="text-sm font-bold text-slate-700">{{ olympiad.duration }}</p>
          </div>
        </div>
        <div class="flex items-start gap-2">
          <Monitor :size="16" class="text-primary-500 mt-0.5" />
          <div>
            <p class="text-xs font-semibold text-slate-500">{{ t('olympiads.card.format') }}</p>
            <p class="text-sm font-bold text-slate-700">{{ olympiad.format }}</p>
          </div>
        </div>
        <div class="flex items-start gap-2">
          <BookOpen :size="16" class="text-primary-500 mt-0.5" />
          <div>
            <p class="text-xs font-semibold text-slate-500">{{ t('olympiads.card.subject') }}</p>
            <p class="text-sm font-bold text-slate-700">{{ olympiad.subject }}</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex flex-col gap-3 pt-4 border-t border-slate-100 sm:flex-row sm:items-center sm:justify-between">
        <!-- Fee -->
        <div class="flex items-center gap-2">
          <DollarSign :size="18" class="text-amber-600" />
          <div>
            <p class="text-xs font-semibold uppercase text-slate-500">{{ t('olympiads.card.feeLabel') }}</p>
            <p class="text-lg font-bold text-amber-700">{{ formattedFee }}</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap items-center gap-2 justify-end">
          <button
            v-if="!isFinished"
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all shadow-sm"
            :class="isRegistered
              ? 'border-success/20 bg-success/10 text-success cursor-default'
              : 'border-primary-200 bg-white text-primary-700 hover:bg-primary-50 hover:border-primary-300 hover:shadow'"
            :disabled="isRegistered"
            @click="openModal"
          >
            <CheckCircle2 v-if="isRegistered" :size="16" />
            <UserPlus v-else :size="16" />
            {{ joinLabel }}
          </button>
          <RouterLink
            :to="{ name: 'student.olympiads.details', params: { id: olympiad.id } }"
            class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:from-primary-700 hover:to-primary-800 group-hover:scale-105"
          >
            <span>{{ detailsLabel }}</span>
            <ArrowRight :size="16" class="transition-transform group-hover:translate-x-0.5" />
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Shine Effect -->
    <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

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
import {
  Trophy,
  Building2,
  Calendar,
  Clock,
  Monitor,
  BookOpen,
  DollarSign,
  CheckCircle2,
  UserPlus,
  ArrowRight,
  Circle
} from 'lucide-vue-next';
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
