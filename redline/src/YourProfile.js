import axios from "axios"
import heart from '/workspace/project-redline-frontend/redline/src/img/heart.png'
export default function YourProfile(props) {
let posts = props.data
let frog = []
let posts2 = posts.filter(brek =>
  brek.author === props.loggedAs.id
  );

function test(props) {
    console.log('hahah poop')
    let pfp = document.getElementById('pfp').value
    let bio = document.getElementById('bio').value
    let sname = document.getElementById('sname').value
    console.log('sname value', sname)
    axios.patch(`https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us78.gitpod.io/Users/${thisGuy[0].id}`, {
        screen_name: sname.value,
        bio: bio.value,
        profile_pic: pfp.value
    })
      .then(function (response) {
        console.log('it straight up shouldve worked')
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}


let thisGuy = props.userList.filter(brek =>
    brek.username === props.profilePage
    );
    console.log('youre on the page of: ', thisGuy)

for (let i = 0; i < posts2.length; i++) {
    let dawg = props.userList.filter(guy =>
    guy.id === thisGuy[0].id
    );
    console.log('dawg', dawg)
    frog.splice(0, 0, {name: dawg[0].screen_name, content: posts2[i].text_content, pfp: dawg[0].profile_pic, username: dawg[0].username})
    //frog.splice(0, 0, content: posts[i].text_content)
        
}
    return(
        <>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form>
      <div class="input-group">
                            <input type="text" class="form-control sname" placeholder="Change screen name?" defaultValue={thisGuy[0].screen_name} id="sname"></input>
                          </div>
                          <br></br>
                          <div class="input-group">
                            <input type="text" class="form-control bio" placeholder="Change bio" defaultValue={thisGuy[0].bio} id="bio"></input>
                          </div>
                          <br></br>
                          <div class="input-group">
                            <input type="text" class="form-control pfp" placeholder="Change Profile Pic (only links supported)" defaultValue={thisGuy[0].profile_pic} id="pfp"></input>
                            
                          </div>
                          <br></br>
                          <div>
                          <input type="checkbox" class="expl" id="expl" name="expl" value="1"></input>
                          <label for="expl">  filter explicit content?</label>
                          </div>
      </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={test}>Save changes</button>
      </div>
    </div>
  </div>
</div>
        <div className='flex-row p-3 greyback text-white flex-fill '>
            <div className="d-flex greyback text-white flex-fill">
                <div className="d-flex">

                <img src={thisGuy[0].profile_pic} style={{height: 100, width: 100}} className="rounded-pill border"></img>
                <div className="row p-3">
                    <h3>{thisGuy[0].screen_name}</h3><h6 className="text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</h6>
                    <h6 className="text-redline">@{thisGuy[0].username}</h6>
                    <p></p>
                    <div class="btn-group-sm" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-outline-danger">0 Followers</button>
                        <button type="button" class="btn btn-outline-danger">0 Following</button>
                        </div>
                    <br></br>
                    <p>{thisGuy[0].bio}</p>
                </div>


                </div>
                
            </div>

        
        <br></br>
        <div className="flex-row greyback border border-dark p-3 ">
                    {frog.map(product => (
                        <div className="greyback border border-dark p-3">
                            <div className="d-flex"> 
                        <img src={product.pfp}  style={{height: 60, width: 60}} className="pfp rounded-pill border"></img>
                        <div className="row"> 
                        <h3>{product.name}</h3>
                        <p className="text-redline" onClick={() => {props.setProfilePage(product.username); props.setPage('profile')}} >@{product.username}</p>
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
    )
}