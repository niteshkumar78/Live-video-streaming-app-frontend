import { useEffect } from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Register from "./Register";

function App() {
  let constraintObj = {
    audio: false,
    video: {
      facingMode: "user",
      width: { min: 640, ideal: 1280, max: 1920 },
      height: { min: 480, ideal: 720, max: 1080 },
    },
  };

  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getDisplayMedia({
  //       audio: true,
  //       video: { mediaSource: "screen" },
  //     })
  //     .then(function (mediaStreamObj) {
  //       //connect the media stream to the first video element
  //       let video = document.querySelector("video");
  //       if ("srcObject" in video) {
  //         video.srcObject = mediaStreamObj;
  //       } else {
  //         //old version
  //         video.src = window.URL.createObjectURL(mediaStreamObj);
  //       }

  //       console.log(mediaStreamObj);

  //       video.onloadedmetadata = function (ev) {
  //         //show in the video element what is being captured by the webcam
  //         console.log(ev);
  //         video.play();
  //       };

  //       //add listeners for saving video/audio
  //       let start = document.getElementById("btnStart");
  //       let stop = document.getElementById("btnStop");
  //       // let vidSave = document.getElementById("vid2");
  //       let mediaRecorder = new MediaRecorder(mediaStreamObj);
  //       let chunks = [];

  //       let myInterval;

  //       start.addEventListener("click", (ev) => {
  //         mediaRecorder.start();

  //         myInterval = setInterval(() => {
  //           // mediaRecorder.requestData();

  //           mediaRecorder.stop();
  //           mediaRecorder.start();
  //         }, 10000);
  //         console.log(mediaRecorder.state);
  //       });
  //       stop.addEventListener("click", (ev) => {
  //         mediaRecorder.stop();
  //         clearInterval(myInterval);
  //         console.log(mediaRecorder.state);
  //       });
  //       mediaRecorder.ondataavailable = function (ev) {
  //         console.log(ev);
  //         console.log(typeof ev.data);
  //         console.log(ev.data);
  //         chunks.push(ev.data);
  //         console.log("chuks");
  //         // const myFile = new File([ev.data], "demo.mp4", {
  //         //   type: "video/mp4",
  //         // });
  //         // // const myFile = new Blob([ev.data], "demo.mp4", {
  //         // //   type: "video/mp4",
  //         // // });
  //         // console.log(myFile);
  //         // // console.log(source);
  //         // const fd = new FormData();
  //         // fd.append("file", myFile);

  //         // // fd.append("data", ev.data);
  //         // // if (ev.data && ev.data.size > 0) {
  //         // fetch("http://localhost:8000/get-stream/", {
  //         //   method: "POST",
  //         //   headers: {
  //         //     //   "Content-Type": "application/json",
  //         //   },
  //         //   body: fd,
  //         // })
  //         //   .then((response) => response.json())
  //         //   .then((result) => {
  //         //     console.log("result");
  //         //   })
  //         //   .catch((e) => {
  //         //     console.log(e);
  //         //   });
  //         // }
  //       };
  //       mediaRecorder.onstop = (ev) => {
  //         let blob = new Blob(chunks, { type: "video/mp4;" });
  //         console.log(chunks);
  //         const myFile = new File(chunks, "demo.mp4", {
  //           type: "video/mp4",
  //         });
  //         // const myFile = new Blob([ev.data], "demo.mp4", {
  //         //   type: "video/mp4",
  //         // });
  //         console.log(myFile);
  //         // console.log(source);
  //         const fd = new FormData();
  //         fd.append("file", myFile);

  //         // fd.append("data", ev.data);
  //         // if (ev.data && ev.data.size > 0) {
  //         fetch("http://localhost:8000/get-stream/", {
  //           method: "POST",
  //           headers: {
  //             //   "Content-Type": "application/json",
  //           },
  //           body: fd,
  //         })
  //           .then((response) => response.json())
  //           .then((result) => {
  //             console.log("result");
  //           })
  //           .catch((e) => {
  //             console.log(e);
  //           });
  //         chunks = [];
  //         let videoURL = window.URL.createObjectURL(blob);
  //       };
  //     })
  //     .catch(function (err) {
  //       console.log(err.name, err.message);
  //     });
  // }, []);
  function handlestopclick() {
    setTimeout(() => {
      fetch("https://screen-share-server.herokuapp.com/merge-videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: ,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 5000);
  }
  // width: 1280, height: 720  -- preference only
  // facingMode: {exact: "user"}
  // facingMode: "environment"
  //handle older browsers that might implement getUserMedia in some way
  // if (navigator.mediaDevices === undefined) {
  //   navigator.mediaDevices = {};
  //   navigator.mediaDevices.getUserMedia = function (constraintObj) {
  //     let getUserMedia =
  //       navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  //     if (!getUserMedia) {
  //       return Promise.reject(
  //         new Error("getUserMedia is not implemented in this browser")
  //       );
  //     }
  //     return new Promise(function (resolve, reject) {
  //       getUserMedia.call(navigator, constraintObj, resolve, reject);
  //     });
  //   };
  // } else {
  //   navigator.mediaDevices
  //     .enumerateDevices()
  //     .then((devices) => {
  //       devices.forEach((device) => {
  //         console.log(device.kind.toUpperCase(), device.label);
  //         //, device.deviceId
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err.name, err.message);
  //     });
  // }

  // navigator.mediaDevices
  //   .getUserMedia(constraintObj)

  return (
    <div className="App">
      {/* <main>
        <p>
          <button id="btnStart">START RECORDING</button>
          <br />
          <button id="btnStop" onClick={handlestopclick}>
            STOP RECORDING
          </button>
          <br />
        </p>

        <video controls></video>
      </main> */}
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/" element={<Navigate to="/register" />} />

          <Route element={<div>Error</div>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
