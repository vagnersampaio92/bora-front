import React, { Component } from 'react'
import { Container, Card, Form, Buttongroup, Img } from "./style"
import Button from '@material-ui/core/Button'
import api from '../../services/api'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField'


export default class Historico extends Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurante:'',
            name: '',
            email: '',
            password: '',
            description: '',
            porcentagem: '',
            min_order_price: '',
            delivery_price: '',
            min_delivery_minutes: '',
            max_delivery_minutes: '',
            banner: '',
            ped: '',
            phone: '',
            address: '',
            logo: '',

            banner: '',
            logo: '',
            user_id: '',
            teste1:[1,2,3],
            teste2:[1,2,3]

        };
    }

    async componentWillMount() {
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
        const data = {}


        this.setState({

            opcao: 1

        })

        console.log(this.state.entrega)

    }
    render() {


        return (
            <div>

                <Buttongroup >
                    <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={() => { this.setState({ opcao: 1 }) }}>Restaurantes</Button>
                    <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, borderColor: "#fa8e40" }} onClick={() => { this.setState({ opcao: 2 }) }}>Anúncios</Button>

                </Buttongroup>


                <Container>
                    {this.state.opcao == 1 &&

                        <Card>
                            <div>
                                <Form noValidate autoComplete="off">
                                    <div style={{ marginTop: 20, marginBottom: 30, borderColor: "#fa8e40" }}>
                                        <h1>Cadastre o estabelecimento</h1>
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ name: e.target.value }) }} value={this.state.name} label="Nome" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ email: e.target.value }) }} value={this.state.email} label="Email" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ password: e.target.value }) }} value={this.state.password} label="Senha" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ description: e.target.value }) }} value={this.state.description} label="Descrição" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ porcentagem: e.target.value }) }} value={this.state.porcentagem} label="Taxa" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ min_order_price: e.target.value }) }} value={this.state.min_order_price} label="Menor valor do delivery" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ delivery_price: e.target.value }) }} value={this.state.delivery_price} label="Valor do delivery" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ min_delivery_minutes: e.target.value }) }} value={this.state.min_delivery_minutes} label="Menor tempo" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ max_delivery_minutes: e.target.value }) }} value={this.state.max_delivery_minutes} label="Tempo máximo" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ banner: e.target.value }) }} value={this.state.banner} label="Banner" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ phone: e.target.value }) }} value={this.state.phone} label="Telefone" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ address: e.target.value }) }} value={this.state.address} label="Endereço" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ logo: e.target.value }) }} value={this.state.logo} label="Logo" />
                                        <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, borderColor: "#fa8e40" }} onClick={() => { this.salvar() }} style={{ marginTop: 15, }}>Cadastrar</Button>
                                    </div>

                                </Form>
                            </div>
                        </Card>


                    }

                    {this.state.opcao == 2 &&

                        <Card>

                            <div>
                                <Form noValidate autoComplete="off">
                                    <div style={{ marginTop: 20, marginBottom: 30, borderColor: "#fa8e40" }}>
                                        <h1>Cadastre o estabelecimento</h1>
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ name: e.target.value }) }} value={this.state.name} label="Nome" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ description: e.target.value }) }} value={this.state.description} label="Descrição" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ banner: e.target.value }) }} value={this.state.banner} label="Banner" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ logo: e.target.value }) }} value={this.state.logo} label="logo" />
              
                                        
                                        <Select onChange={e => { this.setState({ ped: e.target.value }) }} style={{ marginRight: 10, minWidth: 130, marginLeft: 10 }}>

                                            {/* <MenuItem value={"sim"}>Sim</MenuItem> */}

                                            {this.state.restaurante.map(menssagem => (
                                                <MenuItem value={menssagem.id}> {menssagem.name}</MenuItem>
                                            ))
                                            }

                                        </Select>


                                        <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, borderColor: "#fa8e40" }} onClick={() => { this.salvar2() }} style={{ marginTop: 15, }}>Cadastrar</Button>

                                      
                                    </div>

                                </Form>
                            </div>
                        </Card>
                    }


                </Container>



            </div>







        );

    }
   
    async salvar() {

        const data = {}
        data.name = this.state.name
        data.email = this.state.email
        data.password = this.state.password
        data.city_id = 1
        data.description = this.state.description
        data.porcentagem = this.state.porcentagem
        data.min_order_price = this.state.min_order_price
        data.delivery_price = this.state.delivery_price
        data.avaliacao = 1
        data.min_delivery_minutes = this.state.min_delivery_minutes
        data.max_delivery_minutes = this.state.max_delivery_minutes
        data.status = "close"
        data.banner = this.state.banner
        data.phone = this.state.phone
        data.address = this.state.address
        data.delivery_option = "delivery"
        data.logo = this.state.logo
        data.rating = "5"


        console.log(data)
        try {
            //entrega
            const response = await api.post('signup', data)
            alert(" Cadastro feito")

        } catch (err) {

        }
    }
    async salvar2() {
        const data = {}
        data.name= this.state.name
        data.description=  this.state.description
        data.banner= this.state.banner
        data.logo = this.state.logo
        data.user_id=this.state.ped
        // https://uploadexampleone.s3.amazonaws.com/65fc716368b89cacb63f5235095eb2e5-XCalabresa-Delivery.jpg
       
 

        console.log(data)
        try {
            //entrega
            const response = await api.post('/establishment/boosts', data)
            alert(" Cadastro feito")

        } catch (err) {

        }
    }


}





