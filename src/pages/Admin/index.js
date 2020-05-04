import React, { Component } from 'react'
import styled from 'styled-components'

import { Container, Img, Card, Card2, Buttongroup } from './style.js';
import logo from '../../assets/logo.png'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import api from '../../services/api'
import { Link, withRouter } from "react-router-dom";
import Cadastro from "../../componets/Cadastro/index"
import Faturas from "../../componets/Faturas/index"


export default class Login extends Component {


    constructor() {
        super();

        this.state = {
            email: '',
            Password: ' ',
            componente: Cadastro,

        }
        this.baseState = this.state
    }

    render() {


        return (

            <div style={{ width: '100%', height: '100vh' }}>


                <Container >
                    <Card>
                        <header>
                            <Img src={logo} />
                        </header>
                        <Card2>
                        <Buttongroup>
                                <Button variant="outlined" style={{ marginBottom: 50, borderColor: "#fa8e40" }}onClick={() => {this.setState({componente:Cadastro})}}>Cadastro</Button>
                                <Button variant="outlined" style={{ marginBottom: 50, borderColor: "#fa8e40", marginLeft: 10 }} onClick={() => {this.setState({componente:Faturas})}}>Faturas</Button>
                                <Button variant="outlined" style={{ marginBottom: 50, borderColor: "#fa8e40", marginLeft: 10 }} onClick={() => this.sair()}>Sair</Button>
                            </Buttongroup>
                            <Buttongroup>
                                <this.state.componente />
                            </Buttongroup>



                            {/* <TextField  id="standard-basic" onChange={ e => {this.setState({email: e.target.value})} }  label="Email" />
                        <TextField id="standard-basic"  onChange={ e => {this.setState({Password: e.target.value})} }  label="Senha" style={{ marginBottom: 30 }}/>
                        <Button variant="outlined"  style={{ marginBottom: 50, borderColor:"#fa8e40"  }} onClick={() => this.buscar()}>Login</Button> */}
                        </Card2>
                    </Card>
                </ Container>
            </div>

        );
    }

    sair(){
        sessionStorage.clear();
    
        this.props.history.push("/login");
    }
}


