import React, { Component } from 'react';
import { Container, Content, Text, Input, Button, Grid, Col, Row, H3} from 'native-base';
import {View, NetInfo, Dimensions} from 'react-native';
const { width } = Dimensions.get('window');
import axios from 'axios'

class OlvideContraseña extends Component {
    constructor(props) {
        super(props);
        this.state = {
          telefono: '',
          id_usuario:'',
          isConnected: true
        };
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }
    
    componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    };

    onValidateInput= () =>{
        if(this.state.isConnected == true){
            axios.post('http://35.203.42.33:3000/validar_cuenta',{campo: this.state.telefono})
            .then(response => {
                // handle success
                response.data.data.forEach(element => {
                    this.setState({
                    respuesta: element["respuesta"],
                    id_usuario: element["id_usuario_out"]
                    })  
                });
                if(this.state.telefono.trim() != "" && this.state.respuesta == 1 && this.state.isConnected == true){
                    this.setState(() => ({ nameError: "", telefono: "" }));
                  
                    this.props.navigation.navigate('RestablecerContraseña',{id_usuario: this.state.id_usuario})
                }else{
                    if (this.state.telefono.trim() === "") {
                        this.setState(() => ({ nameError: "Campo obligatorio" }));
                    }else{
                        if(this.state.respuesta == 0){
                            this.setState(() => ({ nameError: "La cuenta no existe" }));
                        }              
                    }
                }
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
                                ?<View style={{backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'absolute', margin:0}}>
                                <Text style={{color: '#fff'}}>Verifique su conexión e intente nuevamente</Text>
                                </View> 
                                :<View></View>
                            }
                        </Row>
                        <Row style={{marginTop:26}}>
                            <Col style={{display:'flex',alignContent: 'center', alignItems: 'center'}}>
                                <H3>Recuperación de la cuenta</H3>
                            </Col> 
                        </Row>
                        <Row style={{marginTop:20, marginBottom:20}}>
                            <Col style={{marginLeft:12}}>
                                <Text style={{fontSize:15, textAlign:'left'}}>Ingresa tú número de télefono o correo de electrónico de recuperación.</Text>
                            </Col> 
                        </Row>
                        <Row>
                            <Col style={{display:'flex',alignContent: 'center', alignItems: 'center'}}>
                                <Input value={this.state.telefono} onChangeText={telefono => this.setState({ telefono })}  style = {{borderBottomWidth: 0.5, textAlign :'center', width:260}} placeholder='Teléfono o Correo Electrónico'/>
                            </Col> 
                        </Row>
                        <Row>
                            <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginBottom:5}}>
                            {!!this.state.nameError && (
                                <Text style={{ color: "red", fontSize:11}}>{this.state.nameError}</Text>
                            )}
                            </Col>
                        </Row>
                        <Row style={{marginTop:40}}>
                            <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85}}>
                                <Button onPress={this.onValidateInput} block style={{backgroundColor:'#ff8834'}}><Text> Siguiente </Text></Button>
                            </Col>
                        </Row>
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default OlvideContraseña;