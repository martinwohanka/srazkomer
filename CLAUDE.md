# Pravidla repozitáře Srážkoměr

- Aplikace je **jeden soubor `index.html`** (HTML, CSS, JS inline). Žádné frameworky,
  knihovny, build kroky ani npm balíčky. Grafy jsou ruční SVG, pozadí `<canvas>`.
- Celé uživatelské rozhraní je **česky**.

## Verze a seznam změn (povinné)

**Každá změna `index.html`, která ovlivní chování nebo vzhled, musí:**

1. přidat nový záznam **na začátek** pole `CHANGELOG`
   ve tvaru `{v:"2.1", d:"14. 10. 2026", c:["popis změny", ...]}`,
2. zvýšit konstantu `VERSION` (stejné číslo jako v záznamu),
3. aktualizovat `VERSION_DATE` (formát `14. 10. 2026`).

Podle `VERSION` appka u uživatelů pozná novou verzi (sama se načte, nebo ukáže
„Je dostupná nová verze") a jednou zobrazí okno „Co je nového".
Deklarace musí zůstat ve tvaru `const VERSION="x.y";` **bez mezer kolem `=`** – appka ji hledá
regulárním výrazem a starší verze 1.x (které mohou mít uživatelé ještě otevřené) mezery nepřipouštějí.

Změny **jen v podpůrných souborech** (workflow, README, ikony, manifest, `sw.js`)
záznam v changelogu nevyžadují.

## Další pravidla

- Při změně souborů appky, které předem ukládá `sw.js`, zvyš název cache (`CACHE`).
- Při změně ikon zvyš `?v=` v odkazech na ikony v `index.html`, `manifest.json` a `sw.js`
  (hosting drží obrázky v cache 30 dní). Adresa manifestu zůstává bez verze.
- Klíče v `localStorage` mají prefix `srk.`.
- Žádné přihlašovací údaje ani API klíče do kódu.

## Nasazení

Po pushi do `main` se appka automaticky nasadí na FTP (GitHub Actions,
`.github/workflows/ftp-deploy.yml`).
