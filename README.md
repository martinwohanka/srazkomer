# Srážkoměr

Česká webová aplikace (PWA) s předpovědí **srážek, teploty a větru** pro libovolné místo:
24 h / 48 h po hodinách a 14 dní po dnech, meteomapa Windy (radar, srážky, mraky, vítr,
teplota), fáze Měsíce, kontextové rady a živé pozadí, které ukazuje aktuální počasí
včetně skutečné polohy Slunce a Měsíce na obloze.

- Celá aplikace je jeden soubor `index.html` (HTML + CSS + vanilla JS), bez build kroku.
- Žádný backend ani API klíče: data z [Open-Meteo](https://open-meteo.com/),
  hledání měst z Open-Meteo Geocoding, název místa podle GPS z BigDataCloud,
  mapa z [Windy.com](https://www.windy.com/).
- Dá se nainstalovat jako aplikace (iPhone: Sdílet → Přidat na plochu; Android/desktop:
  nabídka prohlížeče → Instalovat).

## Soubory

| soubor | co dělá |
|---|---|
| `index.html` | celá aplikace |
| `manifest.json` | údaje pro instalaci (PWA) |
| `sw.js` | service worker – offline kopie appky |
| `icon.svg`, `icon-*.png` | ikony (PNG vygenerované z `icon.svg`) |
| `.github/workflows/ftp-deploy.yml` | automatické nasazení na FTP |
| `CLAUDE.md` | pravidla pro úpravy (verze, seznam změn) |

## Nasazení přes GitHub Actions

Při každém pushi do větve `main` (nebo ručně v záložce **Actions → Nasazení na FTP → Run
workflow**) se obsah repozitáře nahraje na FTP. Složky `.git` a `.github` se nenahrávají.

V repozitáři nastav v **Settings → Secrets and variables → Actions → New repository secret**:

| secret | příklad | povinný |
|---|---|---|
| `FTP_SERVER` | `ftp.mojedomena.cz` | ano |
| `FTP_USERNAME` | `uzivatel` | ano |
| `FTP_PASSWORD` | `••••••` | ano |
| `FTP_SERVER_DIR` | `/www/srazkomer/` (musí končit lomítkem) | ne, výchozí `/` |

Přihlašovací údaje nikdy nepatří do kódu.

## Místní spuštění

Service worker a hlídání verzí fungují jen přes `http(s)`, ne z `file://`:

```bash
python3 -m http.server 8080
# pak otevři http://localhost:8080/
```
