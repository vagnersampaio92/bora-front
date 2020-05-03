import React, { Component } from 'react'
import { Container,Container2, Card, Form, Buttongroup, Img } from "./style"
import Button from '@material-ui/core/Button'
import api from '../../services/api'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { border } from '@material-ui/system';


export default class Historico extends Component {
    constructor(props) {
        super(props)
        this.state = {

            aguardando: [],
            restaurante: [],
            Pedidos:[],
            ped:'',
            opcao: ''

        };
    }

    async componentWillMount() {
        const id = sessionStorage.getItem('restauranteid')

        try {
            //entrega
            const response = await api.get('listarestaurantes')

            console.log(response)
            this.setState({

                restaurante: response.data,

            })
            console.log(this.state.restaurante)

        } catch (err) {


        }
    }
    render() {


        return (
            <div>
                <Container>
                    <Buttongroup >
                        <h1>Pedidos</h1>
                    </Buttongroup>

                    <Buttongroup >
                        <Select onChange={e => { this.setState({ ped: e.target.value }) }} style={{ marginRight: 10, minWidth: 130, marginLeft: 10 }}>

                            {/* <MenuItem value={"sim"}>Sim</MenuItem> */}

                            {this.state.restaurante.map(menssagem => (
                                <MenuItem value={menssagem.id}> {menssagem.name}</MenuItem>
                            ))
                            }

                        </Select>
                        <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={() => { this.buscar() }}>Buscar </Button>


                    </Buttongroup>


                    <Container>
                    <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={() => { this.imprimir() }}>Imprimir </Button>

                    <Container2 id="imprimir">
                    <div style={{border:"solid", borderBlockWidth:"1", borderColor: "#fa8e40"}} >
                        
                    </div>
                    </Container2>


                    </Container>


                </Container>



            </div>







        );

    }
    async buscar(){
        const data = {}
        data.id = this.state.ped
        console.log(data.id)
        
        try {
            //entrega
            const response = await api.post('listapagamentospendentes', data)

            console.log(response)
            this.setState({

                Pedidos: response.data,

            })
            console.log(this.state.Pedidos)

        } catch (err) {


        }
    }
    imprimir(){
        var pegar_dados= document.getElementById('imprimir').innerHTML

        var janela = window.open('','','width=800,height=600')
        janela.document.write(pegar_dados)
        janela.document.close()
        janela.print()

    }
    listapagamentospendentes

    async aguardando() {
        this.setState({ opcao: 1 })

    }
    async aceito() {
        this.setState({ opcao: 2 })
    }
    async  preparando() {
        this.setState({ opcao: 3 })
    }

    async  acaminho() {
        this.setState({ opcao: 4 })
    }
    async finalizado() {
        this.setState({ opcao: 5 })
    }

    async  salva(id, pedido) {


        try {
            //entrega
            const response = await api.post('atualiza', pedido)
            alert("salvo")
            this.componentWillMount()

        } catch (err) {

        }

    }


}





