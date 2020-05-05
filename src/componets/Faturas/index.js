import React, { Component } from 'react'
import { Container, Container2, Card, Form, Buttongroup, Img } from "./style"
import Button from '@material-ui/core/Button'
import api from '../../services/api'
import logo from '../../assets/logo.png'
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
            data:'',
            hora:'',
            aguardando: [],
            restaurante: [],
            rest: {},
            Pedidos: [],
            ped: '',
            opcao: '',
            total: '',
            pagar: ''

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

                            <div>
                                <header>
                                    <img src={logo} style={{width:150, height:100}}/>
                                </header>
                                <div>
                                    <h4>Estabelecimento:{this.state.rest.name}</h4>
                                    <h4>Endereço:{this.state.rest.address}</h4>
                                    <h4>Taxa:{this.state.rest.porcentagem}%</h4>

                                </div>
                                <div style={{ border: "solid", borderBlockWidth: "1", borderColor: "#fa8e40", display: "flex", alignContent: "center", justifyContent: "center" }} >
                                    <div>
                                        {/* class="bordered striped centered" */}
                                        <table >
                                            <thead>
                                                <tr>
                                                    <th style={{padding: "5px 25px",display: "table-cell",textAlign: "left",verticalAlign: "middle"}}>Pagamento</th>
                                                    <th style={{padding: "5px 25px",display: "table-cell",textAlign: "left",verticalAlign: "middle"}}>Valor</th>
                                                    <th style={{padding: "5px 25px",display: "table-cell",textAlign: "left",verticalAlign: "middle"}}>Endereço</th>
                                                    <th style={{padding: "5px 25px",display: "table-cell",textAlign: "left",verticalAlign: "middle"}}>Data</th>
                                                    <th style={{padding: "5px 25px",display: "table-cell",textAlign: "left",verticalAlign: "middle"}}>Hora</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{display: "table-row-group",verticalAlign: "middle",borderColor: "inherit" }}>
                                                {this.state.Pedidos.map(pedido => (
                                                       
                    
                                                    <tr>
                                                         
                                                        <td style={{padding: "5px 25px",display: "table-cell",textAlign: "left",verticalAlign: "middle"}}>{pedido.pagamento}</td>
                                                        <td style={{padding: "5px 25px", display: "table-cell",textAlign: "left",verticalAlign: "middle"}}>R${pedido.price / 100}</td>
                                                        <td style={{padding: "5px 25px",display: "table-cell",textAlign: "left",verticalAlign: "middle"}}>{pedido.endereco} </td>
                                                      
                                                        <td style={{padding: "5px 25px",display: "table-cell",textAlign: "left",verticalAlign: "middle"}}>{pedido.data}</td>
                                                        <td style={{padding: "5px 25px",display: "table-cell",textAlign: "left",verticalAlign: "middle"}}>{pedido.hora}</td>
                                                        
                                                    </tr>
                                                ))
                                                }
                                            </tbody>
                                        </table>
                                        <h3>Total:{this.state.total}</h3>
                                        <h2>Total a pagar:{this.state.pagar}</h2>
                                    </div>

                                </div>
                            </div>

                        </Container2>


                    </Container>


                </Container>



            </div >



        );

    }

    
    async buscar() {
        const data = {}
        data.id = this.state.ped
        console.log(data.id)
        let subtotal = 0
        let preco
        let pagar
        this.setState({

            res: {},

        })
        try {
            //entrega
            const response = await api.post('listapagamentospendentes', data)

            console.log(response)
            this.setState({

                Pedidos: response.data,

            })
            for(let x=0; x<this.state.Pedidos.length;x++){
                console.log(this.state.Pedidos[x].createdAt)
                const d=this.state.Pedidos[x].createdAt.split("T")
                const h=d[1].split(".")

                   this.state.Pedidos[x].data=d[0]
                   this.state.Pedidos[x].hora=h[0]
    
              
            }
            for (let x = 0; x < response.data.length; x++) {
                preco = parseFloat(response.data[x].price) / 100
                subtotal = subtotal + preco
            }
            for (let x = 0; x < this.state.restaurante.length; x++) {
                if (data.id == this.state.restaurante[x].id) {
                    pagar = ((subtotal * this.state.restaurante[x].porcentagem) / 100).toFixed(2);
                    this.setState({
                        rest: this.state.restaurante[x]
                    })
                }
            }

            this.setState({
                total: subtotal,
                pagar: pagar
            })
            console.log(this.state.Pedidos)


        } catch (err) {


        }
    }
    imprimir() {
        var pegar_dados = document.getElementById('imprimir').innerHTML

        var janela = window.open('', '', 'width=800,height=600')
        janela.document.write(pegar_dados)
        janela.document.close()
        janela.print()

    }
   

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





