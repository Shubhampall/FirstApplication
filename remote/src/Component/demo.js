import React,{useReducer} from 'react'
const initialstate={
    email:' '}
    const reducer=(state,action)=>{
        switch(action.type){
             case "Email":
                return{...state,email:action.Email}
        }
    }    
function Demo() {
    const [state,dispatch]=useReducer(reducer,initialstate)
    const setData=(e)=>{
    e.preventDefault();
    console.log(`R ${state.Email}`)}
    return (
        <div >
        <form onSubmit={setData}>
            <input type="text" value={state.email} onChange={e=>{dispatch({type :"First_name", value:e.target.value})}} />
        </form>
        </div>
    )
}

export default Demo