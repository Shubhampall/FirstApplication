import React,{useReducer,useEffect}from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string';
import { MuiThemeProvider } from 'material-ui/styles';
import { AppBar} from 'material-ui';
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'
const initialstate={
    posts:'',
    comments:[],
}
const reducer=(state,action)=>{
    switch(action.type){
        case "post":
            return{...state,posts:action.payload}
        case "comment":
            return{...state,comments:action.payload}
     }
}

function Comments() {
    const [state,dispatch]=useReducer(reducer,initialstate)
    const user=localStorage.getItem("Email");
    const location=useLocation()
    let postid=(location.pathname.match(/(\d+)/)[0]).toString()
useEffect(()=>{
    fetch(`http://localhost:3333/posts/${postid}`)
    .then((response) => response.json())
    .then((json)=>dispatch({type:"post",payload:json.title}))
    .catch((error)=>alert(`${error}`))
    fetch(`http://localhost:3333/comments?postId=${postid}`)
    .then((response) => response.json())
    .then((json)=>dispatch({type:"comment",payload:json}))
    .catch((error)=>alert(`${error}`))
},[])

const ViewData=()=>{
    return(<React.Fragment>
        {
         state.comments.map((post,count)=><div key={post.id} className="post">
         <h3><span>Comment:-</span>{count+1}   {post.body}</h3>        
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
    }else{
    return (
        <div>
            <MuiThemeProvider >
           <React.Fragment>
               <AppBar title="Comment Section" position="static">
               <Button color="inherit" style={{color:"white"}} onClick={Logout}>Logout</Button></AppBar>
               <h1>{state.posts}</h1>
              {state.comments.length>0 ? <ViewData/>:null}
           </React.Fragment>
           </MuiThemeProvider>
        </div>
    )
    }
}


export default Comments
