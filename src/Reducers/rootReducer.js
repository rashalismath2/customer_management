

const initState={
    user:{
        email:localStorage.getItem('email'),
        firstName:localStorage.getItem('firstName'),
        lastName:localStorage.getItem('lastName'),
        token:localStorage.getItem('token'),
    }
}

const rootReducer=(state=initState,action)=>{
    if(action.type=="login-user"){
        localStorage.setItem("firstName", action.user.firstName);
        localStorage.setItem("lastName", action.user.lastName);
        localStorage.setItem("token", action.user.token);
        localStorage.setItem("email", action.user.email);
        return {
            ...state,
            user:action.user
        }
    }
    else if(action.type=="logout-user"){
        return {
            ...state,
            user:{}
        }
    }
    return state
}

export default rootReducer
