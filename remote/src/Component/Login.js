import React,{useReducer} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Base64 } from 'js-base64';
import { Link, Redirect } from 'react-router-dom';
const initialstate={
    Email :"",
    Password:"",
    loggedin:false,
}
const reducer=(state,action)=>{
    switch(action.type){
        case "Email":
            return{...state,Email:action.value}
        case "Password":
            return{...state,Password:action.value}
        case "Login":
            return{...state,loggedin:action.payload}
            }
   }

function Login() {
    const [state,dispatch]=useReducer(reducer,initialstate)
    const styles={
        button :{
            margin :15
        }}
    const submit=(e)=>{
        e.preventDefault();
       const a= Base64.encode(state.Password)
    fetch(`http://localhost:3333/users?email=${state.Email}&password=${a}`)
    .then((response) => response.json())
    .then((json)=>{
        if(json.length===0){
            alert("Invalid Email and Password")
        }
        else{
             localStorage.setItem("Email",json[0].id)
             dispatch({
                 type:"Login",payload:!state.loggedin
             })
        }
    })
    .catch((error)=>alert(`${error}`))

}
    if(state.loggedin){
        return <Redirect to ="/posts" />
    }
    else{
    return (
       <div >
       <form onSubmit={submit}>
        <MuiThemeProvider>
            <React.Fragment>
            <AppBar title="Login"/>
            <TextField 
            hintText="Enter Your Email"
            floatingLabelText="Email"
            value={state.Email}
            onChange={e=>{dispatch({type :"Email", value:e.target.value})}} required
            /><br/>
            <TextField 
            hintText="Enter Your Password"
            floatingLabelText="password"
            type="password"
            value={state.Password}
            onChange={e=>{dispatch({type :"Password", value:e.target.value})}} required
            />
            <br/>
            <RaisedButton 
             label="Click"
             primary={true}
             style={styles.button}
             type="submit"
           /><br/>
           <Link to="/Regisration">Registration</Link>
            </React.Fragment>
        </MuiThemeProvider>
    </form>
    </div>
    ) }
}

export default Login
