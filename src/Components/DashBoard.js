import React,{Component} from "react"
import {connect} from "react-redux"
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


import TextField from '@material-ui/core/TextField';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
            disableEdit:false,
            openCreateNew:false,
            newFirstName:"",
            newLastName:"",
            newEmail:"",
            enableCreateNew:false
        }
        this.deleteUser=this.deleteUser.bind(this)
        this.nextPage=this.nextPage.bind(this)
        this.updateUser=this.updateUser.bind(this)
        this.changeData=this.changeData.bind(this)
        this.messageClosed=this.messageClosed.bind(this)
        this.handleCloseCreateNew=this.handleCloseCreateNew.bind(this)
        this.createNewField=this.createNewField.bind(this)
        this.saveNewUser=this.saveNewUser.bind(this)
    }

    componentDidMount(){
        console.error("customers ",this.props.customers)
        if(this.props.customers.length==0){
            axios.get("https://reqres.in/api/users?page=1")
            .then(res=>{
                this.props.addCustomers(res.data.data)
            })
            .catch(e=>{
                console.log(e)
            })
        }

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
                var newuser={
                    id:user.id,
                    email:this.state.email,
                    first_name:this.state.firstName,
                    last_name:this.state.lastName,
                    avatar:user.avatar,
                }
                this.props.updateCustomers(newuser)
                this.setState({
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
            this.props.deleteCustomer(id)
            this.setState({
                messageType:"alert-success",
                message:"User deleted",
                disableEdit:false
            })

        })
        .catch(e=>{
            console.log(e.response)
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
                this.props.addCustomers(res.data.data)
                this.setState({
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

    handleCloseCreateNew(){
        this.setState({
            openCreateNew:false
        })
    }
    createNewField(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    saveNewUser(e){
        e.preventDefault()
        this.setState({
            enableCreateNew:true
        })
        var data={
            first_name:this.state.newFirstName,
            last_name:this.state.newLastName,
            email:this.state.newEmail,
            avatar:"https://reqres.in/img/faces/7-image.jpg"
        }
        axios.post("https://reqres.in/api/users",data)
        .then(res=>{

            this.props.addCustomer(res.data)
            this.setState({
                openCreateNew:false,
                enableCreateNew:false
            })
        })
        .catch(e=>{
            this.setState({
                enableCreateNew:false
            })
            console.log(e)
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
        if(this.props.customers.length>0){
            rows=this.props.customers.map(user=>{
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
            <div id="dasboard-outer">
                <Nav user={this.props.user} />
                
                <div className="container " id="dashboard-container">
                    {messages}
                    {this.state.disableEdit?<div className="container mt-2"><LinearProgress /></div> :"" }
                    <button id="create-new-record" type="button" onClick={()=>{this.setState({openCreateNew:true})}} className="btn btn-primary"><AddIcon /> Create new</button>
                    
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        id="create-new-modal-container"
                        open={this.state.openCreateNew}
                        onClose={this.handleCloseCreateNew}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={this.state.openCreateNew}>
                            <div id="create-new-model-content" >
                                <form >
                                    <Avatar alt="Remy Sharp" src="https://reqres.in/img/faces/7-image.jpg" />
                                    <TextField name="newFirstName" required onChange={this.createNewField} id="outlined-basic" label="First Name" variant="outlined" />
                                    <TextField name="newLastName" required onChange={this.createNewField} id="outlined-basic" label="Last Name" variant="outlined" />
                                    <TextField name="newEmail" required onChange={this.createNewField} id="outlined-basic" label="Email" variant="outlined" />
                                    <Button disabled={this.state.enableCreateNew} onClick={this.saveNewUser} type="submit" variant="outlined" color="primary">
                                    
                                    {this.state.enableCreateNew?<CircularProgress  />:"CREATE"}
                                    </Button>
                                </form>
                            </div>
                        </Fade>
                    </Modal>



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
        user:state.user,
        customers:state.customers
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        addCustomers:(customers)=>{
            dispatch({type:"add-customers",customers:customers})
        },
        updateCustomers:(customer)=>{
            dispatch({type:"update-customers",customer:customer})
        },
        deleteCustomer:(id)=>{
            dispatch({type:"delete-customer",id:id})
        },
        addCustomer:(customer)=>{
            dispatch({type:"add-customer",customer:customer})
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DashBoard)