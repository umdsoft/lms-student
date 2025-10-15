# LMS Student Frontend

Vue 3 + Vite asosidagi talaba kabineti interfeysi. Dizayn matematika va ingliz tili kurslari uchun o'quvchi tajribasini yaxshilashga qaratilgan bo'lib, Tailwind CSS, Pinia, Vue Router va Chart.js’dan foydalanadi. Loyiha cookie-based sessiya, CSRF himoyasi va RBAC talablari bilan mos keladigan arxitekturani ko'zda tutadi.

## Texnologiyalar

- **Vue 3 (Composition API)** — komponentlar va sahifalar
- **Vite** — tezkor ishga tushirish va build
- **Pinia** — holat boshqaruvi (auth, kurslar, statistika)
- **Vue Router** — route guard va RBAC meta ma'lumotlar
- **Axios** — API qatlami (CSRF wrapper bilan)
- **Tailwind CSS** — dizayn tizimi va responsivlik
- **Chart.js + vue-chartjs** — grafiklar
- **Jest + @testing-library/vue** — komponent testlari

## Papka tuzilmasi

```
src/
  api.js              # axios instance + refresh interceptori
  api.csrf.js         # mutatsiya so'rovlari uchun csrf wrapper
  main.js             # app bootstrap
  main.css            # tailwind importlari
  App.vue             # layout tanlovchi
  router.js           # route meta, guardlar
  components/         # UI, dashboard, kurslar, olympiadalar
  composables/        # useAuth, useApi, sanitize, i18n helper
  pages/              # sahifalar: auth, dashboard, kurs, profil
  stores/             # pinia store'lari (auth, mock ma'lumotlar)
  utils/              # fayl validatsiyasi
  i18n/               # Vue I18n konfiguratsiyasi va tarjimalar
```

## Lokalizatsiya

- Vue I18n global rejimida ishlaydi (`src/i18n/index.js`).
- Standart til — **o'zbek tili (uz)**, qo'shimcha til — **rus tili (ru)**.
- Tarjima matnlari `src/i18n/locales/uz.js` va `src/i18n/locales/ru.js` fayllarida JSON-ga o'xshash obyektlar sifatida saqlanadi.
- Interfeysdagi barcha foydalanuvchi matnlari `t()` yoki `tm()` orqali tarjima qilinadi.
- Asosiy layoutda til tanlash selektori mavjud bo'lib, Pinia `i18n` store orqali til darhol almashtiriladi.

## Loyiha skriptlari

```
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm test
```

> Eslatma: Ushbu muhitda npm registry'ga ulanish cheklangani sababli `npm install` bajarilmasligi mumkin. Lokal ish stansiyangizda birinchi bo'lib bog'liqliklarni o'rnatib oling.

## Testlar

`tests/unit/AppLayout.spec.js` faylida Pinia va auth composable'lari bilan layoutning ko'rinishi tekshirilgan. Jest konfiguratsiyasi `jest.config.cjs` da joylashgan.

## Dizayn tamoyillari

- OWASP talablariga mos ravishda sessiya va CSRF himoyasi
- v-html o'rniga `SafeHtml` komponenti bilan sanitizatsiya
- Route meta orqali RBAC va auth guardlar
- Responsiv, mobil va planshetlarga mos layout
- Datatable va kartalar bilan modul tuzilmasi

Kelgusi bosqichlarda real API integratsiyasi, fayl yuklash va monitoring (Sentry) qo'shiladi.
