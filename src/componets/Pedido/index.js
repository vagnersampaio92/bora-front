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


export default class Historico extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pedidos: [],
            min: '',
            max: '',
            status:''

        };
    }

    async componentWillMount() {
        const id = sessionStorage.getItem('restauranteid')

        try {
            //entrega
            const response = await api.get('listapedidos/' + id)

            this.setState({
                pedidos: response.data
            })
            console.log(this.state.pedidos)

        } catch (err) {


        }
    }
    render() {


        return (
            <div>
                <Container>




                    {this.state.pedidos.map(pedido => (
                        <Card>
                            {pedido.pratoped.map(pra => (



                                <p>prato:{pra}</p>


                            ))
                            }


                            <p>Pagamento:{pedido.pagamento}</p>
                            {/* <p>Tempo min:{pedido.min}</p>
                                <p>Tempo max:{pedido.max}</p> */}
                            <TextField id="standard-basic" defaultValue={pedido.min} onChange={e => { pedido.min = e.target.value }} label="Tempo mínimo" />
                            <TextField id="standard-basic" defaultValue={pedido.max} onChange={e => { pedido.max = e.target.value }} label="Tempo Máximo" />
                            {/* <p>status{pedido.status}</p> */}
                            <FormControl style={{ marginRight: 10, minWidth: 130 }}>
                                <InputLabel htmlFor="grouped-select">Status</InputLabel>
                                <Select onChange={e => { pedido.status = e.target.value }} defaultValue={pedido.status} input={<Input id="grouped-select" />}>
                                    <MenuItem value="Aguardando"> Aguardando</MenuItem>
                                    <MenuItem value="Aceito">Aceito</MenuItem>
                                    <MenuItem value="preparando">Preparando</MenuItem>
                                    <MenuItem value="a caminho">A caminho</MenuItem>
                                    <MenuItem value="Finalizado">Finalizado</MenuItem>



                                </Select>
                            </FormControl>
                            <p>Preço:R${pedido.price / 100}</p>



                            <Button variant="outlined" color="primary" style={{ marginBottom: 15, marginTop: 15 }} onClick={() => {this.salva(pedido.id, pedido)}}>Salvar</Button>
                        </Card>
                    ))
                    }



                </Container>



            </div>







        );

    }
  async  salva(id, pedido){
    

        try {
            //entrega
            const response = await api.post('atualiza', pedido)
            alert("salvo")

        } catch (err) {

        }

    }


}





