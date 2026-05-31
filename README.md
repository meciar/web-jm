# web-jm

Jednoduchá statická webová stránka pre Azure Static Web Apps s galériou spravovanou cez GitHub.

## Štruktúra

- `index.html` — hlavný obsah stránky (o mne, kontakt)
- `gallery/manifest.json` — zoznam obrázkov v galérii
- `gallery/images/` — samotné súbory obrázkov
- `.github/workflows/azure-static-web-apps.yml` — automatický deploy po pushi

## Lokálne spustenie

Otvorte `index.html` v prehliadači, alebo spustite jednoduchý server:

```powershell
cd C:\Users\admin\Projects\web-jm
python -m http.server 8080
```

Potom otvorte `http://localhost:8080`.

## Pridanie obrázka do galérie

1. Skopírujte obrázok do `gallery/images/` (napr. `foto-2025.jpg`)
2. Upravte `gallery/manifest.json` a pridajte nový záznam:

```json
{
  "src": "/gallery/images/foto-2025.jpg",
  "title": "Popis fotky",
  "alt": "Text pre čítačky obrazovky"
}
```

3. Commit + push na GitHub — stránka sa nasadí automaticky.

## Nasadenie na Azure Static Web Apps

### 1. Repozitár na GitHube

```powershell
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VASE-USERNAME/web-jm.git
git push -u origin main
```

### 2. Vytvorenie Static Web App v Azure

1. Azure Portal → **Create a resource** → **Static Web App**
2. Subscription + Resource group (vytvorte novú, ak nemáte)
3. Name: napr. `web-jm`
4. Plan: **Free** (pre osobný web stačí)
5. Region: **West Europe** (alebo najbližší)
6. Deployment source: **GitHub** → prihláste sa a vyberte repo `web-jm`
7. Branch: `main`
8. Build Presets: **Custom**
   - App location: `/`
   - Api location: *(prázdne)*
   - Output location: *(prázdne)*

Azure automaticky pridá secret `AZURE_STATIC_WEB_APPS_API_TOKEN` do GitHubu a spustí prvý deploy.

### 3. Vlastná doména + HTTPS (zadarmo)

Azure Static Web Apps **nevyžaduje kupovanie certifikátu** — SSL/TLS certifikát pre vlastnú doménu spravuje Azure zadarmo.

1. Azure Portal → vaša Static Web App → **Custom domains**
2. **Add** → **Custom domain on other DNS**
3. Zadajte doménu (napr. `www.vasadomena.sk`)
4. Azure zobrazí DNS záznam (CNAME alebo TXT pre overenie)
5. V administrácii domény (u registrátora) pridajte uvedený DNS záznam
6. Po overení Azure automaticky vystaví a obnovuje certifikát HTTPS

Pre koreňovú doménu (`vasadomena.sk` bez www) môže byť potrebný ALIAS/ANAME záznam — závisí od registrátora.

### 4. Odhad nákladov

- Azure Static Web Apps **Free** tier: 0 €/mesiac pre bežný osobný web
- GitHub: verejný repozitár zadarmo
- Certifikát HTTPS: zadarmo (spravovaný Azure)
- Doména: jediný pravidelný náklad (platíte registrátorovi)

## Úprava textov na stránke

Upravte `index.html` (sekcie O mne, Kontakt, nadpisy) a pushnite zmenu na GitHub.
