import { useState, useEffect } from "react";
import _ from "lodash";

export default function NextCar(props) {
  function homeview() {
    props.setPage("home");
  }
let dog
  function car() {
    props.setLeftPage("car");
  }

function carsetter() {
  
  
  console.log(dog)
  let frog = props.car.Trims
  //props.setCar(dog)
  //checkCar()
  let carfilt = frog.filter(car =>
    car.model_id === dog
    );
    console.log('AFTER CAR FILTER', carfilt)
    props.setUserCar(carfilt)
    props.setLeftPage('carstats')
}

  

  function test() {
    console.log('HOPEFULLY THE TRIM')
  }


  let cars = props.car;

  const carRows = _.map(Object.values(cars), (product, id) => {
    console.log(product)
    return product.map(item => {
        const trims = item.model_trim
        const model = item.model_id
        function meme() {
          console.log('TESTERSSSS', item)
          dog = item.model_id
          return dog
        }

        console.log('TRIMS', trims)
        return <button key={id} id={model} className="btn-primary " data-bs-toggle="button" autocomplete="off" onClick={meme}>{trims}</button>
        
    })
  });
  console.log(carRows);

  return (
    <div className="d-flex p-3 greyback text-white asside d-none d-lg-block">
      <button type="button" class="btn btn-primary" onClick={homeview}>
        (HERE 4 DEBUG) home view
      </button>
      <br></br>
      <button type="button" class="btn btn-primary" onClick={car}>
        LOOK AT CAR
      </button>

    <br></br>
      {carRows}
      <button type="button" class="btn btn-primary" onClick={carsetter}>
        set car prop
      </button>

      
    </div>
  );
}
