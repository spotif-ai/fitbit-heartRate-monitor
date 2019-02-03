import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { me } from "appbit";
import firebase from "firebase";
import 'firebase/storage';



const myLabel = document.getElementById("myLabel");

var config = {
    apiKey: "AIzaSyAMvAZt36acSjcZAh5MsIcTinA6fZSh5cE",
    authDomain: "spotif-ai-3c5c6.firebaseapp.com",
    databaseURL: "https://spotif-ai-3c5c6-35a1b.firebaseio.com",
    projectId: "spotif-ai-3c5c6",
    storageBucket: "spotif-ai-3c5c6-35a1b.appspot.com",
    messagingSenderId: "38521654950"
 };

const app = firebase.initializeApp({
    apiKey: "AIzaSyAMvAZt36acSjcZAh5MsIcTinA6fZSh5cE",
    authDomain: "spotif-ai-3c5c6.firebaseapp.com",
    databaseURL: "https://spotif-ai-3c5c6-35a1b.firebaseio.com",
    projectId: "spotif-ai-3c5c6",
    storageBucket: "spotif-ai-3c5c6-35a1b.appspot.com",
    messagingSenderId: "38521654950"
});

var database = firebase.database();



// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element

const myLabel = document.getElementById("myLabel");

var bodysensor = new BodyPresenceSensor();

if (me.permissions.granted("access_heart_rate")){
  var heartRateSensor = new HeartRateSensor();
}

bodysensor.onreading = () =>{
  if(!bodysensor.present){
    heartRateSensor.stop();
    myLabel.text = "ERROR";
  }
  else{
    heartRateSensor.start();
  }
}

heartRateSensor.onreading = function() {
  console.log("Current heart rate: " + heartRateSensor.heartRate);
  myLabel.text = "HR: " + heartRateSensor.heartRate;
  writeUserData(heartRateSensor.heartRate)
}

function writeUserData(heartRate) {
  firebase.database().ref('heartRate/').set({
    heartrate: heartRate
 });
}

bodysensor.start();




