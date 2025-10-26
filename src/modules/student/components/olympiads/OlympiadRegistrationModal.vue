<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
        <div class="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
          <header class="space-y-2">
            <h2 class="text-xl font-semibold text-primary-800">{{ t('olympiads.registration.title') }}</h2>
            <p class="text-sm text-slate-600">{{ t('olympiads.registration.subtitle', { title: olympiad.title }) }}</p>
          </header>

          <section class="mt-6 space-y-4">
            <div class="rounded-2xl bg-primary-50/60 p-4 text-sm text-primary-700">
              <p class="font-semibold">{{ t('olympiads.registration.paymentNotice') }}</p>
              <p class="mt-1 text-slate-600">
                {{ t('olympiads.registration.balanceReminder', { amount: formattedFee }) }}
              </p>
            </div>

            <div class="rounded-2xl border border-primary-50 p-4">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-primary-500">
                {{ t('olympiads.registration.studentInfoTitle') }}
              </h3>
              <dl class="mt-3 space-y-2 text-sm text-slate-600">
                <div class="flex justify-between gap-3">
                  <dt class="font-medium text-primary-700">{{ t('olympiads.registration.fields.fullName') }}</dt>
                  <dd>{{ student.fullName }}</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt class="font-medium text-primary-700">{{ t('olympiads.registration.fields.email') }}</dt>
                  <dd>{{ student.email }}</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt class="font-medium text-primary-700">{{ t('olympiads.registration.fields.phone') }}</dt>
                  <dd>{{ student.phone }}</dd>
                </div>
              </dl>
            </div>
          </section>

          <footer class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-2xl border border-primary-100 px-5 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50"
              @click="$emit('close')"
            >
              {{ t('olympiads.registration.cancel') }}
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-2xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-primary-700"
              @click="$emit('confirm')"
            >
              {{ t('olympiads.registration.confirm') }}
            </button>
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  olympiad: {
    type: Object,
    required: true
  },
  student: {
    type: Object,
    required: true
  },
  open: {
    type: Boolean,
    default: false
  }
});

defineEmits(['close', 'confirm']);

const { t, locale } = useI18n({ useScope: 'global' });

const formattedFee = computed(() =>
  t('app.header.balanceValue', {
    value: new Intl.NumberFormat(locale.value === 'ru' ? 'ru-RU' : 'uz-UZ').format(props.olympiad.fee || 0)
  })
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
