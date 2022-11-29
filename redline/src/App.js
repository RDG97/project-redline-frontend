import './App.css';
import Home from './Home';
import AccountPage from './AccountPage';
import LeftDiv from './LeftDiv';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const baseURL = "https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us77.gitpod.io/Users/"

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const dataObj = response.data
      setData(dataObj);
    })
    .catch(function (error){
    console.log('ERROR: ', error)
    })
    ;
  }, []);
  console.log(data)
  return (
    <div id='App' className='d-flex p-3 bg-secondary text-white'>
      <LeftDiv />
      <Home />
      <AccountPage data={data}/>
    </div>
  );
}

export default App;
