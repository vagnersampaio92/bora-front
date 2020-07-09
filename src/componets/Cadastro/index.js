import React, { Component } from 'react'
import { Container, Card, Form, Buttongroup, Img } from "./style"
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';
import api from '../../services/api'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField'
import Upload from '../Upload/index'
import FileList from "../FileList/index";
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Fileum from "../Fileum/index";
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';


import { uniqueId } from "lodash";
import filesize from "filesize";
import { blue } from '@material-ui/core/colors';



export default class Historico extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listarestaurante:[],
            categorias: [],
            cadcategorias: [],
            cadcategoriasid: [],
            value: [],
            salvacategoria: '',
            pagamentos: [],
            pagamentosid: [],
            cartoes: [],
            cad: '',
            cate: '',
            uploadedFiles: [],
            fotos: [],
            restaurante: [],
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
            opcao: 1,
            subres: 1,
            subanu: 1,
            subcat: 1,
            listacategoria: [],
            flag:0,
            flagsubres: 0,
            flagsubanu: 0,
            flagsubcat: 0,

            listaboost:[],
            offer: 0,
            popular: 0,
            free_delivery: 0,
            establishment_id: '',

            banner: '',
            logo: '',
            user_id: '',
            teste1: [1, 2, 3],
            teste2: [1, 2, 3]


        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    async componentDidMount() {
        const response = await api.get("posts");
        const card = await api.get("cartao");


        this.setState({

            uploadedFiles: response.data.map(file => ({
                id: file._id,
                name: file.name,
                readableSize: filesize(file.size),
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
                        fotos: this.state.fotos.concat(response.data)
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
        const lcat = await api.get("categoria")


        if (lcat.data.length > 0) {

            this.setState({
                listacategoria: lcat.data
            })

        }
        const lcat2 = await api.get("listarestaurantes");


                                if (lcat.data.length > 0) {
                                    
                                    this.setState({
                                        listarestaurante: lcat2.data
                                    });
                                    for(let x; x<lcat2.length;x++){
                                        this.state.listarestaurante[x].flag=false
                                    }
                                   
                                    console.log(this.state.listarestaurante)
                           

                                };

        this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
        try {
            //entrega
            const response = await api.get('listarestaurantes')
            const card = await api.get("cartao");
            const cat = await api.get("categoria");

            console.log(response)
            this.setState({
                categorias: cat.data,
                cartoes: card.data,
                restaurante: response.data,


            })
            console.log(this.state.restaurante)

        } catch (err) {


        }
        const data = {}


        // this.setState({

        //     opcao: 1

        // })

        console.log(this.state.entrega)

    }
    handleSelectChange(value) {
        console.log('You have selected: ', value);
        this.setState({ value });
    }

    render() {
        const { uploadedFiles } = this.state;

        return (
            <div>

                <Buttongroup >

                {/* background:'#fa8e40'  */}
                {this.state.flag==0&&
                <Button variant="outlined" style={{ marginBottom: 10, marginRight: 10, borderColor: "#fa8e40",background:'#fa8e40' }} onClick={() => { this.setState({ opcao: 1, flag:0 }) }}>Restaurante</Button>
                }
                  {this.state.flag!=0&&
                  <Button variant="outlined" style={{ marginBottom: 10, marginRight: 10, borderColor: "#fa8e40", }} onClick={() => { this.setState({ opcao: 1, flag:0  }) }}>Restaurante</Button>
                }
                {this.state.flag==1&&
                <Button variant="outlined" style={{ marginBottom: 10, marginRight: 10, borderColor: "#fa8e40", background:'#fa8e40' }} onClick={() => { this.setState({ opcao: 2, flag:1  }) }}>Anúncio</Button>
                }
                  {this.state.flag!=1&&
                  <Button variant="outlined" style={{ marginBottom: 10, marginRight: 10, borderColor: "#fa8e40" }} onClick={() => { this.setState({ opcao: 2, flag:1 }) }}>Anúncio</Button>
                }
                {this.state.flag==2&&
                <Button variant="outlined" style={{ marginBottom: 10, borderColor: "#fa8e40", background:'#fa8e40' }} onClick={() => { this.setState({ opcao: 3, flag:2 }) }}>Categoria</Button>
                }
                  {this.state.flag!=2&&
                  <Button variant="outlined" style={{ marginBottom: 10, borderColor: "#fa8e40" }} onClick={() => { this.setState({ opcao: 3, flag:2 }) }}>Categoria</Button>
                }


                    
                    
                    

                </Buttongroup>


                <Container>
                    {this.state.opcao == 1 &&
                    <div style={{ width:"100%", textAlign: "center" }}>
                         <Buttongroup >
                            {this.state.flagsubres==0&&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40", background:"#fa8e40" }} onClick={() => { this.setState({ subres: 1,flagsubres:0 }) }}>Cadastrar</Button>
                            }
                            {this.state.flagsubres!=0&&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={() => { this.setState({ subres: 1,flagsubres:0 }) }}>Cadastrar</Button>
                            }
                            {this.state.flagsubres==1&&
                             <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40", background:"#fa8e40" }} onClick={async () => {
                                this.setState({ subres: 2,flagsubres:1 }); const lcat = await api.get("listarestaurantes");


                                if (lcat.data.length > 0) {
                                   
                                    
                                    this.setState({
                                        listarestaurante: lcat.data
                                    });

                                };
                            }}>Listar</Button>

                            }
                            {this.state.flagsubres!=1&&
                             <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={async () => {
                                this.setState({ subres: 2,flagsubres:1 }); const lcat = await api.get("listarestaurantes");


                                if (lcat.data.length > 0) {
                                   
                                    this.setState({
                                        listarestaurante: lcat.data
                                    });

                                };
                            }}>Listar</Button>

                            }

                                
                               
                            </Buttongroup>
                            {this.state.subres==1&&
                              <Card style={{ width:"100%", textAlign: "center" }}>
                              
                                  <Form noValidate autoComplete="off">
                                      <div style={{ marginTop: 20, marginBottom: 30, borderColor: "#fa8e40" }}>
                                          <h1>Cadastre o estabelecimento</h1>
                                          <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ name: e.target.value }) }} value={this.state.name} label="Nome" />
                                          <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ email: e.target.value }) }} value={this.state.email} label="Email" />
                                          <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ password: e.target.value }) }} value={this.state.password} label="Senha" />
                                          <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ description: e.target.value }) }} value={this.state.description} label="Descrição" />
                                          <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ porcentagem: e.target.value }) }} value={this.state.porcentagem} label="Taxa" />
                                          <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ min_order_price: e.target.value });this.formatarMoeda() }} id="valor" label="Menor valor do delivery" />
                                          <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ delivery_price: e.target.value });this.formatarMoeda2() }}  id="valor2" label="Valor do delivery" />
                                          <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ min_delivery_minutes: e.target.value }) }} value={this.state.min_delivery_minutes} label="Menor tempo" />
                                          <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ max_delivery_minutes: e.target.value }) }} value={this.state.max_delivery_minutes} label="Tempo máximo" />
                                          {/* <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ banner: e.target.value }) }} value={this.state.banner} label="Banner" /> */}
                                          <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ phone: e.target.value }) }} value={this.state.phone} label="Telefone" />
                                          <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ address: e.target.value }) }} value={this.state.address} label="Endereço" />
                                          {/* <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ logo: e.target.value }) }} value={this.state.logo} label="Logo" /> */}
                                      
                                          <div>
                                              <div><h4>Adicione as categorias:</h4></div>
                                              <div style={{ display: "flex", color: "#0000FF" }}>
                                                  {this.state.cadcategorias.map(menssagem => (
                                                      <p tyle={{ color: blue }}>{menssagem.name},&nbsp;</p>
                                                  ))
                                                  }
                                              </div>
                                              <FormControl>
                                                  <Select onChange={e => { this.setState({ cate: e.target.value }) }} style={{ marginRight: 10, minWidth: 130, marginLeft: 10 }}>
  
  
  
                                                      {this.state.categorias.map(menssagem => (
                                                          <MenuItem value={menssagem.id}> {menssagem.name}</MenuItem>
                                                      ))
                                                      }
  
                                                  </Select>
                                              </FormControl>
                                              <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, borderColor: "#fa8e40" }} onClick={() => { this.addcate() }} style={{ marginTop: 15, }}>Adicionar</Button>
  
                                          </div>
                                          <div>
                                              <div><h4>Adicione as formas de pagamento do estabelecimento:</h4></div>
                                              <div style={{ display: "flex", color: "#0000FF" }}>  {this.state.pagamentos.map(menssagem => (
                                                  <p tyle={{ color: blue }}>{menssagem.name},&nbsp;</p>
                                              ))
                                              }
                                              </div>
  
                                              <div>
  
  
                                                  <FormControl>
                                                      <Select onChange={e => { this.setState({ cad: e.target.value }) }} style={{ marginRight: 10, minWidth: 130, marginLeft: 10 }}>
  
  
  
                                                          {this.state.cartoes.map(menssagem => (
                                                              <MenuItem value={menssagem.id}> {menssagem.name}</MenuItem>
                                                          ))
                                                          }
  
                                                      </Select>
                                                  </FormControl>
                                                  <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, borderColor: "#fa8e40" }} onClick={() => { this.addcard() }} style={{ marginTop: 15, }}>Adicionar</Button>
                                              </div>
                                          </div>
  
  
  
                                          <h4>Logo</h4>
                                          <Upload onUpload={this.handleUpload} />
                                          {!!uploadedFiles[0] && (
                                              <Fileum files={uploadedFiles[0]} onDelete={this.handleDelete} />
                                          )}
                                          <h4>Banner</h4>
                                          <Upload onUpload={this.handleUpload} />
                                          {!!uploadedFiles[1] && (
                                              <Fileum files={uploadedFiles[1]} onDelete={this.handleDelete} />
                                          )}
                                          <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, borderColor: "#fa8e40" }} onClick={() => { this.salvar() }} style={{ marginTop: 15, }}>Cadastrar</Button>
                                      </div>
  
                                  </Form>
                            
  
  
                              {/* <div>
  
                              {this.state.restaurante.map(menssagem => (
                                              <p> {menssagem.name}</p>  
                               ))
                               }
                              </div> */}
  
  
                          </Card>
  
                            }
                            {this.state.subres==2&&
                            <div>
                              
                                {this.state.listarestaurante.map(cat => (
                                    
                                 <div style={{ paddingTop: 10, paddingBottom: 10, borderColor: "#fa8e40", borderTopStyle: "solid", borderTopWidth: 1, textAlign:"left" }}>
                                     <div> <Img src={cat.logo}></Img></div>
                                     <div><Img src={cat.banner} ></Img></div>
                                     <div><b>Nome:</b> {cat.name}</div>
                                     <div><b>Email:</b> {cat.email}</div>
                                     <div><b>Descrição:</b> {cat.description}</div>
                                     <div><b>Nota:</b> {cat.rating}</div>
                                     <div><b>Menor valor do delivery:</b> R${cat.min_order_price/100}</div>
                                     <div><b>Valor do delivery:</b> R${cat.delivery_price/100}</div>
                                     <div><b>Menor tempo do delivery:</b> {cat.min_delivery_minutes}</div>
                                     <div><b>Maior tempo do delivery:</b> {cat.max_delivery_minutes}</div>
                                     <div><b>Telefone:</b> {cat.phone}</div>
                                     <div><b>Telefone:</b> {cat.phone}</div>
                                     <div><b>Taxa do Bora:</b> {cat.porcentagem}%</div>
                                    
                                     
                                    <div><Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={() => { this.deleterestaurante(cat.id) }}>Apagar</Button></div>
      
                                    
                                 </div>



                             ))
                             }
                            </div>
                            }

                    </div>

                      

                    }

                    {this.state.opcao == 2 &&
                        <div>
                            <Buttongroup >
                            {this.state.flagsubanu==0&&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40", background:"#fa8e40" }} onClick={() => { this.setState({ subanu: 1,flagsubanu:0 }) }}>Cadastrar</Button>
                            }
                            {this.state.flagsubanu!=0&&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={() => { this.setState({ subanu: 1,flagsubanu:0 }) }}>Cadastrar</Button>
                            }
                            {this.state.flagsubanu==1&&
                             <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40", background:"#fa8e40" }} onClick={async () => {
                                this.setState({ subanu: 2, flagsubanu:1 }); const lcat = await api.get("establishment/boosts");


                                if (lcat.data.length > 0) {

                                    this.setState({
                                        listaboost: lcat.data
                                    });

                                };
                            }}>Listar</Button>

                            }
                            {this.state.flagsubanu!=1&&
                             <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={async () => {
                                this.setState({ subanu: 2, flagsubanu:1 }); const lcat = await api.get("establishment/boosts");


                                if (lcat.data.length > 0) {

                                    this.setState({
                                        listaboost: lcat.data
                                    });

                                };
                            }}>Listar</Button>

                            }

                                
                               
                            </Buttongroup>


                            {this.state.subanu == 1 &&
                                <Card>

                                    <div>
                                        <Form noValidate autoComplete="off">
                                            <div style={{ marginTop: 20, marginBottom: 30, borderColor: "#fa8e40" }}>
                                                <h1>Cadastre o anúncio</h1>
                                                <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ name: e.target.value }) }} value={this.state.name} label="Nome" />
                                                <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ description: e.target.value }) }} value={this.state.description} label="Descrição" />

                                                <h4 style={{ marginBottom: 10, marginTop: 15 }} >Imagem do banner</h4>
                                                <Upload onUpload={this.handleUpload} />
                                                {!!uploadedFiles.length && (
                                                    <FileList files={uploadedFiles} onDelete={this.handleDelete} />
                                                )}

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
                            {this.state.subanu==2&&
                             <div>
                             {this.state.listaboost.map(cat => (
                                 <div style={{ paddingTop: 10, paddingBottom: 10, borderColor: "#fa8e40", borderTopStyle: "solid", borderTopWidth: 1 }}>
                                     <Img src={cat.banner} ></Img>
                                     <p> {cat.name}</p>
                                        <p>{cat.description}</p>
                                        <DeleteIcon style={{ marginRight: 15, fontSize: 20 }} onClick={() => { this.deleteanuncio(cat.id) }} />
                                 </div>



                             ))
                             }

                         </div>
                            }



                        </div>

                    }
                    {this.state.opcao == 3 &&

                        <div>   <Buttongroup >
                            {this.state.flagsubcat==0&&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40", background:'#fa8e40'}} onClick={() => { this.setState({ subcat: 1, flagsubcat:0 }) }}>Cadastrar</Button>
                            }
                            {this.state.flagsubcat!=0&&
                            <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={() => { this.setState({ subcat: 1, flagsubcat:0  }) }}>Cadastrar</Button>
                            }
                            {this.state.flagsubcat==1&& <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15,background:'#fa8e40', borderColor: "#fa8e40" }} onClick={async () => {
                                this.setState({ subcat: 2,flagsubcat:1 }); const lcat = await api.get("categoria");


                                if (lcat.data.length > 0) {

                                    this.setState({
                                        listacategoria: lcat.data
                                    });

                                };
                            }}>Listar</Button>
                            }
                            {this.state.flagsubcat!=1&&
                             <Button variant="outlined" style={{ marginTop: 20, marginBottom: 20, marginRight: 15, borderColor: "#fa8e40" }} onClick={async () => {
                                this.setState({ subcat: 2,flagsubcat:1 }); const lcat = await api.get("categoria");


                                if (lcat.data.length > 0) {

                                    this.setState({
                                        listacategoria: lcat.data
                                    });

                                };
                            }}>Listar</Button>
                            }



                            
                           

                        </Buttongroup>
                            {this.state.subcat == 1 &&
                                <div>
                                    <Card style={{ marginTop: 20, paddingBottom: 40, borderColor: "#fa8e40" }} >
                                        <h4>Cadastre uma categoria</h4>
                                        <TextField id="standard-basic" style={{ marginRight: 10, minWidth: 130 }} onChange={e => { this.setState({ salvacategoria: e.target.value }) }} value={this.state.salvacategoria} label="Nome" />
                                        <Button variant="outlined" style={{ marginTop: 20, marginBottom: 40, borderColor: "#fa8e40" }} onClick={() => { this.salvarcategoria() }} style={{ marginTop: 15, }}>Cadastrar</Button>
                                    </Card>
                                </div>
                            }
                            {this.state.subcat == 2 &&
                                <div>
                                    {this.state.listacategoria.map(cat => (
                                        <div style={{ paddingTop: 10, paddingBottom: 10, borderColor: "#fa8e40", borderTopStyle: "solid", borderTopWidth: 1 }}>
                                            <p> <DeleteIcon style={{ marginRight: 15, fontSize: 20 }} onClick={() => { this.delete(cat.id) }} />{cat.name}</p>
                                        </div>



                                    ))
                                    }

                                </div>
                            }
                        </div>



                    }

                </Container>



            </div>







        );

    }
    async deleterestaurante(id){
        const data = {}
        data.id = id

        try {
            //entrega
            const response = await api.post('deletares', data)
            alert("Restaurante excluido")
            const lcat = await api.get("listarestaurantes")


            if (lcat.data.length > 0) {

                this.setState({
                    listarestaurante: lcat.data
                })

            }

        } catch (err) {

        }
    }
    async deleteanuncio(id) {

        const data = {}
        data.id = id

        try {
            //entrega
            const response = await api.post('deletaboost', data)
            alert("Anúncio excluido")
            const lcat = await api.get("establishment/boosts")


            if (lcat.data.length > 0) {

                this.setState({
                    listaboost: lcat.data
                })

            }

        } catch (err) {

        }
    }

    async delete(id) {

        const data = {}
        data.id = id

        try {
            //entrega
            const response = await api.post('deletacategoria', data)
            alert("Categoria excluido")
            const lcat = await api.get("categoria")


            if (lcat.data.length > 0) {

                this.setState({
                    listacategoria: lcat.data
                })

            }

        } catch (err) {

        }
    }
    async salvarcategoria() {
        let data = {}
        data.name = this.state.salvacategoria
        try {
            //entrega
            const response = await api.post('/categoria', data)
            alert(" Cadastro feito")
            this.setState({
                salvacategoria:''
                
            })

        } catch (err) {

        }

    }
    async addcate() {
        // cadcategorias: [],
        //     cadcategoriasid: [],
        for (let x = 0; x < this.state.categorias.length; x++) {
            if (this.state.categorias[x].id == this.state.cate) {
                let a = {}
                let b = {}
                a.id = this.state.cate
                b.name = this.state.categorias[x].name



                this.setState({

                    cadcategoriasid: this.state.cadcategoriasid.concat(a),
                    cadcategorias: this.state.cadcategorias.concat(b)


                })





            }
            console.log(this.state.cadcategorias)
        }



    }
    async addcard() {
        // pagamentos: [],
        //     pagamentosid: [],
        for (let x = 0; x < this.state.cartoes.length; x++) {
            if (this.state.cartoes[x].id == this.state.cad) {
                let a = {}
                let b = {}
                a.id = this.state.cad
                b.name = this.state.cartoes[x].name



                this.setState({

                    pagamentosid: this.state.pagamentosid.concat(a),
                    pagamentos: this.state.pagamentos.concat(b)


                })




            }
        }



    }

    async salvar() {

        const data = {}
        data.name = this.state.name
        data.email = this.state.email
        data.password = this.state.password
        data.city_id = 1
        data.description = this.state.description
        data.porcentagem = this.state.porcentagem
        
        let teste=this.state.min_order_price.split(',')
        if(teste.length>1){
            data.min_order_price =teste[0]+teste[1]
        }else{
            data.min_order_price =teste[0]*100
        }
          

          let teste2=this.state.delivery_price.split(',')

          if(teste2.length>1){
            data.delivery_price =teste2[0]+teste2[1]
        }else{
            data.delivery_price =teste2[0]*100
        }
        

        data.avaliacao = 1
        data.min_delivery_minutes = this.state.min_delivery_minutes
        data.max_delivery_minutes = this.state.max_delivery_minutes
        data.status = "close"
        // data.banner = this.state.banner
        data.banner = this.state.fotos[1]
        data.phone = this.state.phone
        data.address = this.state.address
        data.delivery_option = "delivery"
        // data.logo = this.state.logo
        data.logo = this.state.fotos[0]
        data.rating = "5"


        console.log(data)
        try {
            //entrega
            if (this.state.cadcategoriasid.length > 0) {
                const response = await api.post('signup', data)
                alert(" Cadastro feito")
                const data2 = {}

                data2.offer = this.state.offer
                data2.popular = this.state.popular
                data2.free_delivery = this.state.free_delivery
                data2.establishment_id = response.data.id
                console.log(data2)
                // /storeflag
                const response2 = await api.post('storeflag', data2)
                const data3 = {}
                data3.id = response.data.id
                data3.pagamentos = this.state.pagamentosid
                const response3 = await api.post('storecartao', data3)

                const data4 = {}
                data4.user = response.data.id
                data4.categorias = this.state.cadcategoriasid
                const response4 = await api.post('storeassoc', data4)
                window.location.reload(); 
            } else {
                alert("Selecione uma ou mais categorias")
            }

        } catch (err) {

        }
    }
    async salvar2() {
        const data = {}
        data.name = this.state.name
        data.description = this.state.description
        data.banner = this.state.fotos[0]
        // data.logo = this.state.logo
        data.user_id = this.state.ped
        // https://uploadexampleone.s3.amazonaws.com/65fc716368b89cacb63f5235095eb2e5-XCalabresa-Delivery.jpg



        for (let x = 0; x < this.state.restaurante.length; x++) {
            if (this.state.restaurante[x].id == this.state.ped) {
                data.logo = this.state.restaurante[x].logo
            }
        }

        try {
            //entrega
            const response = await api.post('/establishment/boosts', data)
            alert(" Cadastro feito")

        } catch (err) {

        }
    }
    formatarMoeda() {
        
        var elemento = document.getElementById('valor');
        var valor = elemento.value;
        
        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g,''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");
      
        // if (valor.length > 6) {
        //   valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        // //   valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        // }
        
   
        elemento.value = valor;
      }
      formatarMoeda2() {
        
        var elemento = document.getElementById('valor2');
        var valor = elemento.value;
        
        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g,''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");
      
        // if (valor.length > 6) {
        //   valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        // //   valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        // }
        
   
        elemento.value = valor;
      }

}





