import { Container, Content, Text, Grid, Col, Row, Radio, Button, Icon, Input, Card, CardItem, Body, Thumbnail } from 'native-base';
import { ActivityIndicator, View, NetInfo, Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal, { ModalContent } from 'react-native-modals';
import { FontAwesome5 } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
const { width } = Dimensions.get('window');
import React, { Component } from 'react';
import axios from 'axios';

class DocumentoSCM extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            id_usuario: this.props.navigation.getParam('id_usuario'),
            nombre: this.props.navigation.getParam('nombre'),
            foto: this.props.navigation.getParam('foto'),
            fisica: true, moral: false, tipo_rfc: null, estado_rfc: '', estado_csd: '',
            estado_identificacion: '', comentario_identificacion: '', archivo_identificacion: '',
            estado_licencia: '', comentario_licencia: '', archivo_licencia: '',
            estado_foto: '', comentario_foto: '', archivo_foto: '',
            estado_publico: '', comentario_publico: '', archivo_publico: '',
            estado_privado: '', comentario_privado: '', archivo_privado: '',
            estado_carta: '', comentario_carta: '', archivo_carta: '',
            estado_comprobante: '', comentario_comprobante: '', archivo_comprobante: '',
            estado_pruebat: '', comentario_prueba: '', archivo_prueba: '',
            rfc: '', csd: '', loading: false, isConnected: true, modalVisible: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        this.focusListener = this.props.navigation.addListener('willFocus', () => {
            if (this.state.isConnected != false) {
                if (this._isMounted) {
                    axios.post('http://35.203.57.92:3000/consultar_doc4', { id_usuario: this.state.id_usuario })
                        .then(response => {
                            response.data.data.forEach(element => {
                                this.setState({
                                    rfc: element["archivo_out"],
                                    tipo_rfc: element["tipo_rfc_out"],
                                    estado_rfc: element["estado_out"]
                                });
                            });
                            if (this.state.tipo_rfc == 1) {
                                this.setState({ fisica: true, moral: false });
                            } else if (this.state.tipo_rfc == 2) {
                                this.setState({ fisica: false, moral: true });
                            }
                        });
                    axios.post('http://35.203.57.92:3000/consultar_doc7', { id_usuario: this.state.id_usuario })
                        .then(response => {
                            response.data.data.forEach(element => {
                                this.setState({
                                    csd: element["archivo_out"],
                                    estado_csd: element["estado_out"]
                                });
                            });
                        });
                    axios.post('http://35.203.57.92:3000/consultar_doc1', { id_usuario: this.state.id_usuario })
                        .then(response => {
                            response.data.data.forEach(element => {
                                this.setState({
                                    estado_identificacion: element["estado_out"],
                                    comentario_identificacion: element["comentario_out"],
                                    archivo_identificacion: element["archivo_out"]
                                });
                            });
                        });
                    axios.post('http://35.203.57.92:3000/consultar_doc2', { id_usuario: this.state.id_usuario })
                        .then(response => {
                            response.data.data.forEach(element => {
                                this.setState({
                                    estado_licencia: element["estado_out"],
                                    comentario_licencia: element["comentario_out"],
                                    archivo_licencia: element["archivo_out"]
                                });
                            });
                        });
                    axios.post('http://35.203.57.92:3000/consultar_doc3', { id_usuario: this.state.id_usuario })
                        .then(response => {
                            response.data.data.forEach(element => {
                                this.setState({
                                    estado_foto: element["estado_out"],
                                    comentario_foto: element["comentario_out"],
                                    archivo_foto: element["archivo_out"]
                                });
                            });
                        });
                    axios.post('http://35.203.57.92:3000/consultar_doc5', { id_usuario: this.state.id_usuario })
                        .then(response => {
                            response.data.data.forEach(element => {
                                this.setState({
                                    estado_publico: element["estado_out"],
                                    comentario_publico: element["comentario_out"],
                                    archivo_publico: element["archivo_out"]
                                });
                            });
                        });
                    axios.post('http://35.203.57.92:3000/consultar_doc6', { id_usuario: this.state.id_usuario })
                        .then(response => {
                            response.data.data.forEach(element => {
                                this.setState({
                                    estado_privado: element["estado_out"],
                                    comentario_privado: element["comentario_out"],
                                    archivo_privado: element["archivo_out"]
                                });
                            });
                        });
                    axios.post('http://35.203.57.92:3000/consultar_doc8', { id_usuario: this.state.id_usuario })
                        .then(response => {
                            response.data.data.forEach(element => {
                                this.setState({
                                    estado_carta: element["estado_out"],
                                    comentario_carta: element["comentario_out"],
                                    archivo_carta: element["archivo_out"]
                                });
                            });
                        });
                    axios.post('http://35.203.57.92:3000/consultar_doc9', { id_usuario: this.state.id_usuario })
                        .then(response => {
                            response.data.data.forEach(element => {
                                this.setState({
                                    estado_comprobante: element["estado_out"],
                                    comentario_comprobante: element["comentario_out"],
                                    archivo_comprobante: element["archivo_out"]
                                });
                            });
                        });
                    axios.post('http://35.203.57.92:3000/consultar_doc10', { id_usuario: this.state.id_usuario })
                        .then(response => {
                            response.data.data.forEach(element => {
                                this.setState({
                                    estado_pruebat: element["estado_out"],
                                    comentario_prueba: element["comentario_out"],
                                    archivo_prueba: element["archivo_out"],
                                    loading: true
                                });
                            });
                        });
                }
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.focusListener.remove();
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    }

    IdentificacionOficial = () => {
        if (this.state.isConnected != false) {
            this.setState({ loading: false })
            this.props.navigation.navigate('IdentificacionOficialSCM', { id_usuario: this.state.id_usuario, comentario: this.state.comentario_identificacion, archivo: this.state.archivo_identificacion });
        }

    }

    LicenciaConducir = () => {
        if (this.state.isConnected != false) {
            this.setState({ loading: false })
            this.props.navigation.navigate('LicenciaConducirSCM', { id_usuario: this.state.id_usuario, comentario: this.state.comentario_licencia, archivo: this.state.archivo_licencia });
        }
    }

    CartaAntecedentes = () => {
        if (this.state.isConnected != false) {
            this.setState({ loading: false })
            this.props.navigation.navigate('CartaAntecedentesPenalesSCM', { id_usuario: this.state.id_usuario, comentario: this.state.comentario_carta, archivo: this.state.archivo_carta });
        }
    }

    ComprobanteDomicilio = () => {
        if (this.state.isConnected != false) {
            this.setState({ loading: false })
            this.props.navigation.navigate('ComprobanteDomicilioSCM', { id_usuario: this.state.id_usuario, comentario: this.state.comentario_comprobante, archivo: this.state.archivo_comprobante });
        }
    }

    PruebaToxicologica = () => {
        if (this.state.isConnected != false) {
            this.setState({ loading: false })
            this.props.navigation.navigate('PruebaToxicologicaSCM', { id_usuario: this.state.id_usuario, comentario: this.state.comentario_prueba, archivo: this.state.archivo_prueba });
        }
    }

    FotoPerfil = () => {
        if (this.state.isConnected != false) {
            this.setState({ modalVisible: false });
            this.props.navigation.navigate('FotoPerfilSCM', { id_usuario: this.state.id_usuario, comentario: this.state.comentario_foto, archivo: this.state.archivo_foto });
        }
    }

    ArchivoPublico = () => {
        if (this.state.isConnected != false) {
            this.setState({ loading: false })
            this.props.navigation.navigate('ArchivoPublicoSCM', { id_usuario: this.state.id_usuario, comentario: this.state.comentario_publico, archivo: this.state.archivo_publico })
        }
    }

    ArchivoPrivado = () => {
        if (this.state.isConnected != false) {
            this.setState({ loading: false })
            this.props.navigation.navigate('ArchivoPrivadoSCM', { id_usuario: this.state.id_usuario, comentario: this.state.comentario_privado, archivo: this.state.archivo_privado })
        }
    }

    onClickRadio1 = () => {
        if (this.state.fisica == true) {
            this.setState({ fisica: false });
        } else {
            this.setState({ fisica: true, moral: false, tipo_rfc: 1 });
        }
    }

    onClickRadio2 = () => {
        if (this.state.moral == true) {
            this.setState({ moral: false });
        } else {
            this.setState({ moral: true, fisica: false, tipo_rfc: 2 });
        }
    }

    UpdateRFC = () => {
        if (this.state.isConnected != false) {
            axios.put('http://35.203.57.92:3000/modificar_documento', { id_usuario: this.state.id_usuario, archivo: this.state.rfc, id_cat_documento: 4, tipo_rfc: this.state.tipo_rfc })
                .then(response => {
                    console.log('Modifico RFC');
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
    }

    UpdateCSD = () => {
        if (this.state.isConnected != false) {
            axios.put('http://35.203.57.92:3000/modificar_documento', { id_usuario: this.state.id_usuario, archivo: this.state.csd, id_cat_documento: 7, tipo_rfc: null })
                .then(response => {
                    console.log('Modifico CSD');
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
    }

    onValidateInput = () => {
        //var validateRFC = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
        var validateRFC = /^[a-zA-Z]{3,4}(\d{6})((\D|\d){2,3})?$/;
        var validateCSD = /^[a-z0-9]{8}$/;

        if (this.state.rfc.trim() == "") {
            this.setState(() => ({ errorRFC: "Ingresa tu RFC" }));
        } else if (!validateRFC.test(this.state.rfc.toUpperCase())) {
            this.setState(() => ({ errorRFC: "RFC Incorrecto" }));
        } else if (this.state.estado_rfc == 0) {
            this.setState(() => ({ errorRFC: "" }));
            this.UpdateRFC();
        }


        if (this.state.csd.trim() == "") {
            this.setState(() => ({ errorCSD: "Ingresa tu constraseña csd" }));
        } else if (!validateCSD.test(this.state.csd)) {
            this.setState(() => ({ errorCSD: "CSD Incorrecto" }));
        } else if (this.state.estado_csd == 0) {
            this.setState(() => ({ errorCSD: "" }));
            this.UpdateCSD();
        }

        if (this.state.rfc.trim() != "" && validateRFC.test(this.state.rfc.toUpperCase()) && this.state.estado_rfc == 0 &&
            this.state.csd.trim() != "" && validateCSD.test(this.state.csd) && this.state.estado_csd == 0) {
            Alert.alert(
                'Aviso',
                'Tus nuevos documentos han sido enviados para su validación, se te notificará cuando esto haya sucecido.',
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate('Configuracion') },
                ]
            );
        }
    }

    render() {
        if (this.state.loading == true) {
            return (
                <Container>
                    <Content>
                        <Grid>
                            <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={50} behavior="position" enabled>
                                <Row>
                                    {!this.state.isConnected
                                        ? <View style={{ backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'relative', margin: 0 }}>
                                            <Text style={{ color: '#fff' }}>Verifique su conexión e intente nuevamente</Text>
                                        </View>
                                        : <View></View>
                                    }
                                </Row>
                                <Row>
                                    <Col>
                                        <Card>
                                            <CardItem>
                                                <Body>
                                                    <Row>
                                                        <Col style={{ width: '18%' }}>
                                                            <View style={{ position: 'absolute' }}>
                                                                <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                                                                    <Thumbnail source={this.state.foto ? { uri: this.state.foto } : null} style={{ height: 65, width: 65, borderRadius: 50 }} />
                                                                </TouchableOpacity>
                                                            </View>
                                                            <Modal visible={this.state.modalVisible} onTouchOutside={() => { this.setState({ modalVisible: false }); }}>
                                                                <ModalContent style={{ height: 300, width: 320 }}>
                                                                    <Grid>
                                                                        <Row style={{ height: 50 }}>
                                                                            <Col style={{ width: '10%' }}><Button transparent onPress={() => this.setState({ modalVisible: false })} style={{ width: 30, height: 25 }}><FontAwesome5 name='chevron-left' size={15} /></Button></Col>
                                                                            <Col style={{ width: '90%', display: 'flex', alignItems: 'center' }}><Text style={{ fontSize: 18, fontWeight: 'bold' }}>Fotografía de Perfil</Text></Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col style={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
                                                                                <TouchableOpacity onPressIn={this.FotoPerfil}>
                                                                                    <Thumbnail source={this.state.foto ? { uri: this.state.foto } : null} style={{ height: 150, width: 150, borderRadius: 100 }} />
                                                                                    <FontAwesome5 name='sync-alt' size={20} style={{ position: 'absolute', marginTop: 110, marginLeft: 65 }} />
                                                                                </TouchableOpacity>
                                                                            </Col>
                                                                        </Row>
                                                                    </Grid>
                                                                </ModalContent>
                                                            </Modal>

                                                        </Col>
                                                        <Col style={{ width: '70%' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 18, paddingTop: 19, paddingLeft: 5 }}>{this.state.nombre}</Text>
                                                        </Col>
                                                        <Col style={{ width: '12%', marginTop: 5 }}>
                                                            <FontAwesome5 name='question-circle' size={40} style={{ color: '#ff8834' }} />
                                                            <Text style={{ fontSize: 12 }}> Ayuda</Text>
                                                        </Col>
                                                    </Row>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ width: '75%', marginTop: 8, marginLeft: 12 }}>
                                        <Text>Identificación oficial (IFE/INE/Pasaporte)</Text>
                                    </Col>
                                    <Col style={{ width: '10%', marginTop: 11 }}>
                                        {this.state.estado_identificacion == 0
                                            ? <FontAwesome5 name='exclamation-circle' size={15} color="#f4d03f" />
                                            : this.state.estado_identificacion == 1
                                                ? <FontAwesome5 name='times-circle' size={15} color="red" />
                                                : <FontAwesome5 name='check-circle' size={15} color="green" />
                                        }
                                    </Col>
                                    <Col style={{ width: '14%' }}>
                                        <Button onPress={this.IdentificacionOficial} transparent style={{ height: 40 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ width: '75%', marginTop: 8, marginLeft: 12 }}>
                                        <Text>Licencia de Conducir</Text>
                                    </Col>
                                    <Col style={{ width: '10%', marginTop: 11 }}>
                                        {this.state.estado_licencia == 0
                                            ? <FontAwesome5 name='exclamation-circle' size={15} color="#f4d03f" />
                                            : this.state.estado_licencia == 1
                                                ? <FontAwesome5 name='times-circle' size={15} color="red" />
                                                : <FontAwesome5 name='check-circle' size={15} color="green" />
                                        }
                                    </Col>
                                    <Col style={{ width: '14%' }}>
                                        <Button onPress={this.LicenciaConducir} transparent style={{ height: 40 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ width: '75%', marginTop: 8, marginLeft: 12 }}>
                                        <Text>Carta de Antecedentes Penales</Text>
                                    </Col>
                                    <Col style={{ width: '10%', marginTop: 11 }}>
                                        {this.state.estado_carta == 0
                                            ? <FontAwesome5 name='exclamation-circle' size={15} color="#f4d03f" />
                                            : this.state.estado_carta == 1
                                                ? <FontAwesome5 name='times-circle' size={15} color="red" />
                                                : <FontAwesome5 name='check-circle' size={15} color="green" />
                                        }
                                    </Col>
                                    <Col style={{ width: '14%' }}>
                                        <Button onPress={this.CartaAntecedentes} transparent style={{ height: 40 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ width: '75%', marginTop: 8, marginLeft: 12 }}>
                                        <Text>Comprobante de Domicilio</Text>
                                    </Col>
                                    <Col style={{ width: '10%', marginTop: 11 }}>
                                        {this.state.estado_comprobante == 0
                                            ? <FontAwesome5 name='exclamation-circle' size={15} color="#f4d03f" />
                                            : this.state.estado_comprobante == 1
                                                ? <FontAwesome5 name='times-circle' size={15} color="red" />
                                                : <FontAwesome5 name='check-circle' size={15} color="green" />
                                        }
                                    </Col>
                                    <Col style={{ width: '14%' }}>
                                        <Button onPress={this.ComprobanteDomicilio} transparent style={{ height: 40 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ width: '75%', marginTop: 8, marginLeft: 12 }}>
                                        <Text>Prueba Toxilógica 3 elementos</Text>
                                    </Col>
                                    <Col style={{ width: '10%', marginTop: 11 }}>
                                        {this.state.estado_pruebat == 0
                                            ? <FontAwesome5 name='exclamation-circle' size={15} color="#f4d03f" />
                                            : this.state.estado_pruebat == 1
                                                ? <FontAwesome5 name='times-circle' size={15} color="red" />
                                                : <FontAwesome5 name='check-circle' size={15} color="green" />
                                        }
                                    </Col>
                                    <Col style={{ width: '14%' }}>
                                        <Button onPress={this.PruebaToxicologica} transparent style={{ height: 40 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 20 }}><Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text>Datos Fiscales</Text></Col></Row>
                                <Row style={{ marginTop: 10 }}>
                                    <Col style={{ width: 150, marginLeft: 20, marginRight: 10 }}>
                                        <Input value={this.state.rfc} onChangeText={rfc => this.setState({ rfc })} placeholder='RFC' maxLength={13} style={{ borderBottomWidth: 0.5, fontSize: 14 }} ></Input>
                                    </Col>
                                    <Col style={{ width: 30, marginTop: 20 }}>
                                        <Radio onPress={this.onClickRadio1} selected={this.state.fisica} />
                                    </Col>
                                    <Col style={{ marginTop: 20 }}>
                                        <Text>Fisica</Text>
                                    </Col>
                                    <Col style={{ width: 30, marginTop: 20 }}>
                                        <Radio onPress={this.onClickRadio2} selected={this.state.moral} />
                                    </Col>
                                    <Col style={{ marginTop: 20 }}>
                                        <Text>Moral</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ marginLeft: 20 }}>
                                        {!!this.state.errorRFC && (
                                            <Text style={{ color: "red", fontSize: 11 }}>{this.state.errorRFC}</Text>
                                        )}
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 20 }}>
                                    <Col style={{ width: '75%', marginTop: 8, marginLeft: 12 }}>
                                        <Text>Archivo de certificado público (.cer)</Text>
                                    </Col>
                                    <Col style={{ width: '10%', marginTop: 11 }}>
                                        {this.state.estado_publico == 0
                                            ? <FontAwesome5 name='exclamation-circle' size={15} color="#f4d03f" />
                                            : this.state.estado_publico == 1
                                                ? <FontAwesome5 name='times-circle' size={15} color="red" />
                                                : <FontAwesome5 name='check-circle' size={15} color="green" />
                                        }
                                    </Col>
                                    <Col style={{ width: '14%' }}>
                                        <Button onPress={this.ArchivoPublico} transparent style={{ height: 40 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ width: '75%', marginTop: 8, marginLeft: 12 }}>
                                        <Text>Archivo de certificado privado (.key)</Text>
                                    </Col>
                                    <Col style={{ width: '10%', marginTop: 11 }}>
                                        {this.state.estado_privado == 0
                                            ? <FontAwesome5 name='exclamation-circle' size={15} color="#f4d03f" />
                                            : this.state.estado_privado == 1
                                                ? <FontAwesome5 name='times-circle' size={15} color="red" />
                                                : <FontAwesome5 name='check-circle' size={15} color="green" />
                                        }
                                    </Col>
                                    <Col style={{ width: '14%' }}>
                                        <Button onPress={this.ArchivoPrivado} transparent style={{ height: 40 }}><Icon style={{ color: 'black' }} name="arrow-forward" /></Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ width: 150, marginLeft: 20 }}>
                                        <Input value={this.state.csd} onChangeText={csd => this.setState({ csd })} placeholder='Contraseña CSD' maxLength={8} style={{ borderBottomWidth: 0.5, fontSize: 14 }} ></Input>
                                        {!!this.state.errorCSD && (
                                            <Text style={{ color: "red", fontSize: 11 }}>{this.state.errorCSD}</Text>
                                        )}
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 15 }}>
                                    <Col style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                                        {!!this.state.errorDoc && (
                                            <Text style={{ color: "red", fontSize: 13 }}>{this.state.errorDoc}</Text>
                                        )}
                                    </Col>
                                </Row>
                            </KeyboardAvoidingView>
                            <Row><Col><Button onPress={this.onValidateInput} block style={{ marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 10, backgroundColor: '#ff8834' }}><Text>Guardar</Text></Button></Col></Row>
                        </Grid>
                    </Content>
                </Container>
            );
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                    <ActivityIndicator size={80} color="#ff8834" />
                </View>
            );
        }
    }
}

export default withNavigation(DocumentoSCM);