import axios from "axios";
import { useEffect, useState, state } from "react";
import { GlobalProvider } from './context/GlobalState';
import jwtDecode from "jwt-decode";
import React from "react";
import { Ref } from "react";

import { Link } from "react-router-dom";
import { useGlobalState } from "./context/GlobalState";
import authService from "./services/auth.service";
import App from "./App";






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

    //like filter where filters likes with this user and and this poster id. if the length is 0 send post request
    let postlikes = liker.filter(guy =>
        guy.liker === props.loggedAs.id && guy.post === postId
    );
    console.log('logged as id: ', props.loggedAs.id)
    console.log('post likes looks like: ', postlikes)
    if (postlikes.length === 0) {
    console.log('postID: ', postId)
    axios.post('https://8000-rdg97-projectredlineba-3mx4fceg9hi.ws-us78.gitpod.io/PostLikes/', {
    liker: props.loggedAs.id,
    post: postId
    })
    const btn = document.querySelector('.btn-primary like');
    btn.disabled = true;
} else {
    alert("youve already liked this post!!!");
}
}
let logger
if (props.state.currentUser === null && props.state.currentUser === undefined || props.showAll === 'show following') {
    console.log('running as tho no follower or not logged')
for (let i = 0; i < posts.length; i++) {
    let meme = posts[i].author
    let dawg = props.userList.filter(guy =>
    guy.id === meme
    );

    let liking = liker.filter(brek =>
        brek.post === posts[i].id
        );
    
    
    frog.splice(0, 0, {id: posts[i].id, name: dawg[0].screen_name, content: posts[i].text_content, pfp: dawg[0].profile_pic, username: dawg[0].username, likes: liking.length})
    //frog.splice(0, 0, content: posts[i].text_content) 
    }
} else {


    let loggedposts= []
    console.log('FOLLWING', props.following)
    let loggedFollows = props.following.filter(guy =>
        guy.follower === props.loggedAs.id)
        console.log('loggedfollows: ', loggedFollows)
        for (let i = 0; i < loggedFollows.length; i++){
            console.log('loggedfollows IN FOR LOOP: ', loggedFollows)
        logger = props.data.filter(guy =>
            guy.author === loggedFollows[i].followed)
            console.log('logger', logger)
        loggedposts.splice(0, 0, {id: logger[0].id, content: logger[0].text_content, author: logger[0].author})
        
        }

    for (let i = 0; i < loggedposts.length; i++) {
        let meme = loggedposts[i].author
        let dawg = props.userList.filter(guy =>
        guy.id === meme
    );
    let liking = liker.filter(brek =>
        brek.post === posts[i].id
        );
    
    
    frog.splice(0, 0, {id: loggedposts[i].id, name: dawg[0].screen_name, content: loggedposts[i].content, pfp: dawg[0].profile_pic, username: dawg[0].username, likes: liking.length})
    }
    
}



function showem() {
    if (props.showAll === 'show following') {
    props.setShowAll('show all')
    } else {
        props.setShowAll('show following')
    }
}

let auth = props.userList.filter(brek =>
    brek.id === fart
    );

    return (
        <>
        <div className='d-flex p-3 home greyback text-white flex-fill '> <div className='container'><input class="form-control me-2 rounded" type="text" placeholder="Search"></input>

        <button type="button" class="btn btn-primary" id="showAll" onClick={showem}>{props.showAll}</button>

        <br></br>
        <div className="greyback border border-dark p-3">

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
            <button type="button" class="btn btn-primary like" onClick={() => {likePost(product.id); props.setProfilePage(product.username)}}>
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
