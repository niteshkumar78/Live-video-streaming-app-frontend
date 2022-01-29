import React from "react";
import "./loader2.css";
// import checked from "./images/checked.png";

function Loader2(props) {
  return (
    <div
      className="loader2Main"
      style={{
        position: "fixed",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        width: "100%",
        height: "100vh",
        // zIndex: "99999999999",
        // backgroundColor: "black",
      }}
    >
      <div
        className="containerLoader"
        style={{ zIndex: "99", height: "100vh" }}
      >
        <div
          className="containerLoader2"
          style={{ marginTop: "-100px", textAlign: "center" }}
        >
          {/* <div>Please Wait...............</div> */}
          {/* <img
            src={checked}
            width="150px"
            style={{ marginLeft: "10%", marginRight: "10%" }}
          /> */}
          {/* <div>{props.image}</div> */}
          <h4>Your Recorded Video Link</h4>

          <div
            style={{
              border: "1px solid black",
              padding: "10px",
              lineHeight: "10px",
              // paddingBottom: "-10px",
            }}
          >
            <p style={{ display: "inline-block" }}>
              <b>
                https://screen-share-server.herokuapp.com/{props.userId}
                /output.mp4
              </b>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <button
              style={{ display: "inline-block", padding: "2px" }}
              class="btn btn-primary"
              id="copyButton"
              onClick={(e) => {
                navigator.clipboard.writeText(
                  `https://screen-share-server.herokuapp.com/${props.userId}/output.mp4`
                );
                document.getElementById("copyButton").style.backgroundColor =
                  "green";
              }}
            >
              <b>copy</b>
            </button>
          </div>
          <button
            class="btn btn-primary"
            style={{ marginTop: "20px", padding: "5px" }}
            onClick={() => {
              props.getLink.setValue(false);
            }}
          >
            <b>close</b>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Loader2;
