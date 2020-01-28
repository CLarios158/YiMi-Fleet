import React, { Component } from 'react';
import { Container, Content, Text, Button,Grid, Col, Row} from 'native-base';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, NetInfo, Dimensions, Alert} from 'react-native';
const { width } = Dimensions.get('window');
class CargarArchivoPrivado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            archivo: this.props.navigation.getParam('archivo'),
            id_usuario: this.props.navigation.getParam('id_usuario'),
            id_cat_documento: this.props.navigation.getParam('id_cat_documento'),
            estado: this.props.navigation.getParam('estado'),
            name: this.props.navigation.getParam('name'),
            isConnected:true
        };
    }

    componentDidMount(){
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    };

    CargarDocumento = () =>{
        if(this.state.isConnected != false){

            axios.put('http://35.203.42.33:3000/modificar_documento',{id_usuario: this.state.id_usuario, archivo: this.state.archivo, id_cat_documento: this.state.id_cat_documento, tipo_rfc: null})
            .then(response => {
                console.log('Modifico .key');
                Alert.alert(
                    'Aviso',
                    'Tu Archivo de Certificado Privado (.key) han sido enviada para su validación, se te notificará cuando esto haya sucecido.',
                    [
                    {text: 'OK', onPress: () => this.props.navigation.navigate('DocumentoSNCM', {id_usuario: this.state.id_usuario})},
                    ]
                );
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            
        }
    }
    
    render() {
        return (
        <Container>
            <Content>
                <Grid>
                    <Row>            
                        {!this.state.isConnected 
                            ?<View style={{backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'relative', margin:0}}>
                            <Text style={{color: '#fff'}}>Verifique su conexión e intente nuevamente</Text>
                            </View> 
                            :<View></View>
                        }
                    </Row>
                    <Row>
                        <Col style={{display:'flex',alignItems:'center',alignContent:'center', marginTop:50}}><FontAwesome5 name='key' size={150} style={{color:'#ff8834'}}/></Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:20, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center', fontWeight:'bold'}}>Archivo adjunto:</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>{this.state.name}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85, marginTop:15}}>
                            <Button onPress={this.CargarDocumento} block style={{backgroundColor:'#ff8834'}}><Text> Cargar </Text></Button>
                        </Col>
                    </Row>
                </Grid> 
            </Content>
        </Container>
        );
    }
}

export default CargarArchivoPrivado;