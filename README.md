`npx create-react-app gcp-vision-ai`

Suggest to go set up firebase project first via the website, could use the command line cli, but suggest the web console as easy to grab the config values for the .env file

Install firebase cli for use on your command line https://firebase.google.com/docs/cli#mac-linux-npm
`npm install -g firebase-tools`

with the cli installed can run init to get the functions started easily

`firebase init`

https://gyazo.com/b052f95c14970cb49d4da364efb430cc

`cd functions`

into the functions and then install the gcp cloud vision

`npm i @google-cloud/vision`

Enable the vision api in your gcp console

https://cloud.google.com/vision/docs/setup#api

https://console.cloud.google.com/
