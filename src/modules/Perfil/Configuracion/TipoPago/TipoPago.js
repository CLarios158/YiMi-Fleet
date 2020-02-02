import { Container, Content, View, Text, Grid, Col, Row, Radio, Button, H3 } from 'native-base';
import { NetInfo, Dimensions, ActivityIndicator, Alert } from 'react-native';
const { width } = Dimensions.get('window');
import React, { Component } from 'react';
import axios from 'axios';

class TipoPago extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre_propietario: this.props.navigation.getParam('nombre_propietario'),
            apellido_propietario: this.props.navigation.getParam('apellido_propietario'),
            clabe: this.props.navigation.getParam('clabe'),
            num_cuenta: this.props.navigation.getParam('num_cuenta'),
            id_usuario: this.props.navigation.getParam('id_usuario'),
            tipo_banco: this.props.navigation.getParam('tipo_banco'),
            tipo_pago: this.props.navigation.getParam('tipo_pago'),
            comision: false, cuota: false, comision_porcentaje: '',
            comision_semanal: '', isConnected: true, loading: false
        };
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        if (this.state.isConnected != false) {
            axios.post('http://35.203.57.92:3003/webservice/comision_fija_plataforma')
                .then(response => {
                    response.data.datos.forEach(element => {
                        this.setState({
                            comision_semanal: element['comision_semanal']
                        });
                    });
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            axios.post('http://35.203.57.92:3003/webservice/comision_porcentaje_plataforma')
                .then(response => {
                    response.data.datos.forEach(element => {
                        this.setState({
                            comision_porcentaje: element['comision_porcentaje'],
                            loading: true
                        });
                    });
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            if (this.state.tipo_pago == 1) {
                this.setState({ comision: true, cuota: false });
            }
            if (this.state.tipo_pago == 2) {
                this.setState({ cuota: true, comision: false });
            }
        }
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    }

    updateCuentaBancaria = () => {
        axios.put('http://35.203.57.92:3000/modificar_cuenta_bancaria', {
            id_rol: 1, id_usuario: this.state.id_usuario, clabe: this.state.clabe, num_cuenta: this.state.num_cuenta, num_tarjeta: "",
            nombre_propietario: this.state.nombre_propietario, apellido_propietario: this.state.apellido_propietario, fecha_vencimiento: "", ccv: "",
            tipo_pago: this.state.tipo_pago, id_banco: this.state.tipo_banco
        })
            .then(response => {
                Alert.alert(
                    'Aviso',
                    'Se ha actualizo el tipo de pago con éxito!',
                    [
                        { text: 'OK' }
                    ]
                );
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    onClickRadio1 = () => {
        if (this.state.comision == true) {
            this.setState({ comision: false });
        } else {
            this.setState({ comision: true, cuota: false, tipo_pago: 1 });
        }
    }

    onClickRadio2 = () => {
        if (this.state.cuota == true) {
            this.setState({ cuota: false });
        } else {
            this.setState({ cuota: true, comision: false, tipo_pago: 2 });
        }
    }

    render() {
        if (this.state.loading == true) {
            return (
                <Container>
                    <Content>
                        <Grid>
                            <Row>
                                {!this.state.isConnected
                                    ? <View style={{ backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'relative', margin: 0 }}>
                                        <Text style={{ color: '#fff' }}>Verifique su conexión e intente nuevamente</Text>
                                    </View>
                                    : <View></View>
                                }
                            </Row>
                            <Row><Col style={{ marginLeft: 20, marginTop: 20 }}><H3>Seleccione nuevo tipo de pago</H3></Col></Row>
                            <Row>
                                <Col style={{ marginLeft: 20, marginTop: 20, width: 25 }}>
                                    <Radio onPress={this.onClickRadio1} selected={this.state.comision} />
                                </Col>
                                <Col style={{ marginTop: 20 }}>
                                    <Text>% de comisión</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ marginLeft: 20 }}>
                                    <Text style={{ textAlign: 'justify' }}>Su porcentaje de pago de comisión por uso de la plataforma de software sera de {this.state.comision_porcentaje}%.</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ marginLeft: 20, marginTop: 25, width: 25 }}>
                                    <Radio onPress={this.onClickRadio2} selected={this.state.cuota} />
                                </Col>
                                <Col style={{ marginTop: 25 }}>
                                    <Text>Cuota fija</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ marginLeft: 20 }}>
                                    <Text style={{ textAlign: 'justify' }}>Su porcentaje de pago por uso de la plataforma de software sera de ${this.state.comision_semanal} MXN semanales.</Text>
                                </Col>
                            </Row>
                            <Row><Col><Button onPress={this.updateCuentaBancaria} block dark style={{ marginLeft: 20, marginRight: 20, marginTop: 50, backgroundColor: '#ff8834' }}><Text>Confirmar</Text></Button></Col></Row>
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

export default TipoPago;