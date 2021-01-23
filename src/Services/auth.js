import store from "../Store/store"

class Auth{

    constructor(){
        const state=store.getState()
        if(state.user.token!=null){
            this.authenticated=true
        }
        else{
            this.authenticated=false
        }
    }
    login(cb){
        this.authenticated=true
        cb()
    }
    logout(cb){
        window.localStorage.clear()
        this.authenticated=false
        cb()
    }
    isAuthenticated(){
        return this.authenticated
    }


}

export default new Auth()