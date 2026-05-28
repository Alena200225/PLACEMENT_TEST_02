# Placement Test Angličtiny

Moderní responzivní webová aplikace pro online placement test angličtiny. Aplikace je statická, nevyžaduje server ani databázi a je připravená pro jednoduché nasazení na Netlify.

## Co aplikace umí

- automaticky vyhodnotí 60 hodnocených otázek,
- zobrazí celkové skóre i procenta úspěšnosti,
- vyhodnotí pokročilou část 25-61 a pokročilé jádro 44-61 až ve výsledku,
- umí odesílat všechny odpovědi a výsledek do jednoho Google Sheetu,
- vyhodnotí kritéria pro vyšší skupinu a B1+ / blížící se B2,
- umožní export výsledku do PDF přes tiskový dialog prohlížeče,
- podporuje světlý a tmavý režim,
- funguje na mobilu, tabletu i počítači,
- běží jako statická stránka vhodná pro Netlify.

## Lokální spuštění

Otevřete soubor `index.html` v prohlížeči. Není potřeba nic instalovat.

Volitelně lze složku spustit přes libovolný statický server, například ve Visual Studio Code pomocí rozšíření Live Server.

## Publikace na Netlify

1. Vytvořte si účet na [Netlify](https://www.netlify.com/).
2. V Netlify zvolte **Add new site** a potom **Deploy manually**.
3. Nahrajte celou složku s aplikací, hlavně soubory `index.html`, `README.md` a `netlify.toml`.
4. Netlify stránku zveřejní a zobrazí veřejnou adresu pro studenty.
5. Název webu lze změnit v **Site configuration**.

## Publikace přes Git

1. Nahrajte soubory do GitHub repozitáře.
2. V Netlify zvolte **Import from Git**.
3. Vyberte repozitář.
4. Build command nechte prázdný.
5. Publish directory nastavte na `.`.
6. Dokončete nasazení.

## Úprava kritérií a otázek

Kritéria jsou v souboru `index.html` v části `CONFIG`. Otázky, možnosti a správné odpovědi jsou v části `QUESTIONS`.

Po úpravě stačí soubor znovu nahrát na Netlify nebo poslat změnu do Git repozitáře.

## Odesílání odpovědí do Google Sheetu

Aplikace je připravená posílat jméno studenta, všechny odpovědi, skóre, procenta a interpretaci do jedné Google tabulky.

Postup:

1. Vytvořte nový Google Sheet.
2. V horním menu zvolte **Extensions** → **Apps Script**.
3. Smažte ukázkový kód a vložte obsah souboru `google-apps-script.js`.
4. Klikněte na **Deploy** → **New deployment**.
5. Typ zvolte **Web app**.
6. Nastavte:
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
7. Klikněte na **Deploy** a zkopírujte vytvořenou URL adresu webové aplikace.
8. V souboru `index.html` najděte řádek:

```js
submitUrl: "",
```

9. Vložte zkopírovanou adresu mezi uvozovky:

```js
submitUrl: "https://script.google.com/macros/s/VAŠE_ADRESA/exec",
```

10. Nahrajte upravený `index.html` znovu na GitHub.

Po vyhodnocení testu se každý výsledek odešle do Google Sheetu do listu `Odpovědi`.

## Poznámka k ochraně dat

Pokud je `submitUrl` prázdné, aplikace zpracovává odpovědi pouze v prohlížeči studenta. Po nastavení Google Apps Script adresy se výsledky odesílají do vaší Google tabulky.
