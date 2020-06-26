const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const realTimeDB = admin.database();

const vision = require("@google-cloud/vision");
//* set up the vision api as client *//
const client = new vision.ImageAnnotatorClient();

exports.visionCheck = functions.database
  .ref("new/{pushId}")
  .onCreate(async (snapshot, context) => {
    //*  grab the new push id from the context params *//
    //*  i called it /{pushId} above on line 12 *//
    const pushId = context.params.pushId;

    //*  get the snapshot *//
    const theUpload = snapshot.val();

    //* run the object recognition on the image url *//
    const [theResult] = await client.objectLocalization(theUpload.url);
    //* got the objects *//
    const objects = theResult.localizedObjectAnnotations;

    //* run the text recognition on the image url *//
    // const [result] = await client.textDetection(theUpload.url);
    // const detections = result.textAnnotations;

    //* run the logo recognition on the image url *//
    // const [the2ndResult] = await client.logoDetection(theUpload.url);
    // const logos = the2ndResult.logoAnnotations;

    //* update the database with our object recognitions *//
    const newRef = realTimeDB.ref(`new/${pushId}`);

    newRef.update({
      // detections,
      objects,
      // logos,
    });

    return console.log("all done");
  });
