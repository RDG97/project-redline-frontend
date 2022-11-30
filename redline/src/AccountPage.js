import axios from "axios";
import React from "react";
import { Ref } from "react";
import { useEffect, useState, useCallback } from "react";

import { useGlobalState } from "./context/GlobalState";
import authService from "./services/auth.service";


import jwtDecode from "jwt-decode";

//QUESTIONS "detail": "Authentication credentials were not provided." when viewing API, how to handle logins (how to know if youre logged in and as what user), how to do login request

export default function AccountPage(props) {



  const [ state, dispatch ] = useGlobalState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    console.log('username is: ', username)

    authService
    
      .login(username, password)
      .then(async (resp) => {
        let data = jwtDecode(resp.access)
        await dispatch({
          currentUserToken: resp.access,
          currentUser: data
        })
      });
  }















  function createAccount(props) {
    console.log('ran create account')
    let cusername = document.querySelector('.username')
    let pass1 = document.querySelector('.pass1')
    let pass2 = document.querySelector('.pass2')
    let sname = document.querySelector('.sname')
    let bio = document.querySelector('.bio')
    let pfp = document.getElementById('pfp')
    let email = document.querySelector('.email')
    let expl = document.getElementById('expl')
    console.log('expl is: ', expl.checked)

    if (expl.checked === true) {
      console.log('explicit content off!')
      expl = 1
    } else {
      console.log('explicit content left on!')
      expl = 0
    }
    console.log('expl is now: ', expl)
    if (pass1.value != pass2.value) {
      console.log('passwords arnt the same')
      return
    } else {console.log('passwords ARE the same... good job bud')}
    console.log('pfpvalue', pfp.value)

    axios.post('https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us77.gitpod.io/Users/', {
      filter_explicit: expl,
      screen_name: sname.value,
      bio: bio.value,
      profile_pic: pfp.value,
      username: cusername.value,
      password: pass1.value,
      email: email.value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  


  function login(props) {
    console.log('data: ', props.data)
    let lusername = document.querySelector('.lusername').value
    let lpassword = document.querySelector('.logPassword').value
    console.log(lusername)
    setPassword(lpassword)
    setUsername(lusername)




//    axios.post('https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us77.gitpod.io/token/obtain/', {
//      username: lusername.value,
//      password: lpassword.value
//    })
//    .then(function (response) {
//      console.log('LOGIN WORKED!: ', response);
//    })
//    .catch(function (error) {
//      console.log('LOGIN FAILED: ', error);
//    });
  }
function tesst(props) {
  console.log('username', username)
}

    return (
      
        <div className='d-flex p-3 bg-warning text-white asside d-none d-lg-block'>
          <button onClick={handleLogin}></button>
        <div className='container-fluid bg-light border text-dark'>
        <div className='border pfp bg-secondary rounded-pill'></div>
        <p>you arent signed in!</p>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginBackdrop">
            Log in
        </button>
        <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalToggleLabel">Register</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
              <div class="input-group">
                <input type="text" class="form-control username" placeholder="Username (will be your @)" id='username'></input>
                
              </div>
              <br></br>
              <div class="input-group">
                <input type="password" class="form-control pass1" placeholder="Password" id='pass1'></input>
              </div>
              <br></br>
              <div class="input-group">
                <input type="password" class="form-control pass2" placeholder="Confirm Password" id='pass2'></input>
              </div>
        </form>
      </div>
      <div class="modal-footer">
      <div className="btn-group btn-group">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Next</button>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalToggleLabel2">A few more details...</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form>
      <div class="input-group">
                            <input type="text" class="form-control sname" placeholder="Screen name" id="sname"></input>
                          </div>
                          <br></br>
                          <div class="input-group">
                            <input type="text" class="form-control bio" placeholder="Bio" id="bio"></input>
                          </div>
                          <br></br>
                          <div class="input-group">
                            <input type="text" class="form-control pfp" placeholder="Profile Pic (only links supported)" id="pfp"></input>
                            
                          </div>
                          <br></br>
                          <div class="input-group">
                            <input type="text" class="form-control email" placeholder="Email" id="email"></input>
                          </div>
                          <div>
                          <input type="checkbox" class="expl" id="expl" name="expl" value="1"></input>
                          <label for="expl">  filter explicit content?</label>
                          </div>
      </form>
      </div>
      <div class="modal-footer">
      <div className="btn-group btn-group">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={createAccount}>Submit</button>
      </div>
      </div>
    </div>
  </div>
</div>
<a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Register</a>

        </div>
                    <div class="modal fade text-dark" id="loginBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="loginBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="loginBackdropLabel"> Log in</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  <form>
                          <div class="input-group">
                            <span class="input-group-text">@</span>
                            <input type="text" class="form-control lusername" placeholder="Username" id='lusername'></input>
                          </div>

                          <div class="input-group">
                            <input type="password" class="form-control logPassword" placeholder="Password" id="logPassword"></input>
                            <span class="input-group-text">🔒</span>
                          </div>

                        </form>
                  </div>
                  <div className="btn-group btn-group-sm">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={login}>Log in</button>
                    </div>
                </div>
              </div>
            </div>
      </div>
      
    )
}