import { useEffect, useState } from "react"
import axios from "axios"
import React from "react"


export default function CarView(props) {
    function homeview() {
        props.setPage('home')
    }
    function ifcar() {
      console.log('IF CAR????', props.car)
    }

    function searchCar() {
    let year = document.getElementById('year').value
    let make = document.getElementById('make').value
    let model = document.getElementById('model').value
    let us = document.getElementById('us').checked
    console.log(`year: ${year} make: ${make} model: ${model} us: ${us}`);

    let carURL = `https://project-redline-backend.ue.r.appspot.com/cars/?make=${make}&model=${model}&year=${year}`

    //let carURL = "https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us77.gitpod.io/cars/?make=ford&model=mustang&year=2016"

    
      axios.get(carURL).then((response) => {
        let cars = JSON.parse(response.data);
        console.log(response)
        console.log('CAR CAR CRA CAR CAR CAR ', cars)

        props.setCar(cars)
        console.log('setcar check it', props.car)
      })
      .catch(function (error){
       console.log(error)
      })
      
      
      console.log('setcar check it', props.car)
      props.setLeftPage('nextcar')
    }
    
    return(

        <div className='d-flex p-3 greyback text-white asside d-none d-lg-block'>
      {props.car.length > 0 &&
        <h2>
          You have unread messages.
        </h2>
      }
            <form>
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Year</label>

    <div class="col-sm-10"><br></br>
      <input type="text" class="form-control" id="year" placeholder="year"></input>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Make</label>
    <div class="col-sm-10"><br></br>
      <input type="text" class="form-control" id="make" placeholder="make"></input>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Model</label>
    <div class="col-sm-10"><br></br>
      <input type="text" class="form-control" id="model" placeholder="model"></input>
    </div>
  </div>
  <div class="form-group row">
    <div class="col-sm-2"></div>
    <div class="col-sm-10">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="us"></input>
        <label class="form-check-label" for="gridCheck1">
          U.S. only?
        </label>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-10">
      <button type="button" class="btn btn-primary" onClick={searchCar}>Search Cars</button>
      
    </div>
    
  </div>
</form>


        </div>
    )
}