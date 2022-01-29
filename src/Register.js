import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value: value,
    setValue,
  };
}

function Register(props) {
  const userName = useInput("");

  const navigate = useNavigate();
  function handleFormSubmit(e) {
    e.preventDefault();
    const date = Date.now();
    const fd = new FormData();
    // fd.append("file", myFile);
    // fd.append("userId", userName.value);

    // fd.append("data", ev.data);
    // if (ev.data && ev.data.size > 0) {
    fetch("https://screen-share-server.herokuapp.com/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userName.value + date,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.message == "success") {
          navigate("/dashboard", {
            state: { userName: userName.value + date },
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });

    // console.log("called");
    // alert("Hi");
  }
  return (
    <body class="text-center">
      <main class="form-signin" style={{ margin: "0 auto" }}>
        <form onSubmit={handleFormSubmit}>
          {/* <img
            class="mb-4"
            src="/docs/5.1/assets/brand/bootstrap-logo.svg"
            alt=""
            width="72"
            height="57"
          /> */}
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

          <div class="form-floating">
            <input
              required
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Enter your name"
              onChange={(e) => {
                userName.setValue(e.target.value);
              }}
            />
            <label for="floatingInput">Enter your name</label>
          </div>
          {/* <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div> */}

          {/* <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div> */}
          <button
            class="w-100 btn btn-lg btn-primary"
            type="submit"
            style={{ marginTop: "20px" }}
          >
            Sign in
          </button>
          {/* <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> */}
        </form>
      </main>
    </body>
  );
}

export default Register;
