import React from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { createBrowserHistory } from "@remix-run/router";
import { max } from "lodash";

export default function CarStats(props) {
  function homeview() {
    props.setPage("home");
  }

  function addCar() {
    console.log("hehe");
    let nickname = document.getElementById("nick").value;
    console.log("nickname value looks like", nickname);
    axios
      .post(
        "https://project-redline-backend.ue.r.appspot.com/Vehicles/",
        {
          owner: props.loggedAs.id,
          nickname: nickname,
          car_year: props.userCar[0].model_year,
          car_make: props.userCar[0].model_make_display,
          car_model: props.userCar[0].model_name,
          car_trim: props.userCar[0].model_trim,
          weight: curWeight,
          powercc: curCC,
          lkm: curLKM,
          powerps: curPS,
          torque: curTorque,
          compression: curComp,
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function home() {
    props.setLeftPage("default");
  }

  function car() {
    console.log(props.userCar);
  }

  let maxCC = 2500;
  let maxWeight = 3135;
  let maxLKM = 19;
  let maxPS = 305;
  let maxTorque = 290;
  let maxComp = 8.2;

  let curCC;
  if (props.userCar[0].model_engine_cc != Number) {
    curCC = 1000;
  } else {
    curCC = props.userCar[0].model_engine_cc;
  }
  let curWeight;
  if (props.userCar[0].model_weight_kg != Number) {
    curWeight = 1000;
  } else {
    curWeight = props.userCar[0].model_weight_kg;
  }
  let curLKM;
  if (props.userCar[0].model_lkm_mixed != Number) {
    curLKM = 8;
  } else {
    curLKM = props.userCar[0].model_lkm_mixed;
  }
  let curPS;
  if (props.userCar[0].model_engine_power_ps != Number) {
    curPS = 203;
  } else {
    curPS = props.userCar[0].model_engine_power_ps;
  }
  let curTorque;
  if (props.userCar[0].model_engine_torque_nm != Number) {
    curTorque = 150;
  } else {
    curTorque = props.userCar[0].model_engine_torque_nm;
  }
  let curComp;
  if (props.userCar[0].model_engine_compression != Number) {
    curComp = 5;
  } else {
    curComp = props.userCar[0].model_engine_compression;
  }
  console.log("CURRENT LKM", curLKM);

  let dispCC = (100 * curCC) / maxCC;
  let dispWeight = (100 * curWeight) / maxWeight;
  let dispLKM = (100 * curLKM) / maxLKM;
  let dispPS = (100 * curPS) / maxPS;
  let dispTorque = (100 * curTorque) / maxTorque;
  let dispComp = (100 * curComp) / maxComp;

  console.log("CAR USESTATE CAR USESTATE", props.car);
  console.log(
    "Weight",
    dispWeight,
    "power (CC)",
    dispCC,
    "MPG",
    dispLKM,
    "power (PS)",
    dispPS,
    "torque",
    dispTorque,
    "compression",
    dispComp
  );
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  const data = {
    labels: [
      "Weight",
      "power (CC)",
      "MPG",
      "power (PS)",
      "torque",
      "compression",
    ],
    datasets: [
      {
        label: "Car Stats",
        data: [dispWeight, dispCC, dispLKM, dispPS, dispTorque, dispComp],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="d-flex p-3 greyback text-white asside d-none d-lg-block text-center">
      <h3 className="text-light">
        {props.userCar[0].make_display} {props.userCar[0].model_name}
      </h3>
      <h6 className="text-light">{props.userCar[0].model_trim}</h6>
      <div className="d-flex bg-light rounded">
        <Radar data={data} />
      </div>

      <button type="button" class="btn btn-primary" onClick={home}>
        Home
      </button>
      <form>
        <div class="input-group">
          <button type="button" class="btn btn-primary" onClick={addCar}>
            Add this car
          </button>
        </div>
        <div class="input-group">
          <input
            type="input"
            class="form-control pass2"
            placeholder="enter nickname"
            id="nick"
          ></input>
        </div>
      </form>
    </div>
  );
}
