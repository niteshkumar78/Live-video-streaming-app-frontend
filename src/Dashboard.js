import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import SuccessMessageAlert from "./SuccessMessageAlert";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value: value,
    setValue,
  };
}

function Dashboard(props) {
  const navigate = useNavigate();
  const videoRecording = useInput(false);
  const getLink = useInput(false);
  const stopRecordingLoader = useInput(false);

  let constraintObj = {
    audio: false,
    video: {
      facingMode: "user",
      width: { min: 640, ideal: 1280, max: 1920 },
      height: { min: 480, ideal: 720, max: 1080 },
      frameRate: { ideal: 10, max: 15 },
    },
  };
  const { state } = useLocation();
  useEffect(() => {
    if (state === null) {
      navigate("/register");
    } else {
      navigator.mediaDevices
        .getDisplayMedia({
          audio: true,
          video: { mediaSource: "screen" },
        })
        .then(function (mediaStreamObj) {
          //connect the media stream to the first video element
          let video = document.querySelector("video");
          if ("srcObject" in video) {
            video.srcObject = mediaStreamObj;
          } else {
            //old version
            video.src = window.URL.createObjectURL(mediaStreamObj);
          }

          console.log(mediaStreamObj);

          video.onloadedmetadata = function (ev) {
            //show in the video element what is being captured by the webcam
            console.log(ev);
            video.play();
          };

          //add listeners for saving video/audio
          let start = document.getElementById("btnStart");
          let stop = document.getElementById("btnStop");
          // let vidSave = document.getElementById("vid2");
          let mediaRecorder = new MediaRecorder(mediaStreamObj);
          let chunks = [];

          let myInterval;

          start.addEventListener("click", (ev) => {
            mediaRecorder.start();

            myInterval = setInterval(() => {
              // mediaRecorder.requestData();

              mediaRecorder.stop();
              mediaRecorder.start();
            }, 10000);
            console.log(mediaRecorder.state);
          });
          stop.addEventListener("click", (ev) => {
            mediaRecorder.stop();
            clearInterval(myInterval);
            console.log(mediaRecorder.state);
          });
          mediaRecorder.ondataavailable = function (ev) {
            console.log(ev);
            console.log(typeof ev.data);
            console.log(ev.data);
            chunks.push(ev.data);
            console.log("chuks");
            // const myFile = new File([ev.data], "demo.mp4", {
            //   type: "video/mp4",
            // });
            // // const myFile = new Blob([ev.data], "demo.mp4", {
            // //   type: "video/mp4",
            // // });
            // console.log(myFile);
            // // console.log(source);
            // const fd = new FormData();
            // fd.append("file", myFile);

            // // fd.append("data", ev.data);
            // // if (ev.data && ev.data.size > 0) {
            // fetch("http://localhost:8000/get-stream/", {
            //   method: "POST",
            //   headers: {
            //     //   "Content-Type": "application/json",
            //   },
            //   body: fd,
            // })
            //   .then((response) => response.json())
            //   .then((result) => {
            //     console.log("result");
            //   })
            //   .catch((e) => {
            //     console.log(e);
            //   });
            // }
          };
          mediaRecorder.onstop = (ev) => {
            let blob = new Blob(chunks, { type: "video/mp4;" });
            console.log(chunks);
            const myFile = new File(chunks, +state.userName, {
              type: "video/mp4",
            });
            // const myFile = new Blob([ev.data], "demo.mp4", {
            //   type: "video/mp4",
            // });
            console.log(myFile);
            // console.log(source);
            const fd = new FormData();
            fd.append("userId", state.userName);
            fd.append("file", myFile);

            // fd.append("data", ev.data);
            // if (ev.data && ev.data.size > 0) {
            fetch("https://screen-share-server.herokuapp.com/get-stream/", {
              method: "POST",
              headers: {
                //   "Content-Type": "application/json",
              },
              body: fd,
            })
              .then((response) => response.json())
              .then((result) => {
                console.log("result");
              })
              .catch((e) => {
                console.log(e);
              });
            chunks = [];
            let videoURL = window.URL.createObjectURL(blob);
          };
        })
        .catch(function (err) {
          console.log(err.name, err.message);
        });
    }
  }, []);
  function handlestopclick() {
    stopRecordingLoader.setValue(true);

    setTimeout(() => {
      fetch("https://screen-share-server.herokuapp.com/merge-videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: state.userName,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if ((result.message = "success")) {
            videoRecording.setValue(false);
            getLink.setValue(true);
            stopRecordingLoader.setValue(false);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }, 5000);
  }
  return (
    <main>
      {getLink.value && (
        <SuccessMessageAlert getLink={getLink} userId={state.userName} />
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <video
          controls
          style={{ width: "70%", margin: "0 auto", border: "2px solid black" }}
        ></video>
      </div>
      <div
        style={{
          display: "inline-block",
          marginTop: "20px",
          marginLeft: "20px",
        }}
      >
        <button
          id="btnStart"
          disabled={videoRecording.value ? true : false}
          onClick={() => {
            videoRecording.setValue(true);
          }}
          className="btn btn-primary"
        >
          START RECORDING
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button
          id="btnStop"
          onClick={handlestopclick}
          disabled={videoRecording.value ? false : true}
          className="btn btn-primary"
        >
          STOP RECORDING{" "}
          {stopRecordingLoader.value && (
            <div
              class="spinner-border text-light"
              role="status"
              style={{ height: "20px", width: "20px" }}
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
        <br />
      </div>
    </main>
  );
}

export default Dashboard;
