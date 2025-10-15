<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold text-primary-800">Sozlamalar</h2>
      <p class="text-sm text-slate-500">Ma'lumotlaringizni yangilang va xavfsizlik sozlamalarini boshqaring.</p>
    </header>

    <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <form class="bg-white rounded-3xl p-6 shadow-sm space-y-6">
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="block text-sm font-medium text-slate-600">
            To'liq ism
            <input type="text" class="mt-1 w-full rounded-2xl border border-primary-100 px-4 py-3 focus:border-primary-400 focus:outline-none" placeholder="Ism Familiya" />
          </label>
          <label class="block text-sm font-medium text-slate-600">
            Email
            <input type="email" class="mt-1 w-full rounded-2xl border border-primary-100 px-4 py-3 focus:border-primary-400 focus:outline-none" placeholder="student@example.com" />
          </label>
          <label class="block text-sm font-medium text-slate-600">
            Telefon
            <input type="tel" class="mt-1 w-full rounded-2xl border border-primary-100 px-4 py-3 focus:border-primary-400 focus:outline-none" placeholder="+998 90 000 00 00" />
          </label>
          <label class="block text-sm font-medium text-slate-600">
            Time-zone
            <input type="text" class="mt-1 w-full rounded-2xl border border-primary-100 px-4 py-3 focus:border-primary-400 focus:outline-none" placeholder="Asia/Tashkent" />
          </label>
        </div>

        <div class="space-y-3">
          <p class="text-sm font-semibold text-primary-700">Parolni yangilash</p>
          <div class="grid gap-4 sm:grid-cols-2">
            <label class="block text-sm text-slate-600">
              Joriy parol
              <input type="password" class="mt-1 w-full rounded-2xl border border-primary-100 px-4 py-3 focus:border-primary-400 focus:outline-none" placeholder="********" />
            </label>
            <label class="block text-sm text-slate-600">
              Yangi parol
              <input type="password" class="mt-1 w-full rounded-2xl border border-primary-100 px-4 py-3 focus:border-primary-400 focus:outline-none" placeholder="********" />
            </label>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p class="text-xs text-slate-500">O'zgarishlar xavfsiz saqlanishi uchun barcha maydonlarni to'ldiring.</p>
          <button type="button" class="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-primary-700">
            Saqlash
            <span aria-hidden="true">✓</span>
          </button>
        </div>
      </form>

      <aside class="bg-white rounded-3xl p-6 shadow-sm space-y-4">
        <h3 class="text-lg font-semibold text-primary-800">Qurilmalar</h3>
        <ul class="space-y-3 text-sm text-slate-600">
          <li class="flex items-center justify-between">
            <div>
              <p class="font-semibold text-primary-700">MacOS Safari</p>
              <p class="text-xs text-slate-400">Toshkent · Oxirgi kirish: 10 daqiqa avval</p>
            </div>
            <button type="button" class="text-primary-600 hover:underline text-xs">Sessiyani yopish</button>
          </li>
          <li class="flex items-center justify-between">
            <div>
              <p class="font-semibold text-primary-700">iPhone 14</p>
              <p class="text-xs text-slate-400">Qo'shilgan: 2024-02-11</p>
            </div>
            <button type="button" class="text-primary-600 hover:underline text-xs">Sessiyani yopish</button>
          </li>
        </ul>
        <div class="border-t border-primary-50 pt-4 text-xs text-slate-400">
          2FA sozlamalarini hisobingizdan boshqarishingiz mumkin. Maxfiy kalitni hech kim bilan ulashmang.
        </div>
      </aside>
    </div>
  </section>
</template>
