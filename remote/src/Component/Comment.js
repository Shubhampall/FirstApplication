import React,{useReducer,useEffect}from 'react'
import { useLocation } from 'react-router-dom'
import {Button,Form,FormGroup,Label,Input, Navbar} from 'reactstrap';
import { Redirect } from 'react-router-dom'
import './style.css';
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
    const Back=()=>
    {
        window.location.href='/posts'
    }
    if(user==null){
       return(<Redirect to="/" />)
    }else{
    return (
        <div className="">
             <Navbar bg="primary" variant="dark" >  
             <Button className="btn-lg btn-dark btn--block back" onClick={Back}>Back</Button>
             <h2 className="abc">Comment</h2>
            <Button className="btn-lg btn-dark btn--block position" onClick={Logout}>Logout</Button></Navbar>
             <h1>{state.posts}</h1>
              {state.comments.length>0 ? <ViewData/>:null}
        </div>
    )
    }
}


export default Comments
