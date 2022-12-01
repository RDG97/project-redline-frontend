import './App.css';
import { useEffect, useState } from 'react';
import Home from './Home';
import AccountPage from './AccountPage';
import LeftDiv from './LeftDiv';

import axios from 'axios';
import { useGlobalState } from './context/GlobalState';
import { GlobalProvider } from './context/GlobalState';
import MakePost from './MakePost';

export default function App(props) {
  const [data, setData] = useState([]);
  const baseURL = `https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us77.gitpod.io/Posts/`

  const [ state, dispatch ] = useGlobalState();

  const [loggedAs, setLoggedAs] = useState([]);

  const [page, setPage] = useState("home")

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const dataObj = response.data
      setData(dataObj);
      console.log('post data set! it looks like', dataObj)
    })
    .catch(function (error){
    console.log('ERROR: ', error)
    })
    ;
  }, []);
const userURL = 'https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us77.gitpod.io/Users/'

  useEffect(() => {
    axios.get(userURL).then((response) => {
      const dataObj = response.data
      setUserList(dataObj);
      console.log('got a user list response! it looks like:', dataObj)
    })
    .catch(function (error){
    console.log('ERROR: ', error)
    })
    ;
  }, []);

  if (state.currentUser != null && state.currentUser != undefined) {
    const getbaseURL = `https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us77.gitpod.io/Users/${state.currentUser.user_id}`
    
  
    useEffect(() => {
  
      axios.get(getbaseURL).then((response) => {
        const dataObj = response.data
        console.log('got a user response! it looks like:', dataObj)
        setLoggedAs(dataObj);

      })
      .catch(function (error){
      console.log('logged account display ERROR: ', error)
      })
      ;
  }, []);}




  function pageChange(text) {
    setPage(text)
  }

async function getSomeDataFromBackend() {
  let options = {
    url: `/Users/?some_model__user_id=${state.currentUser.user_id}`, // just the endpoint
    method: 'GET',
    body:{} // sets the method
  } 
  let resp = await request(options) // await the response and pass in this fancy object of request options
  setSomeState(resp.data) // set the response 
}
  
  console.log('data: ', data)
  
  return (

    <GlobalProvider>
      <div id='App' className='d-flex p-3 bg-secondary text-white'>
        <LeftDiv />
        { page == 'home' && <Home data={data} userList={userList}/>}
        { page == 'makepost' && <MakePost setPage={setPage} loggedAs={loggedAs}/>}
        <AccountPage page={page} setPage={setPage} loggedAs={loggedAs}/>
      </div>
    </GlobalProvider>
  );

}

