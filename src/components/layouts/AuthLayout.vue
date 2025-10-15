<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-surface">
    <aside class="md:w-2/5 bg-primary-600 text-white flex flex-col justify-between p-10">
      <div>
        <p class="text-sm uppercase tracking-widest text-primary-100">Huquqiy targ'ibot</p>
        <h1 class="mt-4 text-3xl font-semibold leading-tight">
          Bilim sayohatingizni <br /> bugun boshlang
        </h1>
        <p class="mt-6 text-primary-50 max-w-sm">
          LMS tizimimiz orqali matematika va ingliz tili bo'yicha yangi yutuqlarga erishing.
          Darslar, testlar va real vaqt statistikasi siz uchun tayyor.
        </p>
      </div>
      <footer class="text-xs text-primary-200">
        © 2024 O'zbekiston Respublikasi Adliya Vazirligi. Barcha huquqlar himoyalangan.
      </footer>
    </aside>
    <main class="flex-1 flex items-center justify-center p-8">
      <div class="w-full max-w-md bg-white rounded-3xl shadow-dashboard p-10">
        <slot />
      </div>
    </main>
  </div>
</template>
