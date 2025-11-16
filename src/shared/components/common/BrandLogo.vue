<template>
  <div
    class="inline-flex items-center gap-3"
    :class="[
      alignment === 'center' ? 'justify-center w-full' : '',
      alignment === 'start' ? 'justify-start' : '',
      alignment === 'end' ? 'justify-end w-full' : ''
    ]"
  >
    <img :src="logo" :alt="brandName" class="h-10 w-auto" />
    <div v-if="showText" class="leading-tight">
      <h1 class="text-xl font-bold tracking-tight" :class="brandClass">
        {{ brandName }}
      </h1>
      <p
        v-if="showStrapline && strapline"
        class="text-[10px] uppercase tracking-wide mt-0.5"
        :class="straplineClass"
      >
        {{ strapline }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import logo from '@/assets/logo.svg';

const props = defineProps({
  showText: { type: Boolean, default: true },
  variant: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value)
  },
  alignment: {
    type: String,
    default: 'start',
    validator: (value) => ['start', 'center', 'end'].includes(value)
  },
  showStrapline: {
    type: Boolean,
    default: true
  }
});

const { t } = useI18n({ useScope: 'global' });

const brandName = computed(() => t('app.brand.name'));
const strapline = computed(() => t('app.brand.strapline'));

const brandClass = computed(() =>
  props.variant === 'dark' ? 'text-white' : 'text-primary-800'
);

const straplineClass = computed(() =>
  props.variant === 'dark'
    ? 'text-primary-50'
    : 'text-primary-500'
);
</script>
