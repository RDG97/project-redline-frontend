import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { createBrowserHistory } from '@remix-run/router';
import { max } from 'lodash';

export default function CarStats(props) {
    function homeview() {
        props.setPage('home')
    }

    function car() {
        console.log(props.userCar)
    }

    let maxCC = 2500  
    let maxWeight = 3135
    let maxLKM = 19
    let maxPS = 305
    let maxTorque = 290
    let maxComp = 8.2

    let curCC = props.userCar[0].model_engine_cc
    let curWeight = props.userCar[0].model_weight_kg
    let curLKM = props.userCar[0].model_lkm_mixed
    let curPS = props.userCar[0].model_engine_power_ps
    let curTorque = props.userCar[0].model_engine_torque_nm
    let curComp = props.userCar[0].model_engine_compression

    let dispCC = ((maxCC - curCC) / 100)
    let dispWeight = ((maxWeight - curWeight) / 100)
    let dispLKM = ((maxLKM - curLKM) / 100)
    let dispPS = ((maxPS - curPS) / 100)
    let dispTorque = ((maxTorque - curTorque) / 100)
    let dispComp = ((maxComp - curComp) / 100)


    console.log('USERCAR FROM STATS', props.userCar)
    console.log('DISP CC OH GOD PLEASE WORK', dispCC)
    console.log('Weight', dispWeight, 'power (CC)', dispCC, 'MPG', dispLKM, 'power (PS)', dispPS, 'torque', dispTorque, 'compression', dispComp)
    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend
      );
      
     const data = {
        labels: ['Weight', 'power (CC)', 'MPG', 'power (PS)', 'torque', 'compression'],
        datasets: [
          {
            label: 'Car Stats',
            data: [dispWeight, dispCC, dispLKM, dispPS, dispTorque, dispComp],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
    };

    return(
        <div className='d-flex p-3 greyback text-white asside d-none d-lg-block text-center'>
            <h3 className="text-light">{props.userCar[0].make_display} {props.userCar[0].model_name}</h3>
            <h6 className="text-light">{props.userCar[0].model_trim}</h6>
            <div className='d-flex bg-light rounded'>
            <Radar data={data} />
            </div>
        </div>
    )
}