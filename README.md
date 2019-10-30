# ProjectWork_MDM

Per poter eseguire l'applicativo è necessario seguire queste istruzioni:
1. Installare docker sulla macchina
2. Installare le immagini e creare i container con:  
    - sudo bash ./mongo.sh  
    - sudo bash ./influx.sh 
    - sudo bash ./redis.sh
3. Nel file program\Program.cs, se necessario modificare l'ip di redis e quello delle API
4. Avviare il Program.cs contanuto nella cartella 'generatore' mediante il comando "dotnet run Program.cs"
5. Avviare app.js che si trova nella cartella 'backend' tramite il comando "node app.js"
6. Andare nel browser e digitare questo indirizzo "127.0.0.1:5000/"
7. Loggarsi con le credenziali email: admin@trakkabus.it psw: admin
