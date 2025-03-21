# wp3-2025-starter
Template voor WP3 opdracht "Accessibility Hub". Vul dit document aan zoals beschreven in eisen rondom opleveren (zie ook de [opdracht](CASUS.md)) 

# Installatie requirements
### Stap 1:
Installeer Python 3.12 (indien deze nog niet geïnstalleerd is).
Ga naar de officiële Python-website en download de installer voor Python 3.12:
https://www.python.org/downloads/release/python-3120/

Zorg ervoor dat je de optie 'Add Python to PATH' aanvinkt tijdens de installatie, zodat je Python vanuit de commandoregel kunt gebruiken.

### Stap 2:
Maak een lokale kloon van de repository aan. Doe dat door wat hieronder staat in de terminal te runnen.
```shell
git clone git@github.com:Rac-Software-Development/wp3-2025-rest-1b4-insertteamnamehere.git
```

### Stap 3:
Navigeer naar de map van de gekloonde repository.
```shell
cd wp3-2025-rest-1b4-insertteamnamehere
```

### Stap 4:
Maak een virtuele omgeving aan om de benodigde Python-pakketten geïsoleerd te installeren.
```shell
python -m venv .venv
```

### Stap 5:
Activeer de virtuele omgeving.
```shell
.\.venv\Scripts\activate
```

### Stap 6:
Installeer de requirements
```shell
pip install -r requirements.txt
```

### Stap 7:
Genereer een database.
Open het bestand ```database_generator.py``` en druk op 'run' om een database te laten genereren.

# Applicatie opstarten
Als je in de vituele omgeving zit, kan je applicatie starten met het volgende commando:
```shell
flask run
```
Klik op de link die verschijnt in de terminal om de webapplicatie te openen.

# Inlog/test gegevens:
### Ervaringsdeskundige:
- E-mail = beauterham@gmail.com
- Wachtwoord = MetJam

### Beheerder:
- E-mail = kevinvandam@gmail.com
- Wachtwoord = abc

- e-mail = peterselie@gmail.com
- wachtwoord = 123

### Organisatie:
- E-mail = gfx@info.com
- Wachtwoord = gfx
- API-key = A1B2

# Navigatie door de webapplicatie:
### Login:
Als je de app opent kom je bij het login scherm waar je kan inloggen met bovenstaande gegevens. Hier kan je ook op registreren 
klikken voor als je nog geen account hebt als ervaringsdeskundige.
### Ervaringsdeskundige:
Als je ingelogd bent als ervaringsdeskundige zie je allereerst het scherm met alle onderzoeken. Als je op een van deze 
onderzoeken klikt krijg je meer info over dat onderzoek en kan je je via daar inschrijven op dat onderzoek.

Als je in de navigatiebalk op 'mijn onderzoeken' klikt kom je op de pagina waar je alle onderzoeken kan zien waarop je je 
hebt ingeschreven. Als je op een van deze onderzoeken klikt kan je ook weer meer info krijgen over dit onderzoek.

Als je in de navigatiebalk op 'profiel' klikt krijg je alle info over jou als gebruiker te zien en kan je die ook aanpassen
door de gewenste veranderingen in te vullen en op 'save' te klikken.

Als je in de navigatiebalk op 'onderzoeken' klikt kom je weer terug op het beginscherm van een ervaringsdeskundige.

Als je in de navigatiebalk op 'uitloggen' klikt kom je weer terug op het begin scherm waar je moet inloggen.
### Beheerder:
Als je ingelogd bent als beheerder kom je allereerst op het dashboard waar alle onderzoeken, inschrijvingen en 
ervaringsdeskundigen die nog goedgekeurd moeten worden te zien zijn. Als je op een item in de tabel klikt krijg je meer
informatie te zien over het gekozen item. Hier kan de beheerder dat item dan ook goed of afkeuren.

Als je in de navigatiebalk op 'beheerders' klikt kom je bij het overzicht van alle beheerders. Hier kan je beheerders
toevoegen, (beperkt)bewerken, verwijderen en je kan (beperkt)details zien van andere beheerders.

Als je in de navigatiebalk op 'profiel' klikt, zie je je eigen gegevens en kan je die daar ook weer aanpassen.

Als je in de navigatiebalk op 'dashboard' klikt kom je weer uit bij het dashboard waar je aan het begin was.

