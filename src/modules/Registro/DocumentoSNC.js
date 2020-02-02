import React, { Component } from 'react';
import { Container, View, Content, Text, Grid, Col, Row, Radio, Button, Icon, Input, H3} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import axios from 'axios';
import {NetInfo, Dimensions, AsyncStorage, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
const { width } = Dimensions.get('window');

class DocumentoSNC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_usuario: this.props.navigation.getParam('id_usuario'),
            telefono: this.props.navigation.getParam('telefono'),
            pass: this.props.navigation.getParam('pass'),
            estado_identificacion: null, archivo_identificacion: '',
            estado_publico: null, estado_privado: null,
            estado_comprobante: null, archivo_comprobante: '',
            estado_rfc: null,  estado_csd: null, fisica: true,
            moral: false, estado_foto: null, archivo_perfil: '',
            tipo_rfc: 1, rfc: '', csd:'', isConnected:true, loading: false
        };
    }

    SaveStatus = async () => {
        let complete = '1';
        try {
    
          await AsyncStorage.setItem('completeDocs', complete);
    
        } catch (error) {
          // Error saving data
          console.log(error);
        }
    };

    componentDidMount(){
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            axios.post('http://35.203.57.92:3000/consultar_doc4',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_rfc: element["estado_out"],
                        rfc: element["archivo_out"],
                        tipo_rfc: element["tipo_rfc_out"]
                    });   
                    if(this.state.tipo_rfc == 1){
                        this.setState({fisica:true, moral: false});
                    }else if(this.state.tipo_rfc == 2){
                        this.setState({fisica:false, moral:true});
                    }     
                });
            });            
            axios.post('http://35.203.57.92:3000/consultar_doc7',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_csd: element["estado_out"],
                        csd: element["archivo_out"],
                    });        
                });
            }); 
            axios.post('http://35.203.57.92:3000/consultar_doc1',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_identificacion: element["estado_out"],
                        archivo_identificacion: element["archivo_out"]
                    });        
                });
            });
            axios.post('http://35.203.57.92:3000/consultar_doc3',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_foto: element["estado_out"],
                        archivo_perfil: element["archivo_out"]
                    });        
                });
            });            
            axios.post('http://35.203.57.92:3000/consultar_doc5',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_publico: element["estado_out"],
                        archivo_publico: element["archivo_out"]
                    });        
                });
            });
            axios.post('http://35.203.57.92:3000/consultar_doc6',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_privado: element["estado_out"],
                        archivo_privado: element["archivo_out"]
                    });        
                });
            });   
            axios.post('http://35.203.57.92:3000/consultar_doc9',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_comprobante: element["estado_out"],
                        archivo_comprobante: element["archivo_out"]
                    });        
                });
            });
            this.setState({loading: true});
        })
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
        this.focusListener.remove();
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    };

    IdentificacionOficial = () => {
        this.props.navigation.navigate('IdentificacionOficialSNC', {id_usuario: this.state.id_usuario, estado: this.state.estado_identificacion, foto: this.state.archivo_identificacion});
    }

    FotoPerfil = () => {
        this.props.navigation.navigate('FotoPerfilSNC', {id_usuario: this.state.id_usuario, estado: this.state.estado_foto, foto: this.state.archivo_perfil});
    }

    ComprobanteDomicilio = () => {
        this.props.navigation.navigate('ComprobanteDomicilioSNC', {id_usuario: this.state.id_usuario, estado: this.state.estado_comprobante, foto: this.state.archivo_comprobante});
    }

    ArchivoPublico = () => {
        this.props.navigation.navigate('ArchivoPublicoSNC', {id_usuario: this.state.id_usuario, estado: this.state.estado_publico});
    }

    ArchivoPrivado = () => {
        this.props.navigation.navigate('ArchivoPrivadoSNC', {id_usuario: this.state.id_usuario, estado: this.state.estado_privado});
    }

    CargarDocumentoRFC = () => {

        if(this.state.isConnected == true){
            
            axios.post('http://35.203.57.92:3000/registrar_documento',{archivo: this.state.rfc, id_usuario: this.state.id_usuario, id_cat_documento: 4, tipo_rfc: this.state.tipo_rfc})
            .then(response => {
                // handle success
                console.log('Cargo RFC');
                this.setState({estado_rfc: 1});
            })
            .catch(function (error) {
                // handle erro
                console.log(error);
            })
        }
    }

    CargarDocumentoCSD = () => {

        if(this.state.isConnected == true){
        
            axios.post('http://35.203.57.92:3000/registrar_documento',{archivo: this.state.csd, id_usuario: this.state.id_usuario, id_cat_documento: 7, tipo_rfc: null})
            .then(response => {
                // handle success
                console.log('Cargo Contraseña CSD');
                this.setState({estado_csd: 1});
            })
            .catch(function (error) {
                // handle erro
                console.log(error);
            })
        }
    }

    UpdateRFC = () =>{
        axios.put('http://35.203.57.92:3000/modificar_documento',{id_usuario: this.state.id_usuario, archivo: this.state.rfc, id_cat_documento: 4, tipo_rfc: this.state.tipo_rfc})
        .then(response => {
            console.log('Modifico RFC');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    UpdateCSD = () =>{
        axios.put('http://35.203.57.92:3000/modificar_documento',{id_usuario: this.state.id_usuario, archivo: this.state.csd, id_cat_documento: 7, tipo_rfc: null})
        .then(response => {
            console.log('Modifico CSD');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }
    
    onClickRadio1 = () => {
        if(this.state.fisica == true){
          this.setState({ fisica: false});
        }else{
          this.setState({ fisica: true, moral:false, tipo_rfc: 1  });
        }
    }
    
    onClickRadio2 = () => {
        if(this.state.moral == true){
            this.setState({ moral: false });
        }else{
            this.setState({ moral: true, fisica:false, tipo_rfc: 2 });
        }
    }

    onValidateInput = () => {
        var validateRFC = /^[a-zA-Z]{3,4}(\d{6})((\D|\d){2,3})?$/;
        var validateCSD = /^[a-z0-9]{8}$/;
        
        if(this.state.rfc.trim() == ""){
            this.setState(() => ({ errorRFC: "Ingresa tu RFC" }));
        }else if(!validateRFC.test(this.state.rfc.toUpperCase())){
            this.setState(() => ({ errorRFC: "RFC Incorrecto" }));
        }else if(this.state.estado_rfc == null){
            console.log('Insert RFC')
            this.setState(() => ({ errorRFC: "" }));
            this.CargarDocumentoRFC();
        }else if(this.state.estado_rfc == 0){
            console.log('Update RFC')
            this.setState(() => ({ errorRFC: "" }));
            this.UpdateRFC();
        }


        if(this.state.csd.trim() == ""){
            this.setState(() => ({ errorCSD: "Ingresa tu constraseña csd" }));
        }else if(!validateCSD.test(this.state.csd)){
            this.setState(() => ({ errorCSD: "CSD Incorrecto" }));
        }else if(this.state.estado_csd == null){
            console.log('Insert CSD')
            this.setState(() => ({ errorCSD: "" }));
            this.CargarDocumentoCSD();
        }else if(this.state.estado_csd == 0){
            console.log('Update CSD')
            this.setState(() => ({ errorCSD: "" }));
            this.UpdateCSD();
        }


        if(this.state.estado_identificacion == 0 &&
             this.state.estado_foto == 0 &&
             this.state.estado_comprobante == 0 &&
             this.state.estado_publico == 0 &&
             this.state.estado_privado == 0 &&
             this.state.estado_rfc == 0 &&
             this.state.estado_csd  == 0 &&
             this.state.rfc.trim() != "" && 
             this.state.csd.trim() != "" &&
             validateRFC.test(this.state.rfc.toUpperCase()) &&
             validateCSD.test(this.state.csd)){
                this.setState(() => ({ errorRFC: "" }));
                this.setState(() => ({ errorCSD: "" }));
                this.setState(() => ({ errorDoc: "" }));
                this.SaveStatus();
                this.props.navigation.navigate('CuentaBancariaRegistro', {id_usuario: this.state.id_usuario, rol: 3, telefono: this.state.telefono, pass: this.state.pass})
        }else{
            this.setState(() => ({ errorDoc: "Por favor cargue todos los documentos correctamente" }));
        }
    };

    render() {
        if(this.state.loading == true){
            return (
                
                <Container>
                    <Content>
                        <Grid>
                        <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={50} behavior="position" enabled>
                            <Row>            
                                {!this.state.isConnected 
                                    ?<View style={{backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'relative', margin:0}}>
                                    <Text style={{color: '#fff'}}>Verifique su conexión e intente nuevamente</Text>
                                    </View> 
                                    :<View></View>
                                }
                            </Row>
                            <Row style={{marginTop:10, marginBottom:20}}><Col style={{display:'flex', justifyContent:'center', alignItems:'center'}}><H3>Cargue los siguientes documentos</H3></Col></Row>
                            <Row>
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Identificación oficial (IFE/INE/Pasaporte)</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_identificacion == null  
                                        ? <Text style={{fontSize:10}}>Cargar</Text>
                                        : <FontAwesome5 name='file-archive' size={20} color="#ff8834" style={{paddingLeft:10}}/>  
                                    }                                  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.IdentificacionOficial} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Comprobante de Domicilio</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_comprobante == null 
                                        ? <Text style={{fontSize:10}}>Cargar</Text>
                                        : <FontAwesome5 name='file-archive' size={20} color="#ff8834" style={{paddingLeft:10}}/>  
                                    }                                  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.ComprobanteDomicilio} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Foto de Perfil</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_foto == null 
                                        ? <Text style={{fontSize:10}}>Cargar</Text>
                                        : <FontAwesome5 name='file-archive' size={20} color="#ff8834" style={{paddingLeft:10}}/>  
                                    }                                  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.FotoPerfil} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>
                            <Row style={{marginTop:20}}><Col style={{display:'flex', justifyContent:'center', alignItems:'center'}}><Text>Datos Fiscales</Text></Col></Row>
                            <Row style={{marginTop:10}}>
                                <Col style={{width:150, marginLeft:20, marginRight:10}}>
                                    <Input value={this.state.rfc} onChangeText={rfc => this.setState({ rfc })} placeholder='RFC' maxLength={13} style={{borderBottomWidth: 0.5, fontSize:12}} ></Input>
                                </Col>
                                <Col style={{width:30, marginTop:20}}>
                                    <Radio onPress={this.onClickRadio1} selected={this.state.fisica} />
                                </Col>
                                <Col style={{marginTop:20}}>
                                    <Text>Fisica</Text>
                                </Col>
                                <Col style={{width:30, marginTop:20}}>
                                    <Radio onPress={this.onClickRadio2} selected={this.state.moral} />
                                </Col>
                                <Col style={{marginTop:20}}>
                                    <Text>Moral</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{marginLeft:20}}>
                                    {!!this.state.errorRFC && (
                                        <Text style={{ color: "red", fontSize:11}}>{this.state.errorRFC}</Text>
                                    )}
                                </Col>
                            </Row>
                            <Row style={{marginTop:20}}>
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Archivo de certificado público (.cer)</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_publico == null  
                                        ? <Text style={{fontSize:10}}>Cargar</Text>
                                        : <FontAwesome5 name='file-archive' size={20} color="#ff8834" style={{paddingLeft:10}}/>  
                                    }                                  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.ArchivoPublico} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Archivo de certificado privado (.key)</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_privado == null  
                                        ? <Text style={{fontSize:10}}>Cargar</Text>
                                        : <FontAwesome5 name='file-archive' size={20} color="#ff8834" style={{paddingLeft:10}}/>  
                                    }                                  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.ArchivoPrivado} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width:150, marginLeft:20}}>
                                <Input value={this.state.csd} onChangeText={csd => this.setState({ csd })} placeholder='Contraseña CSD' maxLength={8} style={{borderBottomWidth: 0.5, fontSize:14}} ></Input>
                                    {!!this.state.errorCSD && (
                                        <Text style={{ color: "red", fontSize:11}}>{this.state.errorCSD}</Text>
                                    )}
                                </Col>
                            </Row>
                            <Row style={{marginTop:15}}>
                                <Col style={{display:'flex', alignContent:'center', alignItems:'center'}}>
                                    {!!this.state.errorDoc && (
                                        <Text style={{ color: "red", fontSize:13}}>{this.state.errorDoc}</Text>
                                    )}
                                </Col>
                            </Row>  
                            </KeyboardAvoidingView> 
                            <Row><Col><Button onPress={this.onValidateInput} block style = {{marginLeft: 20, marginRight: 20, marginTop:20, backgroundColor:'#ff8834'}}><Text>Siguiente</Text></Button></Col></Row>
                        </Grid> 
                    </Content>
                </Container>
            );
        }else{
            return(
                <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10}}>
                  <ActivityIndicator size={80} color="#ff8834" />
                </View>
            );
        }
    }
}

export default withNavigation(DocumentoSNC);