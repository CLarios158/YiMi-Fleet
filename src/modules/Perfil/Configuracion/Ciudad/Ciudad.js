import { Container, Content, Grid, Col, Row, Picker, Text, View, Button, H3 } from 'native-base';
import { NetInfo, Dimensions, ActivityIndicator, Alert } from 'react-native';
const { width } = Dimensions.get('window');
import React, { Component } from 'react';
import axios from 'axios';

class Ciudad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: this.props.navigation.getParam('nombre'),
            apellido: this.props.navigation.getParam('apellido'),
            curp: this.props.navigation.getParam('curp'),
            telefono: this.props.navigation.getParam('telefono'),
            correo: this.props.navigation.getParam('correo'),
            foto: this.props.navigation.getParam('foto'),
            id_ciudad: this.props.navigation.getParam('id_ciudad'),
            id_usuario: this.props.navigation.getParam('id_usuario'),
            id_tipo_conductor: this.props.navigation.getParam('id_tipo_conductor'),
            array: [], isConnected: true, loading: false
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        axios.get('http://35.203.57.92:3000/CiudadesOnline')
            .then(response => {
                response.data.data.forEach(element => {
                    this.state.array.push({ 'id': element['id_ciudad'], "nombre": element['nombre_ciudad'] });
                    this.setState({
                        array: this.state.array,
                        loading: true
                    });
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    }

    updateCiudad = () => {
        if (this.state.isConnected != false) {
            axios.put('http://35.203.57.92:3000/modificar_usuario', {
                id_usuario: this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido, correo: this.state.correo,
                num_telefono: this.state.telefono, curp: this.state.curp, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor
            })
                .then(response => {
                    Alert.alert(
                        'Aviso',
                        'Se actualizo tu ciudad con éxito!',
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
                            <Row>
                                <Col>
                                    <H3 style={{ marginTop: 20, marginLeft: 6, marginBottom: 10 }}>Seleccione una ciudad</H3>
                                    <View style={{ borderWidth: 1, borderColor: 'lightgray', borderStyle: 'solid', marginLeft: 6, marginRight: 6 }}>
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.id_ciudad}
                                            onValueChange={(itemValue) => this.setState({ id_ciudad: itemValue })}>
                                            {this.state.array.map((item) => {
                                                return (< Picker.Item label={item.nombre} key={item.id} value={item.id} />);
                                            })}
                                        </Picker>
                                    </View>
                                    <Button block onPress={this.updateCiudad} style={{ marginLeft: 20, marginRight: 20, marginTop: 20, backgroundColor: '#ff8834' }}><Text>Confirmar</Text></Button>
                                </Col>
                            </Row>
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

export default Ciudad;