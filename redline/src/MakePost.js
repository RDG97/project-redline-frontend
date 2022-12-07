
import axios from "axios"
export default function MakePost(props) {
    function postApost() {
        console.log('posting...')
        let content = document.querySelector('.post').value
        let author = props.loggedAs.id
        let expl = document.getElementById('expl')

        if (expl.checked === true) {
          console.log('explicit content off!')
          expl = 1
        } else {
          console.log('explicit content left on!')
          expl = 0
        } 
        axios.post('https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us77.gitpod.io/Posts/', {
        author: author,
        text_content: content,
        explicit: expl
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          props.setPage('home')
          window.location.reload()
        }

    return (
        <div className='d-flex p-3 greyback text-white flex-fill text-center'>
            <center>
            <h3>Hello, {props.loggedAs.screen_name}! Lets post something.</h3>
            <form>
                <div class="input-group text-center">
                            <input type="text" class="form-control post" placeholder="Whats on your mind?" id="post"></input>
                          </div>
                          <br></br>
                          <div>
                          <input type="checkbox" class="expl" id="expl" name="expl" value="1"></input>
                          <label for="expl">Does this contain explicit content?</label>
                          </div>
      </form>
      <button type="button" class="btn btn-primary" onClick={postApost} >
                Send it!
            </button>
        </center>
        </div>
    )
}