# Srážkoměr

PWA s předpovědí srážek, teploty a větru (Open-Meteo) a meteomapou Windy.

## Nasazení na FTP

Po každém pushi do větve `main` se obsah repozitáře automaticky nahraje na FTP server
pomocí GitHub Actions workflow [`ftp-deploy.yml`](.github/workflows/ftp-deploy.yml).

Než to poběží, je potřeba v repozitáři nastavit **Settings → Secrets and variables →
Actions → New repository secret** tyto hodnoty:

| Secret            | Popis                                              | Povinné |
|--------------------|-----------------------------------------------------|---------|
| `FTP_SERVER`       | adresa FTP serveru, např. `ftp.example.cz`          | ano     |
| `FTP_USERNAME`      | FTP uživatelské jméno                               | ano     |
| `FTP_PASSWORD`      | FTP heslo                                           | ano     |
| `FTP_SERVER_DIR`    | cílová složka na serveru, např. `/www/srazkomer/`   | ne (výchozí `/`) |

Workflow používá obyčejné (nešifrované) FTP. Po nastavení secrets stačí pushnout
do `main` a nasazení proběhne automaticky (lze i ručně přes záložku *Actions* →
*FTP deploy* → *Run workflow*).
