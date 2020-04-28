import React, { Component } from 'react'
import styled from 'styled-components'

import { Container, Img, Card, Card2} from './style.js';
import logo from '../../assets/logo.png'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import api from '../../services/api'
import { Link, withRouter } from "react-router-dom";



export default class Login extends Component {


    constructor() {
        super();
     
        this.state = {
            email:'',
            Password:' '
          
        }
        this.baseState = this.state 
    }

    render() {
        
        
        return (
            <div style={{ width: '100%' }}>
         

            <Container >
                <Card>
                    <header>
                    <Img src={logo} />
                </header>
                <Card2>
                            
                            <TextField id="standard-basic" onChange={ e => {this.setState({email: e.target.value})} }  label="Email" />
                            <TextField id="standard-basic"  onChange={ e => {this.setState({Password: e.target.value})} }  label="Senha" style={{ marginBottom: 30 }}/>
                            <Button variant="outlined" color="primary" style={{ marginBottom: 50 }} onClick={() => this.buscar()}>
                    Buscar
            </Button>
                </Card2>
            </Card>
            </ Container>
        </div>



        );
      }
      async  buscar() {
        console.log()
        

        this.setState(this.baseState)
        // this.props.comentar(this.state.imos);
        // this.setState({imos});
        
        let data = {}
      
        data.email=(this.state.email)
        data.password=(this.state.Password)
 
       
       
        console.log(data)

        try {
            const response = await api.post('loginadmin', data  )
            console.log(response.data.token)
            if(response.data.token){
                const a = response.data.token
            sessionStorage.setItem('token', a );
            // localStorage.setItem('token',response.data.user.token)
            const b = sessionStorage.getItem('token')
             console.log(b)
             this.props.history.push("/admin");
            }
        } catch (err) {

        }
    }
   
    }


   