Als je in de navigatiebalk op 'uitloggen' klikt, word je weer teruggestuurd naar de inlog pagina.
### Organisatie:
Als je bent ingelogd als organisatie kom je uit op het scherm met alle onderzoeken van die organisatie. Hier kan je je
onderzoek (beperkt)aanpassen en zien wie er allemaal op je onderzoek is ingeschreven.

Als je in de navigatiebalk op 'aanvraag' klikt kom je uit bij een formulier waarmee je een nieuw onderzoek kan aanvragen.

Als je in de navigatiebalk op 'profiel' kan je hier de gegevens van je organisatie zien en die aanpassen.

Als je in de navigatiebalk op 'onderzoeken' klikt kom je weer uit bij het startscherm voor organisaties.

Als je in de navigatiebalk op 'uitloggen' klikt, word je weer terug gestuurd naar de inlog pagina.

# Bronvermelding:
- (SuperSimpleDev, 2024)
- (Dhairya Shah, 2021)
- (W3Schools.com, z.d.)
- (How Do You Align Text Side By Side in HTML?, z.d.)
- (Beautiful CSS Box-shadow Examples - CSS Scan, z.d.)
- (Styling Option Group Label, z.d.)
- (Run Javascript Function If Option Selected, z.d.)
- (How To Set HTML5 Required Attribute in Javascript?, z.d.)
- (Mr. Virk Media, 2019)
- (W3Schools.com, z.d.-b)
- (Web Dev Simplified, 2022)
- (W3Schools.com, z.d.-c)
- (Email Regex Python, z.d.)
- (URL Regex Python, z.d.)
- (Martsoukos, 2023)
- (W3Schools.com, z.d.-d)
- docs.vultr

# Bronnenlijst:
- SuperSimpleDev. (2024, 9 mei). JavaScript Tutorial Full Course - Beginner to Pro [Video]. YouTube. https://www.youtube.com/watch?v=EerdGm-ehJQ
- Dhairya Shah. (2021, 29 december). How to check if checkbox is checked with the help of JavaScript ✅ [Video]. YouTube. https://www.youtube.com/watch?v=fzNl52bEGIQ
- W3Schools.com. (z.d.). https://www.w3schools.com/howto/howto_js_display_checkbox_text.asp
- How do you align text side by side in HTML? (z.d.). Quora. https://www.quora.com/How-do-you-align-text-side-by-side-in-HTML
- Beautiful CSS box-shadow examples - CSS Scan. (z.d.). https://getcssscan.com/css-box-shadow-examples
- Styling option group label. (z.d.). Stack Overflow. https://stackoverflow.com/questions/6415747/styling-option-group-label
- Run javascript function if option selected. (z.d.). Stack Overflow. https://stackoverflow.com/questions/18303740/run-javascript-function-if-option-selected
- How to set HTML5 required attribute in Javascript? (z.d.). Stack Overflow. https://stackoverflow.com/questions/18770369/how-to-set-html5-required-attribute-in-javascrip
- Mr. Virk Media. (2019, 8 april). Javascript Calculate Age from Date of Birth - Step by Step Code Explanation [Video]. YouTube. https://www.youtube.com/watch?v=Q3oiSwdGAq8
- W3Schools.com. (z.d.-b). https://www.w3schools.com/jsref/jsref_parse.asp
- Web Dev Simplified. (2022, 29 januari). How to create a search bar in JavaScript [Video]. YouTube. https://www.youtube.com/watch?v=TlP5WIxVirU
- W3Schools.com. (z.d.-c). https://www.w3schools.com/howto/howto_css_modals.asp
- Email regex Python. (z.d.). https://uibakery.io/regex-library/email-regex-python
- URL regex Python. (z.d.). https://uibakery.io/regex-library/url-regex-python
- Martsoukos, G. (2023, 25 juli). 2 Ways to Make HTML Table Rows Clickable. Web Design Envato Tuts+. https://webdesign.tutsplus.com/how-to-make-html-table-rows-clickable--cms-93552t
- W3Schools.com. (z.d.-d). https://www.w3schools.com/howto/howto_js_filter_table.asp
- docs.vultr https://docs.vultr.com/javascript/examples/generate-random-string#generating-a-basic-random-string

## Afbeeldingen bronnenlijst:
- https://pixabay.com/images/search/bin%20icon/
- https://pixabay.com/illustrations/icon-symbol-design-direction-web-2429830/
- https://pixabay.com/vectors/eye-see-viewing-icon-1103592/
- https://github.com/apancik/public-domain-icons/blob/master/dist/symbol%20cross%20delete%20remove%20multiply.svg