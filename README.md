
# VerifizierBAR: Die IPT App für verifizierten Spass

  
In diesem Workshop lernt ihr Hands-On wie man mithilfe von Microsoft Entra Verified IDs ausstellen und verifizieren kann. Dafür haben wir eine kleine Demo App vorbereitet. Blöderweise sind in unserem Projekt wichtige Stellen im Code verloren gegangen und wir brauchen eure Hilfe um den Code wieder zu vervollständigen.

 
## Getting Started

  

### Prerequisites
* [Node.js](https://nodejs.org/en/download)

* [Ngrok](https://ngrok.com/download):  Installiert und Gratis-Account

* Microsoft Authenticator App

### Installation

  

1. `git clone https://github.com/Gerdome/-2023-04-vis-workshop.git`
2. `git checkout workshop`
2. Im Frontend Ordner (vis-workshop-frontend): `npm install` & `npm start` => Damit läuft die Frontend App auf `localhost:3000`
3. Im Backend Ordner (vis-workshop-backend): `.env` file erstellen und anpassen (Siehe Slides)

4. Im Backend Ordner (vis-workshop-backend): `npm install` & `node app.js` => Damit läuft die Backend App auf `localhost:5050`
5. Verifiziere das Backend Server lokal läuft: Im beliebigen Browser `localhost:5050/ping` öffnen. Es sollte `{"ping":true}` zurück gegeben werden.

5. Lokaler Backend Server via ngrok im Internet freigeben: `ngrok http 5050` => Wichtig: Die ngrok URL wird im Output der Konsole angezeigt und wird später wieder benötigt
   
> :information_source: Nun solltet ihr in einem beliebigen Browser über localhost:3000 auf die VerifizierBAR App zugreifen können und rechts oben in der AppBar einen Haken sehen.

 ## Challenges

### Erstelle dir deine eigene Verifiable ID 
1. Vervollständige im Backend Projekt im `app.js` den `/request-credential` Endpunkt, indem du den Payload entsprechend der [Issuance API Spezifikation](https://learn.microsoft.com/en-us/azure/active-directory/verifiable-credentials/issuance-request-api) anpasst:
    - Endpoint muss auf die Entra Issuance API URL zeigen
    - Callback URL soll auf den bereits implementieren Endpoint im Backend `/issuance-callback` zeigen (Achtung: NGROK URL benötigt)
    - Claims die vom Frontend übergeben werden müssen an die Entra API weitergeleitet werden:
      - given-name
      - last_name
      - age
2. WICHTIG: Sobald du Änderungen am Backend vornimmst muss der Server neu gestartet werden: `ctrl + c` & `node app.js`
3. Vervollständige im Frontend Projekt im `Form.js` die `getCredential()` Methode
    - Backend Endpunkt anpassen (Tipp: Es muss der Endpunkt aufgerufen werden, den ihr gerade angepasst habt)
    - HTTP Methode anpassen
    - Body anpassen (Tipp: Es müssen die gleichen Claims im Body übergeben werden, die dann vom Backend weiter an die Entra API geschickt werden)
4. In der Web App auf den `Issue ID` Button klicken, beliebige Informationen in das Formular eintragen und abschicken. Falls erfolgreich sollte nun ein QR Code angezeigt werden. 
5. QR Code mit der Microsoft Authenticator App scannen und ID in der App erstellen. 
6. Sicherstellen, dass ID die Informationen anzeigt, die gerade im Formular eingegeben wurden.

### Verifiziere ausgestellte IDs
1. Vervollständige im Backend Projekt im `app.js` den `/request-verification` Endpunkt, indem du den Payload entsprechend der [Presentation API Spezifikation](https://learn.microsoft.com/en-us/azure/active-directory/verifiable-credentials/presentation-request-api) anpasst:
   - Endpoint muss auf die Entra Presentation API URL zeigen
   - Callback URL soll auf den bereits implementieren Endpoint im Backend `/verification-callback` zeigen (Achtung: NGROK URL benötigt)
2. In der Web App über das Home Symbol wieder zur Startseite navigieren
3. `Verify ID` Button klicken
4. `Verify Some Credential` Button klicken
5. Falls Backend richtig konfiguriert erscheint nun ein QR Code
6. QR Code mit der Microsoft Authenticator App scannen und Verifiable ID auswählen, die präsentiert werden soll

### Extra Challenge: Füge einen PIN Code Beim ID Erstellen hinzu
Um den Erstellungs-Prozess einer Verifiable ID noch sicherer zu gestalten, kann eine PIN an die Entra API übergeben werden, die dann innerhalb der Microsoft Authenticator App eingegeben werden muss. Dafür findet ihr im Frontend Projekt bereits eine `pin` Variable, die allerdings noch nicht verwendet wird. Diese muss nun:
1. Im Frontend innerhalb der `getCredential` Methode als zufällige 4-stellige Zahl erzeugt werden und im Body an das Backend übergeben werden
2. Im Frontend dem User angezeigt werden, damit dieser sie später in der Authenticator App eingeben kann (Achtung: Die Pin soll in der Web App erst angezeigt werden, sobald der Erstellungsprozess mittels der Authenticator App gestartet wurde)
3. Im Backend im `/request-credential` Endpunkt aus dem Request ausgelesen werden und an die Entra API als Claim weitergeben werden


Viel Spass und bei Fragen einfach jederzeit melden :)