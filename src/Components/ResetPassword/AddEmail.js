import React,{Component} from "react"
import TextField from '@material-ui/core/TextField';
import Button  from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from "axios"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

import AuthLeft from "../AuthLeft"


class EnterEmail extends Component{

    constructor(props){
        super(props)
        this.state={
            email:"",
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
        this.props.storeVerificationCode(1234)
        this.props.history.push("/enter-code")
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
                        <p><b>Hi,</b> <br /> Please Enter your email to continue</p>
                    </div>
                    <div id="login-form-container">
                        {err}
                        <form onSubmit={this.submitLogin} >
                            <TextField  error={this.state.error} name="email" onChange={this.setInput} id="outlined-basic" type="email" required label="Email" variant="outlined" />

                            {this.state.enableLogin?<Button  type="submit" variant="outlined" color="primary">NEXT</Button>: <Button  type="submit" disabled variant="outlined" color="primary"><CircularProgress  /></Button>}
                        </form>
                        <div>
                            <div>
                                <p>Already have an account?</p>
                                <Link to="/login">Sign In</Link>
                            </div>
                        </div>
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

export default connect(null,mapDispatchToProps)(EnterEmail)