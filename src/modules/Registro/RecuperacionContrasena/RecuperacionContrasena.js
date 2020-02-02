import { Container, Content, Text, Grid, Col, Row, Button, H3, Input } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert, View, NetInfo, Dimensions} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { Component } from 'react';
const { width } = Dimensions.get('window');
import axios from 'axios';

class RecuperacionContrasena extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_usuario: this.props.navigation.getParam('id_usuario'),
            isConnected: true,
            contrasenanew: '',
            contrasenanew2: '',
            secureTextEntry1: true,
            secureTextEntry2: true
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    }

    updatePassword = () => {
        axios.put('http://35.203.57.92:3000/modificar_contrasena', { id_usuario: this.state.id_usuario, pass: this.state.contrasenanew2 })
            .then(response => {
                Alert.alert(
                    'Aviso',
                    'Se ha actualizado tu contraseña con éxito!',
                    [
                        { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
                    ]
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onValidateInput = () => {
        var validateContrasena = /^(?=\w*\d)(?=\w*[a-zA-Z])\S{6}$/;

        if (this.state.isConnected != false) {

            if (this.state.contrasenanew.trim() == "") {
                this.setState(() => ({ contrasenaError2: "Ingresa tu contraseña" }));
            } else if (!validateContrasena.test(this.state.contrasenanew)) {
                this.setState(() => ({ contrasenaError2: "Formato Incorrecto" }));
            } else {
                this.setState(() => ({ contrasenaError2: "" }));
            }

            if (this.state.contrasenanew2.trim() == "") {
                this.setState(() => ({ contrasenaError3: "Ingresa tu contraseña" }));
            } else if (!validateContrasena.test(this.state.contrasenanew2)) {
                this.setState(() => ({ contrasenaError3: "Formato Incorrecto" }));
            } else {
                this.setState(() => ({ contrasenaError3: "" }));
            }

            if (this.state.contrasenanew != this.state.contrasenanew2 && validateContrasena.test(this.state.contrasenanew) && validateContrasena.test(this.state.contrasenanew2)) {
                this.setState(() => ({ contrasenaError3: "La contraseña nueva no coindice" }));
            }

            if (this.state.contrasenanew.trim() != "" && this.state.contrasenanew2.trim() != ""
                && validateContrasena.test(this.state.contrasenanew) && validateContrasena.test(this.state.contrasenanew2)
                && this.state.contrasenanew == this.state.contrasenanew2) {
                this.setState(() => ({ contrasenaError2: "", contrasenaError3: "" }));
                this.updatePassword();
            }
        }
    }

    onIconPress2 = () => {
        this.setState({
            secureTextEntry2: !this.state.secureTextEntry2
        });
    }

    onIconPress3 = () => {
        this.setState({
            secureTextEntry3: !this.state.secureTextEntry3
        });
    }

    render() {
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
                        <Row style={{ marginTop: 30, marginBottom: 10, marginLeft: 20 }}><H3>Ingrese su nueva contraseña</H3></Row>
                        <Row>
                            <Col style={{ marginLeft: 20, marginRight: 20 }}>
                                <Input value={this.state.contrasenanew} onChangeText={contrasenanew => this.setState({ contrasenanew })} secureTextEntry={this.state.secureTextEntry2} style={{ borderBottomWidth: 0.5 }} placeholder='Contraseña Nueva' />
                            </Col>
                            <Col style={{ marginTop: 20, position: 'absolute', right: 0, marginRight: 40 }}>
                                <TouchableOpacity onPress={this.onIconPress2} style={{ height: 30 }}>
                                    <FontAwesome5 name='eye' size={20} style={{ color: 'gray' }} />
                                </TouchableOpacity>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ marginBottom: 5 }}>
                                {!!this.state.contrasenaError2 && (<Text style={{ color: "red", fontSize: 11, marginLeft: 20 }}>{this.state.contrasenaError2}</Text>)}
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ marginLeft: 20, marginRight: 20 }}>
                                <Input value={this.state.contrasenanew2} onChangeText={contrasenanew2 => this.setState({ contrasenanew2 })} secureTextEntry={this.state.secureTextEntry3} style={{ borderBottomWidth: 0.5 }} placeholder='Confirmar Contraseña Nueva' />
                            </Col>
                            <Col style={{ marginTop: 20, position: 'absolute', right: 0, marginRight: 40 }}>
                                <TouchableOpacity onPress={this.onIconPress3} style={{ height: 30 }}>
                                    <FontAwesome5 name='eye' size={20} style={{ color: 'gray' }} />
                                </TouchableOpacity>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ marginBottom: 5 }}>
                                {!!this.state.contrasenaError3 && (<Text style={{ color: "red", fontSize: 11, marginLeft: 20 }}>{this.state.contrasenaError3}</Text>)}
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 1, marginLeft: 20, marginRight: 20 }}>
                            <Text style={{ fontSize: 12 }}>La nueva contraseña debera tener 6 dígitos e incluir al menos una letra o un número.</Text>
                        </Row>
                        <Row style={{ marginTop: 35 }}><Col><Button onPress={this.onValidateInput} block style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#ff8834' }}><Text>Confirmar</Text></Button></Col></Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default RecuperacionContrasena;