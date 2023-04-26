
# VerifizierBAR: Die IPT App für verifizierten Spass

  
In diesem Workshop lernt ihr Hands-On wie man mithilfe von Microsoft Entra Verified IDs ausstellen und verifizieren kann. Dafür haben wir eine kleine Demo App vorbereitet. Blöderweise sind in unserem Projekt wichtige Stellen im Code verloren gegangen und wir brauchen eure Hilfe um den Code wieder zu vervollständigen.

 
## Getting Started

  

### Prerequisites
* [Node.js](https://nodejs.org/en/download)

* [Ngrok](https://ngrok.com/download):  Installiert und Gratis-Account

* Microsoft Authenticator App

### Installation

  

1. `git clone https://github.com/Azure-Samples/ms-identity-javascript-nodejs-console.git`
2. `git checkout workshop`
2. Im Frontend Ordner (vis-workshop-frontend): `npm install` & `npm start` => Damit läuft die Frontend App auf `localhost:3000`
3. Im Backend Ordner (vis-workshop-backend): `.env` file anpassen (Siehe Slides)

4. Im Backend Ordner (vis-workshop-backend): `node app.js` => Damit läuft die Backend App auf `localhost:5050`

5. Lokaler Backend Server via ngrok im Internet freigeben: `ngrok http 5050` => Wichtig: Die ngrok URL wird im Output der Konsole angezeigt und wird später wieder benötigt
   
> :information_source: Nun solltet ihr in einem beliebigen Browser über localhost:3000 auf die VerifizierBAR App zugreifen können und rechts oben in der AppBar einen Haken sehen.

 ## Challenges

### Erstelle dir deine eigene Verifiable ID 
1. Vervollständige im Backend Projekt den `/request-credential` Endpunkt
	- Payload entsprechend der [Issuance API Spezifikation](https://learn.microsoft.com/en-us/azure/active-directory/verifiable-credentials/issuance-request-api) anpassen:
	- Callback URL soll auf den bereits implementieren Endpoint im Backend `/issuance-callback` zeigen (Achtung: NGROK URL benötigt)
2. Vervollständige im Frontend Projekt die `getCredential` Methode
	- Backend Endpunkt ersetzen (Tipp: Es muss der Endpunkt aufgerufen werden. den ihr gerade angepasst habt)
	- HTTP Methode, Headers und Body ersetzen (Tipp: Im Backend ist bereits angegeben welche Claims der Endpunkt erwartet)
3. In der Web App auf den `Issue ID` Button klicken, beliebige Informationen in das Formular eintragen und abschicken. Falls erfolgreich sollte nun ein QR Code angezeigt werden. 
4. QR Code mit der Microsoft Authenticator App scannen und ID in der App erstellen. 

### Verifiziere ausgestellte IDs
1. Vervollständige im Backend Projekt den `/request-verification` Endpunkt
	- Payload entsprechend der [Presentation API Spezifikation](https://learn.microsoft.com/en-us/azure/active-directory/verifiable-credentials/presentation-request-api) anpassen
2. In der Web App über das Home Symbol wieder zur Startseite navigieren
3. `Verify ID` Button klicken
4. `Verify Some Credential` Button klicken
5. Falls Backend richtig konfiguriert erscheint nun ein QR Code
6. QR Code mit der Microsoft Authenticator App scannen und Verifiable ID auswählen, die präsentiert werden soll

### Extra Challenge: Füge einen PIN Code Beim ID Erstellen hinzu
Um den Erstellungs-Prozess einer Verifiable ID noch sicherer zu gestalten, kann eine PIN an die Entra API übergeben werden, die dann innerhalb der Microsoft Authenticator App eingegeben werden muss. Dafür findet ihr im Frontend Projekt bereits eine `pin` Variable, die allerdings noch nicht verwendet wird. Diese muss nun:
1. Im Frontend innerhalb der `getCredential` Methode als zufällige 4-stellige Zahl erzeugt werden.
2. Im Frontend dem User angezeigt werden, damit dieser sie später in der Authenticator App eingeben kann.
3. Im Backend im `/request-credential` Endpunkt aus dem Request ausgelesen werden und an die Entra API weitergeben werden


Bei Fragen einfach melden :) 





### Tipps

		- Endpoint: https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createIssuanceRequest
		- Callback URL: {ngrok-url}/issuance-callback
		- Manifest URL: https://verifiedid.did.msidentity.com/v1.0/tenants/a9080dcf-8589-4cb6-a2e2-21398dc6c671/verifiableCredentials/contracts/0c035ed1-2e13-c786-a03a-eee4459541dd/manifest