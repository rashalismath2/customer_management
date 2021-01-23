import React,{Component} from "react"
import {connect} from "react-redux"
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';

import Nav from "./Nav"

import axios from "axios"

class DashBoard extends Component{

    constructor(props){
        super(props)
        this.state={
            users:[],
            editUser:"",
            onPage:1,
            messageType:"alert-warning",
            message:"",
            firstName:"",
            lastName:"",
            email:"",
            disableEdit:false
        }
        this.deleteUser=this.deleteUser.bind(this)
        this.nextPage=this.nextPage.bind(this)
        this.updateUser=this.updateUser.bind(this)
        this.changeData=this.changeData.bind(this)
        this.messageClosed=this.messageClosed.bind(this)
    }

    componentDidMount(){
        axios.get("https://reqres.in/api/users?page=1")
        .then(res=>{
            this.setState({
                users:res.data.data
            })
        })
        .catch(e=>{
            console.log(e)
        })
    }

    messageClosed(){
        this.setState({
            message:""
        })
    }

    updateUser(user){
        if(
            this.state.firstName=="" ||
            this.state.lastName=="" ||
            this.state.email==""
        ){
            this.setState({
                messageType:"alert-warning",
                message:"Please update inputs"
            })
        }
        else{

            this.setState({
                disableEdit:true
            })

            axios.put("https://reqres.in/api/users/"+user.id,{
                email:this.state.email,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                avatar:user.avatar,
            })
            .then(res=>{
                var newarr=this.state.users.map(u=>{
                    if(u.id==user.id){
                        return {
                            first_name:this.state.firstName,
                            last_name:this.state.lastName,
                            email:this.state.email,
                            avatar:user.avatar
                        }
                    }
                    return u
                })
                this.setState({
                    users:newarr,
                    firstName:"",
                    lastName:"",
                    email:"",
                    editUser:"",
                    messageType:"alert-success",
                    message:"User updated",
                    disableEdit:false
                })

            })
            .catch(e=>{
                this.setState({
                    messageType:"alert-danger",
                    message:e.response.data,
                    disableEdit:false
                })
                console.log(e)
            })
        }
    }
    changeData(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    deleteUser(id){
        this.setState({
            disableEdit:true
        })
        axios.delete("https://reqres.in/api/users/"+id)
        .then(res=>{
            var newarr=this.state.users.filter(user=>{
                return user.id!=id
            })
            this.setState({
                users:newarr,
                messageType:"alert-success",
                message:"User deleted",
                disableEdit:false
            })

        })
        .catch(e=>{
            this.setState({
                messageType:"alert-danger",
                message:e.response.data,
                disableEdit:false
            })
            console.log(e)
        })

    }

    nextPage(e){
        if(e.target.text!=this.state.onPage){
            this.setState({
                disableEdit:true
            })

            axios.get("https://reqres.in/api/users?page="+e.target.text)
            .then(res=>{
                this.setState({
                    users:res.data.data,
                    disableEdit:false
                })
            })
            .catch(e=>{
                this.setState({
                    disableEdit:false
                })
                console.log(e)
            })
        }
        this.setState({
            onPage:e.target.text
        })

    }

    render() {

        var messages;
        if(this.state.message!=""){
            messages=<div className={this.state.messageType+" container alert alert-dismissible fade show"} role="alert">
                            {this.state.message}
                            <button onClick={this.messageClosed} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
        }

        var rows=<tr></tr>
        if(this.state.users.length>0){
            rows=this.state.users.map(user=>{
                if(this.state.editUser==user.id){
                    return(
                        <tr key={user.id}>
                            <th scope="row"><Avatar alt="Remy Sharp" src={user.avatar} /></th>
                            <td className="tbl-edt-fName"><input name="firstName" onChange={this.changeData} id="outlined-basic" defaultValue={user.first_name} label="First Name" required type="text"  /></td>
                            <td className="tbl-edt-lName"><input name="lastName" onChange={this.changeData} id="outlined-basic" defaultValue={user.last_name} label="Last Name" required type="text"  /></td>
                            <td className="tbl-edt-email"><input name="email" onChange={this.changeData} id="outlined-basic" defaultValue={user.email} label="Email" required type="email"  /></td>

                            <td  className="tbl-edt-act">
                                <button type="button" disabled={this.state.disableEdit} onClick={()=>{this.updateUser(user)}} className="btn btn-success btn-sm">Save</button>
                                <button type="button" disabled={this.state.disableEdit} onClick={()=>{this.setState({editUser:""})}} className="btn btn-primary btn-sm">Cancel</button>
                            </td>
                        </tr>
                    )
                }
                else{
                    return(
                        <tr key={user.id}>
                            <th scope="row"><Avatar alt="Remy Sharp" src={user.avatar} /></th>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>
                                <div className="dropdown ">
                                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li><a  className="dropdown-item"onClick={()=>this.setState({editUser:user.id})}>Edit</a></li>
                                        <li><a className="dropdown-item" onClick={()=>this.deleteUser(user.id)} href="#">Delete</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    )
                }
            })
        
        }

        return(
            <div>
                <Nav user={this.props.user} />
                
                <div className="container " id="dashboard-container">
                    {messages}
                    {this.state.disableEdit?<div className="container mt-2"><LinearProgress /></div> :"" }
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="tbl-img" scope="col"></th>
                                <th className="tbl-fName" scope="col">First Name</th>
                                <th className="tbl-sName" scope="col">Last Name</th>
                                <th className="tbl-email" scope="col">Email</th>
                                <th className="tbl-act" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination" >
                            <li className="page-item" className={this.state.onPage==1?"active page-item":"page-item"}><a className="page-link" onClick={this.nextPage} href="#">1</a></li>
                            <li className="page-item" className={this.state.onPage==2?"active page-item":"page-item"}><a className="page-link" onClick={this.nextPage} href="#">2</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )   
    }
}

const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(DashBoard)