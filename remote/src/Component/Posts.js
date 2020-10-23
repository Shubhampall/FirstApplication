import { AppBar } from 'material-ui'
import { MuiThemeProvider } from 'material-ui/styles'
import React, { useReducer,useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import App from '../App'
var commit=""
const initialstate={
    name:'',
    posts:[],
    Comment:false 
}
const reducer=(state,action)=>{
    switch(action.type){
        case "name":
            return{...state,name:action.payload}
        case "post":
            return{...state,posts:action.payload}
     }
}
function Post() {
    const [state,dispatch]=useReducer(reducer,initialstate)
    const user=localStorage.getItem("Email");
    console.log(user)
    useEffect(()=>{
        console.log(user)
        fetch(`http://localhost:3333/users/${user}`)
        .then((response) => response.json())
        .then((json)=>dispatch({type:"name",payload:json.first_name+ " " +json.last_name}))
        .catch((error)=>alert(`${error}`))
        fetch('http://localhost:3333/posts?userid='+user)
        .then((response) => response.json())
        .then((json)=>dispatch({type:"post",payload:json}))
        .catch((error)=>alert(`${error}`))
    },[])
    const ViewData=()=>{
        return(<React.Fragment>
            {
             state.posts.map(post=><div key={post.id} className="post">
             <h2>{post.id}</h2>
             <h3><span>-:Title:-</span><br/> {post.title}</h3>
             <h3><span>-:Body:-</span><br/> {post.body}</h3>
             <a id={post.id} href={commit="/comment/"+post.id} className="Link" >View the Commit</a>
             </div>)
            }
        </React.Fragment>)
    }
    const Logout=()=>
    {
        localStorage.removeItem("Email")
        window.location.href='/'
    }
    if(user==null){
       return(<Redirect to="/" />)
    }
    else{
    return(
        <div >
       <MuiThemeProvider>
           <React.Fragment>
               <AppBar title={state.name}>
               <Button color="inherit"  style={{color:"white"}} onClick={Logout}>Logout</Button>
               </AppBar>
            {state.posts.length>0  ? <ViewData/>:null}
           </React.Fragment>
       </MuiThemeProvider>
        </div>
    )
}
}
export default Post
