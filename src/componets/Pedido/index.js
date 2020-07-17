import React, { Component } from 'react'
import { Container, Card, Form, Buttongroup, Img } from "./style"
import Button from '@material-ui/core/Button'
import api from '../../services/api'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Som from '../../componets/Som/index'
import Stop from '../../componets/Som/off'
import Sound from 'react-sound';
import { red } from '@material-ui/core/colors';




export default class Historico extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pedidos: [],
            componente: Stop,
            aguardando: [],
            aguardandobk: [],
            aceito: [],
            preparando: [],
            acaminho: [],
            finalizado: [],
            equals: '',
            min: '',
            flag: 0,
            max: '',
            status: '',
            opcao: ''

        };
    }


    async componentWillMount() {

        const id = sessionStorage.getItem('restauranteid')

        try {
            //entrega
            const aguardandob = await api.get('listapedidosaguardando/' + id)
            const aceitob = await api.get('listapedidosaceito/' + id)
            const preparandob = await api.get('listapedidospreparando/' + id)
            const acaminhab = await api.get('listapedidosacaminho/' + id)
            const finalizadob = await api.get('listapedidosFinalizado/' + id)

            this.setState({

                aguardando: aguardandob.data,
                aguardandobk: aguardandob.data,
                aceito: aceitob.data,
                preparando: preparandob.data,
                acaminho: acaminhab.data,
                finalizado: finalizadob.data,
            })


        } catch (err) {


        }
        console.log(this.state.pedidos)
        var CronJob = require('cron').CronJob;
        var job = new CronJob(
            '*/4 * * * * *',
            () => {
                this.comparar()
            }

            ,
            null,
            true,
            'America/Los_Angeles'
        );
        // var job2 = new CronJob(
        //     '*/2 * * * * *',
        //     () => {
        //         this.comparar2()
        //     }

        //     ,
        //     null,
        //     true,
        //     'America/Los_Angeles'
        //);


    }
    render() {


        return (
            <div>

                <Container>
                    <this.state.componente />
                    <Buttongroup >
                        <h1>Pedidos</h1>
                    </Buttongroup>

                    <Buttongroup >
                        {this.state.flag == 0 &&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40", background: "#fa8e40" }} onClick={() => { this.aguardando(); this.setState({ flag: 0 }) }}> Pedidos novos</Button>
                        }
                        {this.state.flag != 0 &&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={() => { this.aguardando(); this.setState({ flag: 0 }) }}> Pedidos novos</Button>
                        }
                        {this.state.flag == 1 &&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40", background: "#fa8e40" }} onClick={() => { this.aceito(); this.setState({ flag: 1 }) }}>Aceito </Button>
                        }
                        {this.state.flag != 1 &&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={() => { this.aceito(); this.setState({ flag: 1 }) }}>Aceito </Button>
                        }
                        {this.state.flag == 3 &&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40", background: "#fa8e40" }} onClick={() => { this.acaminho(); this.setState({ flag: 3 }) }}>A caminho </Button>
                        }
                        {this.state.flag != 3 &&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={() => { this.acaminho(); this.setState({ flag: 3 }) }}>A caminho </Button>
                        }
                        {this.state.flag == 4 &&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40", background: "#fa8e40" }} onClick={() => { this.finalizado(); this.setState({ flag: 4 }) }}> Finalizado </Button>
                        }
                        {this.state.flag != 4 &&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={() => { this.finalizado(); this.setState({ flag: 4 }) }}> Finalizado </Button>
                        }
                        {this.state.flag == 2 &&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40", background: "#fa8e40" }} onClick={() => { this.preparando(); this.setState({ flag: 2 }) }}> Cancelado </Button>
                        }
                        {this.state.flag != 2 &&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={() => { this.preparando(); this.setState({ flag: 2 }) }}> Cancelado </Button>
                        }







                    </Buttongroup>


                    <Container>
                        {this.state.opcao == 1 &&

                            <Card>

                                {this.state.aguardandobk.map(pedido => (
                                    <Card>
                                        <p>ID:{pedido.id}</p>
                                        {pedido.pratoped.map(pra => (



                                            <p>prato:{pra}</p>


                                        ))
                                        }


                                        <p>Pagamento:{pedido.pagamento}</p>
                                        <p>Endereço:{pedido.endereco}</p>
                                        {/* <p>Tempo min:{pedido.min}</p>
                                <p>Tempo max:{pedido.max}</p> */}
                                        <TextField id="standard-basic" defaultValue={pedido.min} onChange={e => { pedido.min = e.target.value }} label="Tempo mínimo" />
                                        <TextField id="standard-basic" defaultValue={pedido.max} onChange={e => { pedido.max = e.target.value }} label="Tempo Máximo" />
                                        {/* <p>status{pedido.status}</p> */}
                                        <FormControl style={{ marginRight: 10, minWidth: 130 }}>
                                            <InputLabel htmlFor="grouped-select">Status</InputLabel>
                                            <Select onChange={e => { pedido.status = e.target.value }} defaultValue={pedido.status} input={<Input id="grouped-select" />}>
                                                <MenuItem value="Aguardando"> Pedido novo</MenuItem>
                                                <MenuItem value="Aceito">Aceito</MenuItem>
                                                {/* <MenuItem value="preparando">Preparando</MenuItem> */}
                                                <MenuItem value="acaminho">A caminho</MenuItem>
                                                <MenuItem value="Finalizado">Finalizado</MenuItem>



                                            </Select>
                                        </FormControl>
                                        <p>Preço:R${pedido.price / 100}</p>
                                        <div>
                                            <Button variant="outlined" style={{ marginBottom: 15, marginTop: 15, color: 'red', borderColor: 'red' }} onClick={() => { pedido.status = "Cancelado"; this.salva(pedido.id, pedido) }}>Cancelar pedido</Button>
                                            <Button variant="outlined" color="primary" style={{ marginBottom: 15, marginTop: 15, marginLeft: 10 }} onClick={() => { this.salva(pedido.id, pedido) }}>Salvar status</Button>
                                        </div>


                                    </Card>
                                ))
                                }


                            </Card>


                        }

                        {this.state.opcao == 2 &&

                            <Card>

                                {this.state.aceito.map(pedido => (
                                    <Card>
                                        <p>ID:{pedido.id}</p>
                                        {pedido.pratoped.map(pra => (



                                            <p>prato:{pra}</p>


                                        ))
                                        }


                                        <p>Pagamento:{pedido.pagamento}</p>
                                        <p>Endereço:{pedido.endereco}</p>
                                        {/* <p>Tempo min:{pedido.min}</p>
                                <p>Tempo max:{pedido.max}</p> */}
                                        <TextField id="standard-basic" defaultValue={pedido.min} onChange={e => { pedido.min = e.target.value }} label="Tempo mínimo" />
                                        <TextField id="standard-basic" defaultValue={pedido.max} onChange={e => { pedido.max = e.target.value }} label="Tempo Máximo" />
                                        {/* <p>status{pedido.status}</p> */}
                                        <FormControl style={{ marginRight: 10, minWidth: 130 }}>
                                            <InputLabel htmlFor="grouped-select">Status</InputLabel>
                                            <Select onChange={e => { pedido.status = e.target.value }} defaultValue={pedido.status} input={<Input id="grouped-select" />}>
                                                <MenuItem value="Aguardando"> Pedido novo</MenuItem>
                                                <MenuItem value="Aceito">Aceito</MenuItem>
                                                {/* <MenuItem value="preparando">Preparando</MenuItem> */}
                                                <MenuItem value="acaminho">A caminho</MenuItem>
                                                <MenuItem value="Finalizado">Finalizado</MenuItem>



                                            </Select>
                                        </FormControl>
                                        <p>Preço:R${pedido.price / 100}</p>



                                        <Button variant="outlined" color="primary" style={{ marginBottom: 15, marginTop: 15 }} onClick={() => { this.salva(pedido.id, pedido) }}>Salvar</Button>
                                    </Card>
                                ))
                                }



                            </Card>
                        }
                        {this.state.opcao == 3 &&

                            <Card>

                                {this.state.preparando.map(pedido => (
                                    <Card>
                                        <p>ID:{pedido.id}</p>
                                        {pedido.pratoped.map(pra => (



                                            <p>prato:{pra}</p>


                                        ))
                                        }


                                        <p>Pagamento:{pedido.pagamento}</p>
                                        <p>Endereço:{pedido.endereco}</p>
                                        {/* <p>Tempo min:{pedido.min}</p>
                                <p>Tempo max:{pedido.max}</p> */}
                                        <TextField id="standard-basic" defaultValue={pedido.min} onChange={e => { pedido.min = e.target.value }} label="Tempo mínimo" />
                                        <TextField id="standard-basic" defaultValue={pedido.max} onChange={e => { pedido.max = e.target.value }} label="Tempo Máximo" />
                                        {/* <p>status{pedido.status}</p> */}
                                        <FormControl style={{ marginRight: 10, minWidth: 130 }}>
                                            <InputLabel htmlFor="grouped-select">Status</InputLabel>
                                            <Select onChange={e => { pedido.status = e.target.value }} defaultValue={pedido.status} input={<Input id="grouped-select" />}>
                                                <MenuItem value="Aguardando">Pedido novo</MenuItem>
                                                <MenuItem value="Aceito">Aceito</MenuItem>
                                                <MenuItem value="acaminho">A caminho</MenuItem>
                                                <MenuItem value="Finalizado">Finalizado</MenuItem>
                                                <MenuItem value="Cancelado">Cancelado</MenuItem>



                                            </Select>
                                        </FormControl>
                                        <p>Preço:R${pedido.price / 100}</p>



                                        <Button variant="outlined" color="primary" style={{ marginBottom: 15, marginTop: 15 }} onClick={() => { this.salva(pedido.id, pedido) }}>Salvar</Button>
                                    </Card>
                                ))
                                }



                            </Card>
                        }
                        {this.state.opcao == 4 &&

                            <Card>

                                {this.state.acaminho.map(pedido => (
                                    <Card>
                                        <p>ID:{pedido.id}</p>
                                        {pedido.pratoped.map(pra => (



                                            <p>prato:{pra}</p>


                                        ))
                                        }


                                        <p>Pagamento:{pedido.pagamento}</p>
                                        <p>Endereço:{pedido.endereco}</p>
                                        {/* <p>Tempo min:{pedido.min}</p>
                                <p>Tempo max:{pedido.max}</p> */}
                                        <TextField id="standard-basic" defaultValue={pedido.min} onChange={e => { pedido.min = e.target.value }} label="Tempo mínimo" />
                                        <TextField id="standard-basic" defaultValue={pedido.max} onChange={e => { pedido.max = e.target.value }} label="Tempo Máximo" />
                                        {/* <p>status{pedido.status}</p> */}
                                        <FormControl style={{ marginRight: 10, minWidth: 130 }}>
                                            <InputLabel htmlFor="grouped-select">Status</InputLabel>
                                            <Select onChange={e => { pedido.status = e.target.value }} defaultValue={pedido.status} input={<Input id="grouped-select" />}>
                                                <MenuItem value="Aguardando">Pedido novo</MenuItem>
                                                <MenuItem value="Aceito">Aceito</MenuItem>
                                                {/* <MenuItem value="preparando">Preparando</MenuItem> */}
                                                <MenuItem value="acaminho">A caminho</MenuItem>
                                                <MenuItem value="Finalizado">Finalizado</MenuItem>



                                            </Select>
                                        </FormControl>
                                        <p>Preço:R${pedido.price / 100}</p>



                                        <Button variant="outlined" color="primary" style={{ marginBottom: 15, marginTop: 15 }} onClick={() => { this.salva(pedido.id, pedido) }}>Salvar</Button>
                                    </Card>
                                ))
                                }



                            </Card>
                        }

                        {this.state.opcao == 5 &&

                            <Card>

                                {this.state.finalizado.map(pedido => (
                                    <Card>
                                        <p>ID:{pedido.id}</p>
                                        {pedido.pratoped.map(pra => (



                                            <p>prato:{pra}</p>


                                        ))
                                        }


                                        <p>Pagamento:{pedido.pagamento}</p>
                                        <p>Endereço:{pedido.endereco}</p>
                                        {/* <p>Tempo min:{pedido.min}</p>
                                <p>Tempo max:{pedido.max}</p> */}
                                        <TextField id="standard-basic" defaultValue={pedido.min} onChange={e => { pedido.min = e.target.value }} label="Tempo mínimo" />
                                        <TextField id="standard-basic" defaultValue={pedido.max} onChange={e => { pedido.max = e.target.value }} label="Tempo Máximo" />
                                        {/* <p>status{pedido.status}</p> */}
                                        <FormControl style={{ marginRight: 10, minWidth: 130 }}>
                                            <InputLabel htmlFor="grouped-select">Status</InputLabel>
                                            <Select onChange={e => { pedido.status = e.target.value }} defaultValue={pedido.status} input={<Input id="grouped-select" />}>
                                                <MenuItem value="Aguardando"> Pedido novo</MenuItem>
                                                <MenuItem value="Aceito">Aceito</MenuItem>
                                                {/* <MenuItem value="preparando">Preparando</MenuItem> */}
                                                <MenuItem value="acaminho">A caminho</MenuItem>
                                                <MenuItem value="Finalizado">Finalizado</MenuItem>



                                            </Select>
                                        </FormControl>
                                        <p>Preço:R${pedido.price / 100}</p>



                                        <Button variant="outlined" color="primary" style={{ marginBottom: 15, marginTop: 15 }} onClick={() => { this.salva(pedido.id, pedido) }}>Salvar</Button>
                                    </Card>
                                ))
                                }



                            </Card>
                        }

                    </Container>


















                </Container>



            </div>







        );

    }

    async comparar() {
        this.testa()
        const equals1 = this.state.aguardando.length === this.state.aguardandobk.length && this.state.aguardandobk.every((e, i) => e.id === this.state.aguardando[i].id);
        if (equals1 == false && this.state.aguardando.length != 0) {
            await this.setState(
                {
                    componente: Som,
                    aguardandobk: this.state.aguardando
                }

            )
            console.log("toca som")
            setTimeout(
                () => {
                    console.log("opaaaaa")
                    this.comparar2()
                }
                ,
                3000
            );
        }



        console.log("compara")
    }
    comparar2() {

        this.setState(
            {
                componente: Stop
            }

        )


        console.log("para som")
    }
    async  testa() {
        const id2 = sessionStorage.getItem('restauranteid')

        try {
            //entrega

            const aguardandob = await api.get('listapedidosaguardando/' + id2)


            this.setState({

                aguardando: aguardandob.data,



            })
            console.log(this.state.pedidos)

        } catch (err) {

        }


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
        const id2 = sessionStorage.getItem('restauranteid')

        try {
            //entrega
            const response = await api.post('atualiza', pedido)
            alert("salvo")
            const aguardandob = await api.get('listapedidosaguardando/' + id2)
            const aceitob = await api.get('listapedidosaceito/' + id2)
            const preparandob = await api.get('listapedidospreparando/' + id2)
            const acaminhab = await api.get('listapedidosacaminho/' + id2)
            const finalizadob = await api.get('listapedidosFinalizado/' + id2)

            this.setState({

                aguardando: aguardandob.data,
                aguardandobk: aguardandob.data,
                aceito: aceitob.data,
                preparando: preparandob.data,
                acaminho: acaminhab.data,
                finalizado: finalizadob.data,
            })
            console.log(this.state.pedidos)

        } catch (err) {

        }


    }


}





