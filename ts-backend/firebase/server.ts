import { router } from './routes/route_01'
import express from 'express';
import cors from 'cors';

require('dotenv').config();

const app = express();
app.use(express.json());
{
  // app.use(cors());
}
// What is cors for
// Cross-Origin Resource Sharing (CORS) is a security feature implemented in browsers to prevent JavaScript code from making requests to a 
// different domain than the one that served the JavaScript code. This is a security feature to prevent malicious websites from making requests 
// to other websites on behalf of the user. When you enable CORS in your server, you allow your server to accept requests from other domains. 
// This is useful when you have a frontend application that makes requests to a backend server. By enabling CORS, 
// you allow the frontend application to make requests to the backend server.


app.use('/api/fs/ee', router);

const PORT = process.env.PORT || 5000;

// for http
{
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// following code is for https

// import fs from 'fs';
{

  // POWERSHELL
    // $cert = New-SelfSignedCertificate -DnsName "localhost" -CertStoreLocation "Cert:\LocalMachine\My" -KeyLength 2048 -NotAfter (Get-Date).AddYears(1)
    // $password = ConvertTo-SecureString -String "YourPassword" -Force -AsPlainText
    // Export-PfxCertificate -Cert $cert -FilePath "C:\cert\selfsigned.pfx" -Password $password

  // OPENSSL
    // openssl pkcs12 -in C:\cert\selfsigned.pfx -nocerts -out C:\cert\selfsigned.key -nodes
    // Enter Import Password: >> YourPassword
    // openssl pkcs12 -in C:\cert\selfsigned.pfx -clcerts -nokeys -out C:\cert\selfsigned.crt
    // Enter Import Password: >> YourPassword


  // var key = fs.readFileSync(__dirname + '../../certs/selfsigned.key');
  // var cert = fs.readFileSync(__dirname + '../../certs/selfsigned.crt');
  // var options = {
  //   key: key,
  //   cert: cert
  // };

  // const https = require('https');

  // var server = https.createServer(options, app);

  // server.listen(PORT, () => {
  //   console.log("server starting on port : " + PORT)
  // });

}