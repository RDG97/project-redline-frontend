import './App.css';
import { useEffect, useState } from 'react';
import Home from './Home';
import AccountPage from './AccountPage';
import LeftDiv from './LeftDiv';
import Profile from './Profile';
import axios from 'axios';
import { useGlobalState } from './context/GlobalState';
import { GlobalProvider } from './context/GlobalState';
import MakePost from './MakePost';
import YourProfile from './YourProfile';

export default function App(props) {
  const [data, setData] = useState([]);
  const baseURL = `https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us77.gitpod.io/Posts/`

  const [profilePage, setProfilePage] = useState([]); 

  const [ state, dispatch ] = useGlobalState();

  const [loggedAs, setLoggedAs] = useState([]);

  const [page, setPage] = useState("home")

  const [userList, setUserList] = useState([]);

  const [Likes, setLikes] = useState([]);
  const [test, setTest] = useState([]);

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

  useEffect(() => {
    axios.get('https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us77.gitpod.io/PostLikes/').then((response) => {
      const dataObj = response.data
      setLikes(dataObj);
      console.log('got a likes response! it looks like:', dataObj)
    })
    .catch(function (error){
    console.log('ERROR: ', error)
    })
    ;
  }, [props, state]);

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

console.log('logged as: ', loggedAs)


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
  if (data.length === 0) return <div className="loading fw-bold text-warning fs-3">Loading please be patient... we are trying our best</div>;
  return (
    <GlobalProvider>
      <div id='App' className='d-flex p-3 bg-secondary text-white'>
        <LeftDiv data={data} userList={userList} page={page} setPage={setPage} loggedAs={loggedAs} profilePage={profilePage} setProfilePage={setProfilePage} likes={Likes} setLikes={setLikes}/>
        { page == 'home' && <Home test={test} setTest={setTest} data={data} userList={userList} page={page} setPage={setPage} loggedAs={loggedAs} profilePage={profilePage} setProfilePage={setProfilePage} Likes={Likes} setLikes={setLikes}/>}
        { page == 'makepost' && <MakePost setPage={setPage} loggedAs={loggedAs} likes={Likes} setLikes={setLikes}/>}
        {page == 'profile' && <Profile data={data} userList={userList} page={page} setPage={setPage} loggedAs={loggedAs} profilePage={profilePage} setProfilePage={setProfilePage} likes={Likes} setLikes={setLikes}/>}
        {page == 'yourprofile' && <YourProfile data={data} userList={userList} page={page} setPage={setPage} loggedAs={loggedAs} profilePage={profilePage} setProfilePage={setProfilePage} likes={Likes} setLikes={setLikes}/>}
        <AccountPage pdata={data} userList={userList} page={page} setPage={setPage} loggedAs={loggedAs} profilePage={profilePage} setProfilePage={setProfilePage} likes={Likes} setLikes={setLikes}/>
      </div>
    </GlobalProvider>
  );

}

