
export default function Home(props){
let posts = props.data
let dudes = props.userList
console.log(posts)
console.log('userlist from home view:', props.userList)
let fart = posts.author_id
console.log('fart', fart)
let god = []
let frog = []


for (let i = 0; i < posts.length; i++) {
    let meme = posts[i].author
    let memer = posts[i]
    let dawg = props.userList.filter(guy =>
    guy.id === meme
    );
    console.log('dawg', dawg)
    frog.splice(0, 0, {name: dawg[0].screen_name, content: posts[i].text_content, pfp: dawg[0].profile_pic})
    //frog.splice(0, 0, content: posts[i].text_content)
    god.push(frog)


    
    
    //god.push(posts[i])
    console.log('god', frog)
    
}
let ooh = "height: 50px;"

let auth = props.userList.filter(brek =>
    brek.id === fart
    );
console.log('auth', auth)
    return (
        <>
        <div className='d-flex p-3 bg-primary text-white flex-fill '> <div className='container'><input class="form-control me-2 rounded" type="text" placeholder="Search"></input>
        <br></br>
        <div className=" bg-warning border border-dark p-3">

        {frog.map(product => (
            <div className=" bg-warning border border-dark p-3">
            <img src={product.pfp}  style={{height: 60, width: 60}} className="pfp rounded-pill border" ></img><h1>{product.name}</h1>
            <h4>{product.content}</h4>
            <button type="button" class="btn btn-primary" >
                Like
            </button>
            </div>
          ))}
          

            </div>
          </div>
          </div>
        
        
        </>
    )

}
