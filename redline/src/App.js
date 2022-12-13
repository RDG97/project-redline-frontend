import "./App.css";
import { useEffect, useState } from "react";
import Home from "./Home";
import AccountPage from "./AccountPage";
import LeftDiv from "./LeftDiv";
import Profile from "./Profile";
import axios from "axios";
import { useGlobalState } from "./context/GlobalState";
import { GlobalProvider } from "./context/GlobalState";
import MakePost from "./MakePost";
import YourProfile from "./YourProfile";
import CarView from "./Carview";
import NextCar from "./NextCar";
import CarStats from "./CarStats";
import request from "./services/api.request";


export default function App(props) {
  const [data, setData] = useState([]);
  //const baseURL = `https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us78.gitpod.io/Posts/`;
  const baseURL = `https://project-redline-backend.ue.r.appspot.com/Posts/`

  const [profilePage, setProfilePage] = useState([]);

  const [state, dispatch] = useGlobalState();

  const [loggedAs, setLoggedAs] = useState([]);

  const [page, setPage] = useState("home");

  const [leftPage, setLeftPage] = useState("default");

  const [userList, setUserList] = useState([]);

  const [Likes, setLikes] = useState([]);

  const [following, setFollowing] = useState([]);

  const [test, setTest] = useState([]);

  const [showAll, setShowAll] = useState("show following");

  const [followers2, setFollowers2] = useState([]);

  const [following2, setFollowing2] = useState([]);

  const [car, setCar] = useState([]);

  const [userCar, setUserCar] = useState([]);

  const [carList, setCarList] = useState([]);

  //https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&make=ford&model=fiesta&year=2014 example API call

  useEffect(() => {
    axios
      .get(
        `https://project-redline-backend.ue.r.appspot.com/Following/`
      )
      .then((response) => {
        const dataObj = response.data;
        let followList = dataObj;
        console.log("follow list set! it looks like", followList);

        let followerss = followList.filter(
          (brek) => brek.followed === props.loggedAs.id
        );
        console.log("followers after filter", followerss);
        setFollowers2(followerss);

        let followingg = followList.filter(
          (brek) => brek.follower === props.loggedAs.id
        );
        console.log("following after filter", followingg);
        setFollowing2(followingg);
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        const dataObj = response.data;
        setData(dataObj);
        console.log("post data set! it looks like", dataObj);
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://project-redline-backend.ue.r.appspot.com/Vehicles/"
      )
      .then((response) => {
        const dataObj = response.data;
        setCarList(dataObj);
        console.log("CAR LIST set! it looks like", dataObj);
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  }, []);

  const userURL =
    "https://project-redline-backend.ue.r.appspot.com/Users/";

  useEffect(() => {
    axios
      .get(userURL)
      .then((response) => {
        const dataObj = response.data;
        setUserList(dataObj);
        console.log("got a user list response! it looks like:", dataObj);
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://project-redline-backend.ue.r.appspot.com/PostLikes/"
      )
      .then((response) => {
        const dataObj = response.data;
        setLikes(dataObj);
        console.log("got a likes response! it looks like:", dataObj);
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  }, [props, state]);
  console.log("LOGGEDAS LOGGEDAS", loggedAs);
  let followList;
  useEffect(() => {
    axios
      .get(
        "https://project-redline-backend.ue.r.appspot.com/Following/"
      )
      .then((response) => {
        const dataObj = response.data;
        setFollowing(dataObj);
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  }, [props, state]);

  let loggedFollows = following.filter((guy) => guy.follower === loggedAs.id);
  console.log("logged followers", loggedFollows);
let getbaseURL

  if (state.currentUser != null && state.currentUser != undefined) {
    getbaseURL = `https://project-redline-backend.ue.r.appspot.com/Users/${state.currentUser.user_id}`;
  }
    useEffect(() => {
      axios
        .get(getbaseURL)
        .then((response) => {
          const dataObj = response.data;
          console.log("got a user response! it looks like:", dataObj);
          setLoggedAs(dataObj);
        })
        .catch(function (error) {
          console.log("logged account display ERROR: ", error);
        });
    }, []);
  

  console.log("logged as: ", loggedAs);

  function pageChange(text) {
    setPage(text);
  }

  async function getSomeDataFromBackend() {
    let options = {
      url: `/Users/?some_model__user_id=${state.currentUser.user_id}`, // just the endpoint
      method: "GET",
      body: {}, // sets the method
    };
    let resp = await request(options); // await the response and pass in this fancy object of request options
     // set the response
  }

  console.log("data: ", data);



  return (
    <GlobalProvider>
      <div id="App" className="d-flex p-3 bg-secondary text-white">
        {leftPage == "default" && (
          <LeftDiv
            data={data}
            leftPage={leftPage}
            setLeftPage={setLeftPage}
            userList={userList}
            page={page}
            setPage={setPage}
            loggedAs={loggedAs}
            profilePage={profilePage}
            setProfilePage={setProfilePage}
            likes={Likes}
            setLikes={setLikes}
          />
        )}
        {leftPage == "nextcar" && (
          <NextCar
            userCar={userCar}
            setUserCar={setUserCar}
            data={data}
            car={car}
            setCar={setCar}
            leftPage={leftPage}
            setLeftPage={setLeftPage}
            userList={userList}
            page={page}
            setPage={setPage}
            loggedAs={loggedAs}
            profilePage={profilePage}
            setProfilePage={setProfilePage}
            likes={Likes}
            setLikes={setLikes}
          />
        )}
        {leftPage == "carstats" && (
          <CarStats
            userCar={userCar}
            setUserCar={setUserCar}
            data={data}
            car={car}
            setCar={setCar}
            leftPage={leftPage}
            setLeftPage={setLeftPage}
            userList={userList}
            page={page}
            setPage={setPage}
            loggedAs={loggedAs}
            profilePage={profilePage}
            setProfilePage={setProfilePage}
            likes={Likes}
            setLikes={setLikes}
          />
        )}
        {leftPage == "car" && (
          <CarView
            data={data}
            car={car}
            setCar={setCar}
            leftPage={leftPage}
            setLeftPage={setLeftPage}
            userList={userList}
            page={page}
            setPage={setPage}
            loggedAs={loggedAs}
            profilePage={profilePage}
            setProfilePage={setProfilePage}
            likes={Likes}
            setLikes={setLikes}
          />
        )}
        {page == "home" && (
          <Home
            showAll={showAll}
            setShowAll={setShowAll}
            following={following}
            test={test}
            setTest={setTest}
            state={state}
            data={data}
            userList={userList}
            page={page}
            setPage={setPage}
            loggedAs={loggedAs}
            profilePage={profilePage}
            setProfilePage={setProfilePage}
            Likes={Likes}
            setLikes={setLikes}
          />
        )}
        {page == "makepost" && (
          <MakePost
            setPage={setPage}
            loggedAs={loggedAs}
            likes={Likes}
            setLikes={setLikes}
          />
        )}
        {page == "profile" && (
          <Profile
            carList={carList}
            setCarList={setCarList}
            data={data}
            userList={userList}
            page={page}
            setPage={setPage}
            loggedAs={loggedAs}
            profilePage={profilePage}
            setProfilePage={setProfilePage}
            likes={Likes}
            setLikes={setLikes}
          />
        )}
        {page == "yourprofile" && (
          <YourProfile
            data={data}
            following={following}
            setFollowing={setFollowing}
            userList={userList}
            page={page}
            setPage={setPage}
            loggedAs={loggedAs}
            profilePage={profilePage}
            setProfilePage={setProfilePage}
            likes={Likes}
            setLikes={setLikes}
          />
        )}

        <AccountPage
          data={data}
          userList={userList}
          page={page}
          setPage={setPage}
          following2={following2}
          followers2={followers2}
          setFollowing2={setFollowing2}
          setFollowers2={setFollowers2}
          loggedAs={loggedAs}
          profilePage={profilePage}
          setProfilePage={setProfilePage}
          likes={Likes}
          setLikes={setLikes}
        />
      </div>
    </GlobalProvider>
  );
}
