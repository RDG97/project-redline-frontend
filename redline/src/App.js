import './App.css';
import Home from './Home';
import AccountPage from './AccountPage';
import LeftDiv from './LeftDiv';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalState } from './context/GlobalState';
import { GlobalProvider } from './context/GlobalState';

function App() {
  const [data, setData] = useState([]);
  const baseURL = "https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us77.gitpod.io/Users/"

  const [ state, dispatch ] = useGlobalState();
  

//  useEffect(() => {
//    axios.get(baseURL).then((response) => {
//      const dataObj = response.data
//      setData(dataObj);
//    })
//    .catch(function (error){
//    console.log('ERROR: ', error)
//    })
//    ;
//  }, []);

async function getSomeDataFromBackend() {
  let options = {
    url: `/Users/?some_model__user_id=${state.currentUser.user_id}`, // just the endpoint
    method: 'GET', // sets the method
  } 
  let resp = await request(options) // await the response and pass in this fancy object of request options
  setSomeState(resp.data) // set the response 
}




  console.log(data)
  console.log('current user', state.currentUser)
  return (
    <GlobalProvider>
    <div id='App' className='d-flex p-3 bg-secondary text-white'>
      <LeftDiv />
      <Home />
      <AccountPage data={data}/>
    </div>
    </GlobalProvider>
  );
}

export default App;
