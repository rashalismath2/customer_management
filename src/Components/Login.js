import React,{Component} from "react"
import TextField from '@material-ui/core/TextField';
import Button  from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from "axios"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

import AuthLeft from "./AuthLeft"
import AuthService from '../Services/auth'

class Login extends Component{

    constructor(props){
        super(props)
        this.state={
            email:"",
            enableLogin:true,
            password:"",
            error:false,
            errorMessage:"",
            errorStyle:""
        }
        this.submitLogin=this.submitLogin.bind(this)
        this.setInput=this.setInput.bind(this)
    }

    componentDidMount(){
        console.log(this.props)
        if(this.props.location.search=="?password-changed=1"){
            this.setState({
                errorMessage:"Password changed!",
                errorStyle:"err-success"
            })
        }
        if(this.props.location.search=="?logout-success=1"){
            this.setState({
                errorMessage:"Logout success",
                errorStyle:"err-success"
            })
        }
        else if(this.props.location.search=="?registration=1"){
            this.setState({
                errorMessage:"Registration complete",
                errorStyle:"err-success"
            })
        }
    }

    submitLogin(e){
        e.preventDefault()
        this.setState({
            enableLogin:false
        })
        axios.post("https://reqres.in/api/login",{
            email:this.state.email,
            password:this.state.password
        })
        .then(res=>{
            this.props.signInUser({
                email:this.state.email,
                firstName:"Rashal",
                lastName:"Ismathulla",
                token:res.data.token
            })
            AuthService.login(()=>{
                this.props.history.push("/dashboard")
            })
            
        })
        .catch(e=>{

            this.setState({
                errorMessage:e.response.data.error,
                enableLogin:true,
                error:true
            })
        })
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
            err=<p className={this.state.errorStyle+" errorMessage"}>{this.state.errorMessage}</p>
        }

        return(
            <div className="container " id="login-container">
                <AuthLeft />
                <div className="auth-right">
                    <div id="login-header-container">
                        <h2>Sign In</h2>
                        <p><b>Hi,</b> Welcome back. <br /> Please Sign In to continue</p>
                    </div>
                    <div id="login-form-container">
                        {err}
                        <form onSubmit={this.submitLogin} >
                            <TextField  error={this.state.error} name="email" onChange={this.setInput} id="outlined-basic" type="email" required label="Email" variant="outlined" />
                            <TextField error={this.state.error} name="password" onChange={this.setInput} type="password" required id="outlined-basic" label="Password" variant="outlined" />

                            {this.state.enableLogin?<Button  type="submit" variant="outlined" color="primary">Login</Button>: <Button  type="submit" disabled variant="outlined" color="primary"><CircularProgress  /></Button>}
                        </form>
                        <div>
                            <Link to="/recover-email">Forgot your password?</Link>
                            <div>
                                <p>Don't have an account?</p>
                                <Link to="/register">Sign up</Link>
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
        signInUser:(user)=>{
            dispatch({
                type:"login-user",
                user:user
            })
        }
    }
}

export default connect(null,mapDispatchToProps)(Login)