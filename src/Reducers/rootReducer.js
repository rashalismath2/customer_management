

const initState={
    user:{
        email:localStorage.getItem('email'),
        firstName:localStorage.getItem('firstName'),
        lastName:localStorage.getItem('lastName'),
        token:localStorage.getItem('token'),
    },
    customers:[],
    code:null
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
    else if(action.type=="add-customers"){
        return {
            ...state,
            customers:action.customers
        }
    }
    else if(action.type=="update-customers"){
        var customers=state.customers.map(customer=>{
            if(customer.id==action.customer.id){          
                return action.customer
            }
            return customer
        })
        return {
            ...state,
            customers:customers
        }
    }
    else if(action.type=="delete-customer"){
        var customers=state.customers.filter(customer=>{
            return customer.id!=action.id
        })
        return {
            ...state,
            customers:customers
        }
    }
    else if(action.type=="add-customer"){
        var customers=[action.customer,...state.customers]
        return {
            ...state,
            customers:customers
        }
    }
    else if(action.type=="store-recover-code"){
        return {
            ...state,
            code:action.code
        }
    }
    return state
}

export default rootReducer
