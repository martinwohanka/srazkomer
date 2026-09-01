# Srážkoměr

PWA s předpovědí srážek, teploty a větru (Open-Meteo) a meteomapou Windy.
Celá appka je jeden soubor `index.html` (styl + JS inline).

## Pravidla pro úpravy

- **Každá změna v `index.html`, která ovlivní chování nebo vzhled appky, musí
  přidat nový záznam do `CHANGELOG` a zvýšit `VERSION` / `VERSION_DATE`.**
  Viz komentář přímo u definice `CHANGELOG` v `index.html`. Formát záznamu:
  `{v:"X.YZ", d:"D. M. RRRR", c:["popis změny", ...]}`, nejnovější nahoře.
  Datum je aktuální datum (viz systémový kontext relace).
- Změny čistě v podpůrných souborech (workflow, README, ikony, manifest),
  které se appky samotné nedotknou, changelog nevyžadují.

## Nasazení

Po pushi do `main` se `.github/workflows/ftp-deploy.yml` automaticky nahraje
obsah repozitáře na FTP (viz `README.md` pro nastavení secrets).
