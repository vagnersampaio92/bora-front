import React, { Component } from 'react'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

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
            status:'',
            componente: Pedido,
            flag:0


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
                        <Card2><Buttongroup>
                        <FormControl style={{ marginRight: 10, minWidth: 130, marginBottom: 50}}>
                                            <InputLabel htmlFor="grouped-select">Status</InputLabel>
                                            <Select onChange={e => { this.setState({status: e.target.value}) }} input={<Input id="grouped-select" />}>
                                                <MenuItem value="close"> Fechado</MenuItem>
                                                <MenuItem value="open">Aberto</MenuItem>
                                            

                                            </Select>
                                        </FormControl>
                                        <Button variant="outlined" style={{ marginBottom: 50, borderColor: "#fa8e40" }} onClick={() => this.setstatus()}>Salvar</Button>
                        </Buttongroup>
                            
                            <Buttongroup>
                                {this.state.flag==0&&
                                <Button variant="outlined" style={{ marginBottom: 50, borderColor: "#fa8e40", background:"#fa8e40" }} onClick={() => {this.pedidos(); this.setState({flag:0})}}>Pedidos</Button>
                                }
                                {this.state.flag!=0&&
                                <Button variant="outlined" style={{ marginBottom: 50, borderColor: "#fa8e40" }} onClick={() => {this.pedidos(); this.setState({flag:0})}}>Pedidos</Button>
                                }
                                {this.state.flag==1&&
                                <Button variant="outlined" style={{ marginBottom: 50, borderColor: "#fa8e40", background:"#fa8e40", marginLeft: 10 }} onClick={() => {this.pratos(); this.setState({flag:1})}}>Pratos</Button>
                                }
                                {this.state.flag!=1&&
                                <Button variant="outlined" style={{ marginBottom: 50, borderColor: "#fa8e40", marginLeft: 10 }} onClick={() => {this.pratos(); this.setState({flag:1})}}>Pratos</Button>
                                }
                         
                                
                                
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
   async setstatus(){
    const id = sessionStorage.getItem('restauranteid')
    const status= this.state.status
    let dados={}
    dados.id=id
    dados.stat=status
console.log(dados)
    try {
        //entrega

        const aguardandob = await api.post('statusres', dados)

        

    } catch (err) {

    }



    }
pedidos(){
    this.setState({componente: Pedido})
}
pratos(){
    this.setState({componente: Pratos})
}
sair(){
    sessionStorage.clear();

    this.props.history.push("/loginrestaurante");
}

}


