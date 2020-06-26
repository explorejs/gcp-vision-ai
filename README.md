`npx create-react-app gcp-vision-ai`

Suggest to go set up firebase project first via the firebase website https://console.firebase.google.com/

Could also use the firebase cli to start a new project, but suggest the web console as easy to grab the config values for the .env file

To install the firebase cli for use via command line https://firebase.google.com/docs/cli#mac-linux-npm

`npm install -g firebase-tools`

with the cli installed can run init to get the functions started easily

`firebase init`

https://gyazo.com/b052f95c14970cb49d4da364efb430cc

`cd functions`

Once inside the functions folder install gcp cloud vision

`npm i @google-cloud/vision`

Enable the vision api in your gcp console

https://cloud.google.com/vision/docs/setup#api

https://console.cloud.google.com/

Start identifying the objects in your images !
