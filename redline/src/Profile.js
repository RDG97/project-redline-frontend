import axios from "axios";
import { useEffect, useState } from "react";


export default function Profile(props) {
let posts = props.data
let frog = []
let followers = []
const [proFollow, setProFollow] = useState([]);
const [proFollowing, setProFollowing] = useState([]);



let thisGuy = props.userList.filter(brek =>
    brek.username === props.profilePage
    );
    console.log('youre on the page of: ', thisGuy)

    let posts2 = posts.filter(brek =>
        brek.author === thisGuy[0].id
        );
        console.log('YOUR POSTS LOOK NOW: ', posts2)

for (let i = 0; i < posts2.length; i++) {
    let dawg = props.userList.filter(guy =>
    guy.id === thisGuy[0].id
    );
    
    frog.splice(0, 0, {name: dawg[0].screen_name, content: posts2[i].text_content, pfp: dawg[0].profile_pic, username: dawg[0].username})
    //frog.splice(0, 0, content: posts[i].text_content)
        
}

function followw() {
    axios.post('https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us78.gitpod.io/Following/', {
        follower: props.loggedAs.id,
        followed: thisGuy[0].id
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }

let baseURL = `https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us78.gitpod.io/Following/`

        useEffect(() => {
            axios.get(baseURL).then((response) => {
              const dataObj = response.data
              let followList = dataObj;
              console.log('follow list set! it looks like', followList)


            let followers = followList.filter(brek =>
                brek.followed === thisGuy[0].id
                );
                console.log('followers after filter', followers)
                setProFollow(followers)
            
            let followingg = followList.filter(brek =>
                brek.follower === thisGuy[0].id
                );
                console.log('following after filter', followingg)
                setProFollowing(followingg)



            })
            .catch(function (error){
            console.log('ERROR: ', error)
            })
            ;
          }, []);



    return(
        <>
        <div className='flex-row p-3 greyback text-white flex-fill '>
            <div className="d-flex greyback text-white flex-fill">
                <div className="d-flex">

                <img src={thisGuy[0].profile_pic} style={{height: 100, width: 100}} className="rounded-pill border"></img>
                <div className="row p-3">
                    <h3>{thisGuy[0].screen_name}</h3>
                    <h6>@{thisGuy[0].username}</h6>
                    <div class="btn-group-sm" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-primary"> {proFollow.length} Followers</button>
                        <button type="button" class="btn btn-outline bg-light" onClick={followw} >Follow</button>
                        <button type="button" class="btn btn-outline-primary">{proFollowing.length} Following</button>
                        </div>
                    <br></br>
                    <p>{thisGuy[0].bio}</p>
                </div>


                </div>
                
            </div>

        
        <br></br>
        <div className="flex-row greyback border border-dark p-3 ">
                    {frog.map(product => (
                        <div className=" greyback border border-dark p-3">
                            <div className="d-flex"> 
                        <img src={product.pfp}  style={{height: 60, width: 60}} className="pfp rounded-pill border"></img>
                        <div className="row"> 
                        <h3>{product.name}</h3>
                        <p className="text-primary" onClick={() => {props.setProfilePage(product.username); props.setPage('profile')}} >@{product.username}</p>
                        </div>
                        </div>
                        <h6>{product.content}</h6>
                        <button type="button" class="btn btn-primary">
                            Like
                        </button>
                        </div>
                      ))}
                      </div>
                      </div>
                      </>
    )
}