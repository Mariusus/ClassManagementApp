import React, {Component} from 'react';
import {MENU} from '../../constants/constant';
import {TEACHER} from '../../constants/constant_teacher';
import {STUDENT} from '../../constants/constant_student';
import { Link } from "react-router-dom";
    


class Sidebar extends Component{

    constructor(props){
        super(props);
        this.state={
            menus: []
        }
    }

    componentDidMount(){

        fetch('/')

        .then(res => {

            var menu = [];    
            var role =  JSON.parse(localStorage.getItem('roles'));

            if(role === "Admin"){
                    var v = Object.values(MENU);
                    for(var i in v){
                        menu.push(v[i]);
                    }   
            } else if(role === "Teacher"){
                    var lib = Object.values(TEACHER);
                    for(var l in lib){
                        menu.push(lib[l]);
                    }
            } else if(role === "Student"){
                var student = Object.values(STUDENT);
                for(var s in student){
                    menu.push(student[s]);
                }
            } 
            this.setState({ 
                menus: menu
            });
        })

        .catch(err => console.log(err.res));
        
    }

    render(){  
       
        const { menus } = this.state;
        return(
            <div className="dashboard-leftbar">
                <div className="dashboard-demo"> 
                
                    {
                       menus.map(m =>(
                            <div key={m.name}>
                                <p className={m.url}></p><br/>
                                <Link to={m.link}>{m.surname}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Sidebar;