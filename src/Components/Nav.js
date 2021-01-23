

import React,{Component} from "react"
import {connect} from "react-redux"
import {withRouter} from 'react-router-dom'

import AuthService from '../Services/auth'

class Nav extends Component {
        constructor(props){
            super()
            this.state={
                openMenue:false,
                anchorEl:null
            }

            this.logout=this.logout.bind(this)
          
        }

        logout(){
            AuthService.logout(()=>{
                this.props.logout()
                this.props.history.push("/login?logout-success=1")
            })
        }


        render(){
            console.log(this.props)
            return(
                <nav className="clearfix navbar navbar-light bg-light container-fluid">
                    <div >
                        <h2 className="navbar-brand mb-0 h1">ZERPLY</h2>
                    </div>
                    <div >
                        <div>
                            <div className="dropdown ">
                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                {this.props.user!=null?<p className="userName">{this.props.user.firstName} {this.props.user.lastName}</p>:""}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">

                                    <li><a onClick={this.logout} className="dropdown-item" href="#">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            )
        }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        logout:()=>{
            dispatch({type:"logout-user"})
        }
    }
}

export default connect(null,mapDispatchToProps)(withRouter(Nav))