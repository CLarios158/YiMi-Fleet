import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Content, Text, Button, Grid, Col, Row, Icon, ListItem, Left, Right, Body, Card, CardItem, Thumbnail, View} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'
import axios from 'axios';
import {NetInfo, Dimensions} from 'react-native';
const { width } = Dimensions.get('window');



class Perfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
          id_usuario: this.props.navigation.getParam('id_usuario'),
          rol: this.props.navigation.getParam('rol'),
          estatus: '',
          vigencia: '',
          foto: '',
          telefono: '',
          correo: '',
          loading: false,
          isConnected: true
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            axios.post('http://35.203.42.33:3000/VigenciaStatus',{id_usuario:this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estatus: element["estatus"],
                        vigencia: element["vigencia"]
                    });         
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
            axios.post('http://35.203.42.33:3000/consultar_usuario',{id_usuario:this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        nombre: element["nombre_out"],
                        correo: element["correo_out"],
                        telefono: element["telefono_out"],
                        foto: element["fotografia_out"],
                        loading: true
                    });         
                });
                if(this.state.foto == ""){
                    this.setState({foto: "https://www.webespacio.com/wp-content/uploads/2010/12/perfil-facebook.jpg"})
                }else{
                    this.state.foto = this.state.foto 
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        });
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
        this.focusListener.remove();
    }

    configuracion = () =>{
        this.props.navigation.navigate('Configuracion', {id_usuario:this.state.id_usuario, rol: this.state.rol})
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    };
    
    render() {
        if(this.state.loading == true){
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
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col style={{width:'18%'}}>
                                                    <Thumbnail source= {this.state.foto ? {uri: this.state.foto} : null} style={{height:55, width:55,  borderRadius:50}} />
                                                </Col>
                                                <Col style={{width:'40%'}}>
                                                    <Text style={{fontWeight:'bold', marginLeft:12, fontSize:16, paddingTop:15}}>{this.state.nombre}</Text>
                                                </Col>                                                    
                                                <Col style={{width:'30%'}}>
                                                    <Text style={{fontSize:14, marginTop:10}}> VIGENCIA{"\n"}{this.state.vigencia}</Text>
                                                </Col>
                                                <Col style={{width:'12%'}}>
                                                    <FontAwesome5 name='question-circle' size={40} style={{color:'#ff8834'}}/>
                                                    <Text style={{fontSize:12}}> Ayuda</Text>
                                                </Col>
                                            </Row>       
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row style={{marginTop:15, marginLeft:20}}>
                            <Col style={{width:73}}>
                                <Text style={{fontWeight:'bold', fontSize:16}}>Correo: </Text>
                            </Col>
                            <Col style={{width:400}}>
                                <Text style={{fontSize:16}}>{this.state.correo}</Text>
                            </Col>
                        </Row>
                        <Row style={{marginTop:15, marginLeft:20}}>
                            <Col style={{width:85}}>
                                <Text style={{fontWeight: 'bold', fontSize:16}}>Teléfono: </Text>
                            </Col>
                            <Col style={{width:200}}>
                                <Text style={{fontSize:16}}>{this.state.telefono}</Text>
                            </Col>
                        </Row>
                        <Row style={{marginTop:50}}>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <FontAwesome5 name='cog' size={30} style={{color:'#ff8834'}}/>
                                                            <Text>  Configuración</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.configuracion} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
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

export default Perfil;
