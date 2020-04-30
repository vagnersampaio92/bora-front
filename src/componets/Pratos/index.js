import React, { Component } from 'react'
import { Container, Card, Form, Buttongroup,Img } from "./style"
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
            establishment_id: '',
            name: '',
            description: '',
            photo_url: '',
            price: '',
            pratos: []


        };
    }

    async componentWillMount() {
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
                    <h1>Pratos</h1>
                </Buttongroup>
                <Buttongroup >
                    <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={() => { this.setState({ opcao: 1 }) }}> Cadastrar </Button>
                    <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, borderColor: "#fa8e40" }} onClick={() => { this.listar() }}>Listar </Button>

                </Buttongroup>


                <Container>
                    {this.state.opcao == 1 &&

                        <Card>
                            <div>
                                <Form noValidate autoComplete="off">
                                    <div style={{ marginTop: 20, marginBottom: 30, borderColor: "#fa8e40" }}>
                                        <h1>Cadastre</h1>
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ name: e.target.value }) }} value={this.state.name} label="Nome" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ description: e.target.value }) }} value={this.state.description} label="Descrição" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ photo_url: e.target.value }) }} value={this.state.photo_url} label="Link da foto" />
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ price: e.target.value }) }} value={this.state.price} label="Preço" />
                                        <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, borderColor: "#fa8e40" }} onClick={() => { this.salvar() }} style={{ marginTop: 15, }}>Cadastrar</Button>
                                    </div>

                                </Form>
                            </div>
                        </Card>


                    }

                    {this.state.opcao == 2 &&

                        <Card>

                            {this.state.pratos.map(prato => (
                                <Card>

                                    
                                        <Img src = {prato.photo_url} ></Img>
                                    <div >
                                        <p>Nome:{prato.name}</p>
                                        <p>Descrição:{prato.description}</p>
                                        <p>Preço:R${prato.price/100}</p>
                                        
                                        
       
                                    </div>    



                                </Card>
                            ))
                            }
                        </Card>
                    }


                </Container>



            </div>







        );

    }
    async salvar() {

        const data = {}
        data.establishment_id = sessionStorage.getItem('restauranteid')
        data.name = this.state.name
        data.description = this.state.description
        data.photo_url = this.state.photo_url
        data.price = this.state.price


        try {
            //entrega
            const response = await api.post('pratos', data)
            alert(" Cadastro feito")

        } catch (err) {

        }
    }
    async listar() {
        this.setState({ opcao: 2 })
        const id = sessionStorage.getItem('restauranteid')

        try {
            //entrega
            const response = await api.get('establishment/produtos/' + id)

            this.setState({
                pratos: response.data
            })
            console.log(this.state.pratos)

        } catch (err) {

        }


    }

}





