import React, { Component } from 'react'
import styled from 'styled-components'

import { Container, Img, Card, Card2, Buttongroup } from './style.js';
import logo from '../../assets/logo.png'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import api from '../../services/api'
import { Link, withRouter } from "react-router-dom";
import Pratos from '../../componets/Pratos/index'
import Pedido from '../../componets/Pedido/index'
import { thisExpression } from '@babel/types';


export default class Login extends Component {


    constructor() {
        super();

        this.state = {

            componente: Pedido,


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
                                <Button variant="outlined" style={{ marginBottom: 50, borderColor: "#fa8e40" }} onClick={() => this.pedidos()}>Pedidos</Button>
                                <Button variant="outlined" style={{ marginBottom: 50, borderColor: "#fa8e40", marginLeft: 10 }} onClick={() => this.pratos()}>Pratos</Button>
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
pedidos(){
    this.setState({componente: Pedido})
}
pratos(){
    this.setState({componente: Pratos})
}

}


