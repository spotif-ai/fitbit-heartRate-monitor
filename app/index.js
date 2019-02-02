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

var body = new BodyPresenceSensor();

if (me.permissions.granted("access_heart_rate")){
  var heartRateSensor = new HeartRateSensor();
}



heartRateSensor.onreading = function() {
  console.log("Current heart rate: " + heartRateSensor.heartRate);
  myLabel.text = `${"Heart Rate:"}:${heartRateSensor.heartRate}`;
}

hearRateSensor.start()


