import axios from "axios";
import React from "react";
import { Ref } from "react";
import { useEffect, useState, useCallback, state } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "./context/GlobalState";
import authService from "./services/auth.service";
import App from "./App";

import jwtDecode from "jwt-decode";

export default function AccountPage(props) {

  const [state, dispatch] = useGlobalState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [proFollow, setProFollow] = useState([]);

  const handleLogin = (un, pw) => {
    console.log("username is: ", username);

    authService.login(un, pw).then(async (resp) => {
      let data = jwtDecode(resp.access);
      await dispatch({
        currentUserToken: resp.access,
        currentUser: data,
      });
    });
  };

  function login(props) {
    console.log("data: ", props.data);
    let lusername = document.querySelector(".lusername").value;
    let lpassword = document.querySelector(".logPassword").value;
    console.log(lusername);
    setPassword(lpassword);
    setUsername(lusername);

    handleLogin(lusername, lpassword);
    setTimeout(() => {
      window.location.reload();
    }, "1000");
  }

  function createAccount(props) {
    console.log("ran create account");
    let cusername = document.querySelector(".username");
    let pass1 = document.querySelector(".pass1");
    let pass2 = document.querySelector(".pass2");
    let sname = document.querySelector(".sname");
    let bio = document.querySelector(".bio");
    let pfp = document.getElementById("pfp");
    let email = document.querySelector(".email");
    let expl = document.getElementById("expl");
    console.log("expl is: ", expl.checked);

    if (expl.checked === true) {
      console.log("explicit content off!");
      expl = 1;
    } else {
      console.log("explicit content left on!");
      expl = 0;
    }
    console.log("expl is now: ", expl);
    if (pass1.value != pass2.value) {
      console.log("passwords arnt the same");
      return;
    } else {
      console.log("passwords ARE the same... good job bud");
    }
    console.log("pfpvalue", pfp.value);

    axios
      .post("https://project-redline-backend.ue.r.appspot.com/Users/", {
        filter_explicit: expl,
        screen_name: sname.value,
        bio: bio.value,
        profile_pic: pfp.value,
        username: cusername.value,
        password: pass1.value,
        email: email.value,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function logout() {
    authService.logout();
    
    window.location.reload();
  }

  function postview() {
    props.setPage("makepost");
  }

  let followList = props.following;

  console.log("FOLLOWING DATA 2", props.following);

  return (
    <div className="d-flex p-3 greyback text-white asside d-none d-lg-block">
      <div className="container-fluid greyback text-light rounded">
        {!state.currentUser && (
          <>
            <p>you arent signed in!</p>
            <button
              type="button"
              class="btn btn-primary mx-1"
              data-bs-toggle="modal"
              data-bs-target="#loginBackdrop"
            >
              Log in
            </button>
          </>
        )}
        {state.currentUser && (
          <>
            <div className="border pfp bg-secondary rounded-pill">
              <img
                src={props.loggedAs.profile_pic}
                className="pfp rounded-pill border"
              ></img>
            </div>
            <h3>{props.loggedAs.screen_name}</h3>
            <h6
              className="text-redline"
              onClick={() => {
                props.setProfilePage(props.loggedAs.username);
                props.setPage("yourprofile");
              }}
            >
              @{props.loggedAs.username}
            </h6>
            <div
              class="btn-group-sm"
              role="group"
              aria-label="Basic outlined example"
            >
              <button type="button" class="btn btn-outline-danger ">
                {" "}
                {0} Followers
              </button>

              <button type="button" class="btn btn-outline-danger">
                {0} Following
              </button>
            </div>
            <a class="btn btn-primary mx-1" onClick={logout} role="button">
              Log Out
            </a>
            <button
              type="button"
              class="btn btn-primary"
              onClick={postview}
              data-bs-target="#loginBackdrop"
            >
              Make a post
            </button>
          </>
        )}

        <div
          class="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabindex="-1"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-dark" id="exampleModalToggleLabel">
                  Register
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                <form>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control username"
                      placeholder="Username (will be your @)"
                      id="username"
                    ></input>
                  </div>
                  <br></br>
                  <div class="input-group">
                    <input
                      type="password"
                      class="form-control pass1"
                      placeholder="Password"
                      id="pass1"
                    ></input>
                  </div>
                  <br></br>
                  <div class="input-group">
                    <input
                      type="password"
                      class="form-control pass2"
                      placeholder="Confirm Password"
                      id="pass2"
                    ></input>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <div className="btn-group btn-group">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    class="btn btn-primary"
                    data-bs-target="#exampleModalToggle2"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="exampleModalToggle2"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
          tabindex="-1"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-dark" id="exampleModalToggleLabel2">
                  A few more details...
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control sname"
                      placeholder="Screen name"
                      id="sname"
                    ></input>
                  </div>
                  <br></br>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control bio"
                      placeholder="Bio"
                      id="bio"
                    ></input>
                  </div>
                  <br></br>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control pfp"
                      placeholder="Profile Pic (only links supported)"
                      id="pfp"
                    ></input>
                  </div>
                  <br></br>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control email"
                      placeholder="Email"
                      id="email"
                    ></input>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      class="expl text-dark"
                      id="expl"
                      name="expl"
                      value="1"
                    ></input>
                    <label for="expl"> filter explicit content?</label>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <div className="btn-group btn-group">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={createAccount}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!state.currentUser && (
          <a
            class="btn btn-primary"
            data-bs-toggle="modal"
            href="#exampleModalToggle"
            role="button"
          >
            Register
          </a>
        )}
      </div>
      <div
        class="modal fade text-dark"
        id="loginBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="loginBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="loginBackdropLabel">
                {" "}
                Log in
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="input-group">
                  <span class="input-group-text">@</span>
                  <input
                    type="text"
                    class="form-control lusername"
                    placeholder="Username"
                    id="lusername"
                  ></input>
                </div>

                <div class="input-group">
                  <input
                    type="password"
                    class="form-control logPassword"
                    placeholder="Password"
                    id="logPassword"
                  ></input>
                  <span class="input-group-text">🔒</span>
                </div>
              </form>
            </div>
            <div className="btn-group btn-group-sm">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={login}>
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
