import axios from "axios";
import React from "react";
import { Ref } from "react";
import { useEffect, useState, useCallback } from "react";



export default function AccountPage(props) {

  


  function login(props) {
    console.log('data: ', props.data)
    let username = document.querySelector('.username')
    let password = document.querySelector('.logPassword')
    console.log('username set as:', username.value)
    console.log('password set as:', password.value)
    axios.post('https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us77.gitpod.io/Users/', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


    return (
        <div className='d-flex p-3 bg-warning text-white asside d-none d-lg-block'>
        <div className='container-fluid bg-light border text-dark'>
        <div className='border pfp bg-secondary rounded-pill'></div>
        <p>you arent signed in!</p>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginBackdrop">
            Log in
        </button>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#registerBackdrop">
        Register
        </button>
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
                            <input type="text" class="form-control username" placeholder="Username" id='username'></input>
                          </div>

                          <div class="input-group">
                            <input type="text" class="form-control logPassword" placeholder="Password" id="logPassword"></input>
                            <span class="input-group-text">🔒</span>
                          </div>
                        </form>
                  </div>
                  
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={login}>Log in</button>
                  
                </div>
              </div>
            </div>
      </div>
      
    )
}