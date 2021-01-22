import React,{Component} from "react"
import TextField from '@material-ui/core/TextField';
import Button  from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from "axios"
import {connect} from "react-redux"

import AuthLeft from "./AuthLeft"

class Register extends Component{

    constructor(props){
        super(props)
        this.state={
            email:"",
            firstName:"",
            lastName:"",
            enableRegister:true,
            password:"",
            error:false,
            errorMessage:""
        }
        this.submitRegister=this.submitRegister.bind(this)
        this.setInput=this.setInput.bind(this)
    }

    submitRegister(e){
        e.preventDefault()
        this.setState({
            enableRegister:false
        })
        axios.post("https://reqres.in/api/register",{
            email:this.state.email,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            password:this.state.password
        })
        .then(res=>{
            this.props.history.push("/login")
        })
        .catch(e=>{

            this.setState({
                errorMessage:e.response.data.error,
                enableRegister:true,
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
            err=<p className="errorMessage">{this.state.errorMessage}</p>
        }

        return(
            <div className="container " id="login-container">
                <AuthLeft />
                <div className="auth-right">
                    <div id="login-header-container">
                        <h2>Sign Up</h2>
                        <p><b>Hi,</b><br /> Welcome to <b>ZERPLY</b>. </p>
                    </div>
                    <div id="login-form-container">
                        {err}
                        <form onSubmit={this.submitRegister} >
                            <TextField error={this.state.error} name="firstName" onChange={this.setInput} id="outlined-basic" type="text" required label="First Name" variant="outlined" />
                            <TextField error={this.state.error} name="lastName" onChange={this.setInput} type="text" required id="outlined-basic" label="Last Name" variant="outlined" />
                            <TextField error={this.state.error} name="email" onChange={this.setInput} type="email" required id="outlined-basic" label="Email" variant="outlined" />
                            <TextField error={this.state.error} name="password" onChange={this.setInput} type="password" required id="outlined-basic" label="Password" variant="outlined" />

                            {this.state.enableRegister?<Button  type="submit" variant="outlined" color="primary">Sign Up</Button>: <Button  type="submit" disabled variant="outlined" color="primary"><CircularProgress  /></Button>}
                        </form>
                    </div>
                </div>
            </div>
        )   
    }
}



export default Register