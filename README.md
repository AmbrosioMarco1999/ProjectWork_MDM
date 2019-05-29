# ProjectWork_MDM

Per poter eseguire l'applicativo è necessario seguire queste istruzioni:
1. Nel file program\Program.cs, se necessario modificare l'ip di redis e quello delle API
2. Avviare il program.cs mediante il comando "dotnet run program.cs"
3. Modificare gli IP dei database nel file APICURRENT/config/keys.js
4. Avviare app.js tramite il comando "node app.js"
5. Andare nel browser e digitare questo indirizzo "127.0.0.1:5000/users/register"
6. Registrare un utente e loggarsi al segunte indirizzo "127.0.0.1:5000/users/login127.0.0.1:5000/users/register" con le credenziali appena inserite
7. Se il tutto è andato a buon fine, potremo vedere in tempo reale sulla nostra dashboard l'andamento della presenza di persone all'interno dell'autobus, per ora dell'autobus con id=1
