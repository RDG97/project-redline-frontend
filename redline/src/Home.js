import axios from "axios";
import { useEffect, useState } from "react";





export default function Home(props){
if (props.userList.length === 0) return <div className="loading fw-bold text-warning fs-3">Loading please be patient... we are trying our best</div>;
let posts = props.data
let dudes = props.userList
let liker = props.Likes
let fart = posts.author_id
let frog = []






function goProfile(test) {
    props.setPage('profile')
    console.log('test:', test)
}
function likePost(postId) {
    console.log('postID: ', postId)
    axios.post('https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us77.gitpod.io/PostLikes/', {
    liker: props.loggedAs.id,
    post: postId
    })
}

for (let i = 0; i < posts.length; i++) {
    let meme = posts[i].author
    let dawg = props.userList.filter(guy =>
    guy.id === meme
    );

    let liking = liker.filter(brek =>
        brek.post === posts[i].id
        );
    
    console.log('dawg', dawg)
    frog.splice(0, 0, {id: posts[i].id, name: dawg[0].screen_name, content: posts[i].text_content, pfp: dawg[0].profile_pic, username: dawg[0].username, likes: liking.length})
    //frog.splice(0, 0, content: posts[i].text_content) 
}


let auth = props.userList.filter(brek =>
    brek.id === fart
    );

    return (
        <>
        <div className='d-flex p-3 bg-primary text-white flex-fill '> <div className='container'><input class="form-control me-2 rounded" type="text" placeholder="Search"></input>
        <br></br>
        <div className=" bg-warning border border-dark p-3">

        {frog.map(product => (
            <div className=" bg-warning border border-dark p-3">
                <div className="d-flex"> 
            <img src={product.pfp}  style={{height: 60, width: 60}} className="pfp rounded-pill border"></img>
            <div className="row"> 
            <h3>{product.name}</h3>
            <p className="text-primary" onClick={() => {props.setProfilePage(product.username); props.setPage('profile')}} >@{product.username}</p>
            </div>
            </div>
            <h6>{product.content}</h6>
            <button type="button" class="btn btn-primary" onClick={() => {likePost(product.id); props.setProfilePage(product.username)}}>
                {product.likes} Likes
            </button>
            </div>
          ))}
          

            </div>
          </div>
          </div>
        
        
        </>
    )

}
