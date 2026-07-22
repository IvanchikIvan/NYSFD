# NYSFD

Романтический интерактивный сайт-подарок на React и Vite.

Сайт состоит из полноэкранных секций с горизонтальной навигацией:

- таймер с даты начала отношений;
- приветственный экран;
- интерактивное колесо с причинами любви;
- QR-код для быстрого возврата на опубликованную страницу.

## Стек

- React 19
- Vite 7
- Tailwind CSS 4
- ESLint
- GitHub Pages через `gh-pages`

## Структура

```text
src/
  components/
    FloatingStrawberries.jsx
    Section.jsx
    SectionWrapper.jsx
  sections/
    HelloSection.jsx
    QRCodeSection.jsx
    RotatingWheelSection.jsx
    ZeroSection.jsx
  styles/
    base.css
    effects.css
    sections.css
  App.jsx
  index.css
  main.jsx
```

## Запуск

Установить зависимости:

```bash
npm install
```

Запустить локальный сервер:

```bash
npm run dev
```

Проверить сборку:

```bash
npm run build
```

Проверить линтер:

```bash
npm run lint
```

## Деплой

Проект настроен для публикации на GitHub Pages по пути `/NYSFD/`.

```bash
npm run deploy
```

Если репозиторий или публичный URL изменится, обнови:

- `base` в `vite.config.js`;
- `SITE_URL` в `src/sections/QRCodeSection.jsx`.

## Поддержка

Основное оформление вынесено из JSX в CSS:

- `base.css` содержит глобальную базу приложения;
- `effects.css` содержит фоновые и анимационные эффекты;
- `sections.css` содержит стили конкретных секций и повторяемые текстовые классы.

Inline-стили оставлены только для динамических значений, например позиции элементов колеса и случайных параметров падающих клубник.
