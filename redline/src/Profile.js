import axios from "axios";
import { useEffect, useState } from "react";
import heart from "/workspace/project-redline-frontend/redline/src/img/heart.png";
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

export default function Profile(props) {
  let posts = props.data;
  let frog = [];
  let followers = [];
  const [proFollow, setProFollow] = useState([]);
  const [proFollowing, setProFollowing] = useState([]);

  let thisGuy = props.userList.filter(
    (brek) => brek.username === props.profilePage
  );
  console.log("youre on the page of: ", thisGuy);

  let posts2 = posts.filter((brek) => brek.author === thisGuy[0].id);
  console.log("YOUR POSTS LOOK NOW: ", posts2);

  for (let i = 0; i < posts2.length; i++) {
    let dawg = props.userList.filter((guy) => guy.id === thisGuy[0].id);

    frog.splice(0, 0, {
      name: dawg[0].screen_name,
      content: posts2[i].text_content,
      pfp: dawg[0].profile_pic,
      username: dawg[0].username,
    });
    //frog.splice(0, 0, content: posts[i].text_content)
  }

  let thisCar = props.carList.filter((guy) => guy.owner === thisGuy[0].id);
  console.log("THIS GUYS CAR. HELP PLEASE", thisCar);

  function followw() {

    axios
      .post(
        "https://project-redline-backend.ue.r.appspot.com/Following/",
        {
          follower: props.loggedAs.id,
          followed: thisGuy[0].id,
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  let baseURL = `https://project-redline-backend.ue.r.appspot.com/Following/`;

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        const dataObj = response.data;
        let followList = dataObj;
        console.log("follow list set! it looks like", followList);

        let followers = followList.filter(
          (brek) => brek.followed === thisGuy[0].id
        );
        console.log("followers after filter", followers);
        setProFollow(followers);

        let followingg = followList.filter(
          (brek) => brek.follower === thisGuy[0].id
        );
        console.log("following after filter", followingg);
        setProFollowing(followingg);
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  }, []);

  let maxCC = 2500;
  let maxWeight = 3135;
  let maxLKM = 19;
  let maxPS = 305;
  let maxTorque = 290;
  let maxComp = 8.2;

  let stats;
  if (thisCar.length > 0) {
    let dispCC = (100 * thisCar[0].powercc) / maxCC;
    let dispWeight = (100 * thisCar[0].weight) / maxWeight;
    let dispLKM = (100 * thisCar[0].lkm) / maxLKM;
    let dispPS = (100 * thisCar[0].powerps) / maxPS;
    let dispTorque = (100 * thisCar[0].torque) / maxTorque;
    let dispComp = (100 * thisCar[0].compression) / maxComp;

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
    stats = (
      <div className="row bg-light rounded">
        <div className="d-flex text-light stats">
          <div className="row text-center">
            <h1 className="text-dark">
              {thisCar[0].car_make} {thisCar[0].car_model}{" "}
            </h1>
            <h4 className="text-dark">{thisCar[0].car_trim}</h4>
            <h4 className="text-dark">"{thisCar[0].nickname}"</h4>
          </div>
          <Radar className="text-light" data={data} />
        </div>
      </div>
    );
  } else {
    stats = <h1>prefers to walk. (no cars saved)</h1>;
  }

  return (
    <>
      <div className="flex-row p-3 greyback text-white flex-fill ">
        <div className="d-flex greyback text-white flex-fill">
          <div className="d-flex">
            <img
              src={thisGuy[0].profile_pic}
              style={{ height: 100, width: 100 }}
              className="rounded-pill border"
            ></img>
            <div className="row p-3">
              <h3>{thisGuy[0].screen_name}</h3>
              <h6>@{thisGuy[0].username}</h6>
              <div
                class="btn-group-sm"
                role="group"
                aria-label="Basic outlined example"
              >
                <button type="button" class="btn btn-outline-danger">
                  {" "}
                  {proFollow.length} Followers
                </button>
                <button
                  type="button"
                  class="btn btn-outline bg-light"
                  onClick={followw}
                >
                  Follow
                </button>
                <button type="button" class="btn btn-outline-danger">
                  {proFollowing.length} Following
                </button>
              </div>
              <br></br>
              <p>{thisGuy[0].bio}</p>
              {stats}
            </div>
          </div>
        </div>

        <br></br>
        <div className="flex-row greyback border border-dark p-3 ">
          {frog.map((product) => (
            <div className=" greyback border border-dark p-3">
              <div className="d-flex">
                <img
                  src={product.pfp}
                  style={{ height: 60, width: 60 }}
                  className="pfp rounded-pill border"
                ></img>
                <div className="row">
                  <h3>{product.name}</h3>
                  <p
                    className="text-redline"
                    onClick={() => {
                      props.setProfilePage(product.username);
                      props.setPage("profile");
                    }}
                  >
                    @{product.username}
                  </p>
                </div>
              </div>
              <h6>{product.content}</h6>
              <button type="button" class="btn btn-primary">
                <img src={heart} classname="likes"></img>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
