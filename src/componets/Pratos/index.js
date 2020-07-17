import React, { Component } from 'react'
import { Container, Card, Form, Buttongroup, Img } from "./style"
import Button from '@material-ui/core/Button'
import api from '../../services/api'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField'
import Upload from '../Upload/index'
import FileList from "../FileList/index";

import { uniqueId } from "lodash";
import filesize from "filesize";

export default class Historico extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploadedFiles: [],
            establishment_id: '',
            name: '',
            description: '',
            photo_url: '',
            price: '',
            editname: '',
            editdescription: '',
            editphoto_url: '',
            editprice: '',
            pratos: [],
            arr: []


        };
    }
    async componentDidMount() {
        const response = await api.get("posts");


        this.setState({
            uploadedFiles: response.data.map(file => ({

                preview: file.url,
                uploaded: true,
                url: file.url
            }))
        });

    }

    handleUpload = files => {
        const uploadedFiles = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null
        }));

        this.setState({
            uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
        });

        uploadedFiles.forEach(this.processUpload);
    };

    updateFile = (id, data) => {
        this.setState({
            uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
                return id === uploadedFile.id
                    ? { ...uploadedFile, ...data }
                    : uploadedFile;
            })
        });
    };

    processUpload = uploadedFile => {
        const data = new FormData();

        data.append("file", uploadedFile.file, uploadedFile.name);

        api
            .post("posts", data, {
                onUploadProgress: e => {
                    const progress = parseInt(Math.round((e.loaded * 100) / e.total));

                    this.updateFile(uploadedFile.id, {
                        progress
                    });
                }
            })
            .then(response => {

                this.setState(
                    {
                        photo_url: response.data
                    }
                )
                this.updateFile(uploadedFile.id, {
                    uploaded: true,
                    id: response.data._id,
                    url: response.data.url
                });
            })
            .catch(() => {
                this.updateFile(uploadedFile.id, {
                    error: true
                });
            });
    };

    handleDelete = async id => {
        await api.delete(`posts/${id}`);

        this.setState({
            uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
        });
    };
    async componentWillMount() {
        const data = {}

        this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
        this.setState({

            opcao: 1

        })

        console.log(this.state.entrega)

    }
    render() {

        const { uploadedFiles } = this.state;
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

                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ price: e.target.value }); this.formatarMoeda() }} id="valor" maxlength="4" label="Preço" />




                                        <h4 style={{ marginTop: 10 }}>Foto do prato</h4>
                                        <Upload onUpload={this.handleUpload} />
                                        {!!uploadedFiles.length && (
                                            <FileList files={uploadedFiles} onDelete={this.handleDelete} />
                                        )}
                                        <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, borderColor: "#fa8e40" }} onClick={() => { this.salvar() }} style={{ marginTop: 15, }}>Cadastrar</Button>
                                    </div>

                                </Form>
                            </div>
                        </Card>


                    }

                    {this.state.opcao == 2 &&

                        <Card>

                            {this.state.pratos.map((prato, index) => (
                                <Card style={{ marginBottom: 30, borderColor: "transparent" }}>


                                    <Img src={prato.photo_url} ></Img>
                                    <div >
                                        <p>Nome:{prato.name}</p>
                                        {this.state.arr[index] == true &&
                                            <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ editname: e.target.value }) }} value={this.state.editname} label="Nome" />

                                        }

                                        <p>Descrição:{prato.description}</p>
                                        {this.state.arr[index] == true &&
                                            <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ editdescription: e.target.value }) }} value={this.state.editdescription} label="Descrição" />

                                        }
                                        <p>Preço:R${prato.price / 100}</p>
                                        {this.state.arr[index] == true &&
                                            <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ editprice: e.target.value }); this.formatarMoeda() }} id="valor" maxlength="4" label="Preço" />

                                        }
                                        {this.state.arr[index] == true &&
                                            <div>
                                                <Upload onUpload={this.handleUpload} />
                                                {!!uploadedFiles.length && (
                                                    <FileList files={uploadedFiles} onDelete={this.handleDelete} />
                                                )}
                                            </div>

                                        }
                                        {this.state.arr[index] == true &&
                                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 25, borderColor: "#fa8e40" }} onClick={() => { this.editardados(prato.id, prato.price) }} style={{ marginTop: 15, }}>Salvar edição</Button>

                                        }
                                        
                                        <Button variant="outlined" style={{ marginTop: 20, marginBottom: 25, borderColor: "#fa8e40" }} onClick={() => {
                                            this.setState(prev => ({
                                                arr: prev.arr.map((val, i) => !val && i == index ? true : val)
                                            })); console.log(this.state.arr[index])
                                            this.setState({
                                                editname: prato.name,
                                                editdescription: prato.description,
                                                editphoto_url: prato.photo_url,
                                                editprice: prato.price,
                                            })
                                        }} style={{ marginTop: 15, }}>Editar</Button>

                                        <Button variant="outlined" style={{ marginTop: 20, marginBottom: 25, borderColor: "#fa8e40" }} onClick={() => { this.delete(prato.id) }} style={{ marginTop: 15, }}>Apagar</Button>
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

    async editardados(id, valor) {
        let data = {}
        data.id = id
        data.name = this.state.editname
        data.description = this.state.editdescription
        data.photo_url = this.state.photo_url

        console.log(this.state.editprice)
        let t = this.state.editprice
        if (t != valor) {
            let teste = this.state.editprice.split(',')
            if (teste.length > 1) {
                data.price = teste[0] + teste[1]
            } else {
                data.price = teste[0] * 100

            }
        } else {
            data.price = this.state.editprice
        }

        try {
            //entrega
            const response = await api.post('editaprato', data)
            alert("Edição feito")
            this.listar()

        } catch (err) {

        }

        console.log(data)
    }
    async salvar() {

        const data = {}
        console.log(this.state.price)
        data.establishment_id = sessionStorage.getItem('restauranteid')
        data.name = this.state.name
        data.description = this.state.description
        data.photo_url = this.state.photo_url

        let teste = this.state.price.split(',')


        if (teste.length > 1) {
            data.price = teste[0] + teste[1]
        } else {
            data.price = teste[0] * 100

        }


        try {
            //entrega
            const response = await api.post('pratos', data)
            alert(" Cadastro feito")
            this.listar()

        } catch (err) {

        }
    }
    async delete(id) {

        const data = {}
        data.id = id

        try {
            //entrega
            const response = await api.post('deletaprato', data)
            alert("prato excluido")
            this.listar()
        } catch (err) {

        }
    }
    async listar() {
        this.setState({ opcao: 2 })
        const id = sessionStorage.getItem('restauranteid')

        try {
            //entrega
            let response = await api.get('establishment/produtos/' + id)

            this.setState({
                pratos: response.data
            })
            for (let x = 0; x < this.state.pratos.length; x++) {
                this.state.arr[x] = false

            }
            console.log(this.state.pratos)
            console.log(this.state.arr)

        } catch (err) {

        }


    }
    formatarMoeda() {

        var elemento = document.getElementById('valor');
        var valor = elemento.value;

        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");

        // if (valor.length > 6) {
        //   valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        // //   valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        // }


        elemento.value = valor;
    }

}





