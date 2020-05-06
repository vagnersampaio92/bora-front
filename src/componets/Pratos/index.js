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
            pratos: []


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
                        photo_url:response.data
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

                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ price: e.target.value }) }} value={this.state.price} label="Preço" />
                                        <h4 style={{ marginTop:10 }}>Foto do prato</h4>
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

                            {this.state.pratos.map(prato => (
                                <Card>


                                    <Img src={prato.photo_url} ></Img>
                                    <div >
                                        <p>Nome:{prato.name}</p>
                                        <p>Descrição:{prato.description}</p>
                                        <p>Preço:R${prato.price / 100}</p>



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





