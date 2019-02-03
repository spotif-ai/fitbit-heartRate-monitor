import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { me } from "appbit";

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
  }
  else{
    heartRateSensor.start();
  }
}

heartRateSensor.onreading = function() {
  console.log("Current heart rate: " + heartRateSensor.heartRate);
  myLabel.text = "HR: " + heartRateSensor.heartRate;
}

bodysensor.start();




