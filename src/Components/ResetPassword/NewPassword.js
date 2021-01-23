import React,{Component} from "react"
import TextField from '@material-ui/core/TextField';
import Button  from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import {connect} from "react-redux"
import AuthLeft from "../AuthLeft"


class NewPassword extends Component{

    constructor(props){
        super(props)
        this.state={
            password:"",
            rePassword:"",
            enableLogin:true,
            error:false,
            errorMessage:""
        }
        this.submitLogin=this.submitLogin.bind(this)
        this.setInput=this.setInput.bind(this)
    }

    submitLogin(e){
        e.preventDefault()
        this.setState({
            enableLogin:false
        })
        if(this.state.password!==this.state.rePassword){
            this.setState({
                enableLogin:true,
                error:true,
                errorMessage:"Passwords don't match!"
            })
        }
        else if(this.state.password.replace(/\s+/g, '').length<5){
            this.setState({
                enableLogin:true,
                error:true,
                errorMessage:"Please enter a strong password!"
            })
        }
        else{
            this.props.history.push("/login?password-changed=1")
        }

    }
    setInput(e){
        this.setState({
            error:false,
            [e.target.name]:e.target.value
        })
    }

    render() {

        var err=""
        if(this.state.errorMessage!=""){
            err=<p className="errorMessage">{this.state.errorMessage}</p>
        }

        return(
            <div className="container " id="login-container">
                <AuthLeft />
                <div className="auth-right">
                    <div id="login-header-container">
                        <h2>Recover password</h2>
                        <p>Please Enter new passwords to recover</p>
                    </div>
                    <div id="login-form-container">
                        {err}
                        <form onSubmit={this.submitLogin} >
                            <TextField  error={this.state.error} name="password" onChange={this.setInput} id="outlined-basic" type="password" required label="New password" variant="outlined" />
                            <TextField  error={this.state.error} name="rePassword" onChange={this.setInput} id="outlined-basic" type="password" required label="re-password" variant="outlined" />

                            {this.state.enableLogin?<Button  type="submit" variant="outlined" color="primary">SUBMIT</Button>: <Button  type="submit" disabled variant="outlined" color="primary"><CircularProgress  /></Button>}
                        </form>
                     
                    </div>
                </div>
            </div>
        )   
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        storeVerificationCode:(code)=>{
            dispatch({
                type:"store-recover-code",
                code:code
            })
        }
    }
}

export default connect(null,mapDispatchToProps)(NewPassword)