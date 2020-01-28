import { Container, View, Content, Text, Button, Grid, Col, Row, Icon, ListItem, Left, Right, Body, Card, CardItem, Thumbnail} from 'native-base';
import {ActivityIndicator,NetInfo, Dimensions, AsyncStorage, ScrollView} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
import React, { Component } from 'react';
import axios from 'axios';

class Configuracion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_usuario: this.props.navigation.getParam('id_usuario'),
            rol: this.props.navigation.getParam('rol'),
            nombre: '',vapellido: '', curp: '', telefono: '',
            correo: '', foto: '', id_ciudad: '', id_tipo_conductor:'',
            array:[], nombre_propietario: '', apellido_propietario: '',
            num_cuenta: '', clabe: '', tipo_banco: '', tipo_pago: '',
            isConnected: true
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        if(this.state.isConnected != false){
            const { navigation } = this.props;
            this.focusListener = navigation.addListener('didFocus', () => {
                axios.get('http://35.203.42.33:3000/consultar_banco')
                .then(response => {
                    response.data.data.forEach(element => {
                        this.state.array.push({'id': element['id_banco'],"nombre":element['nombre_banco']});   
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
                            apellido: element["apellido_out"], 
                            curp: element["curp_out"],
                            telefono: element["telefono_out"],
                            correo: element["correo_out"],
                            foto: element["fotografia_out"],
                            id_ciudad: element["fk_id_ciudad_out"],
                            id_tipo_conductor: element["fk_id_conductor_out"],
                            loanding: true
                        });         
                    });
                    if(this.state.foto == ""){
                        this.setState({foto: "https://coffschamber.com.au/wp-content/uploads/2019/02/RAY.jpg"})
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
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
        this.focusListener.remove();
    }

    Close = async () =>{

        try {
            await AsyncStorage.removeItem('campo');
            await AsyncStorage.removeItem('passwd');
            this.props.navigation.navigate('Login');
        } catch (error) {
            // Error saving data
            console.log(error);
        }
    }

    correo = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('Correo',{id_usuario:this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp, 
            correo: this.state.correo, telefono: this.state.telefono, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor})  
        }
    }

    contrasena = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('Contrasena',{id_usuario:this.state.id_usuario});
        }
    }

    ciudad = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('Ciudad',{id_usuario:this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp, 
            correo: this.state.correo, telefono: this.state.telefono, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor})           
        }
    }

    telefono = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('Telefono',{id_usuario:this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp, 
            correo: this.state.correo, telefono: this.state.telefono, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor})
        } 
    }

    cuenta = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('CuentaBancaria',{id_usuario:this.state.id_usuario, array: this.state.array});    
            this.setState({array: []}); 
        }  
    }

    pago = () =>{
        if(this.state.isConnected != false){
            axios.post('http://35.203.42.33:3000/consultar_cuenta_bancaria',{id_usuario:this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        nombre_propietario: element["nombre_propietario_out"], 
                        apellido_propietario: element["apellido_propietario_out"], 
                        num_cuenta: element["num_cuenta_out"],
                        clabe: element["clabe_out"],
                        tipo_banco: element["fk_id_banco_out"],
                        tipo_pago: element["tipo_pago_out"]
                    });        
                });
                this.props.navigation.navigate('TipoPago',{id_usuario:this.state.id_usuario,nombre_propietario: this.state.nombre_propietario, apellido_propietario: this.state.apellido_propietario, num_cuenta: this.state.num_cuenta, clabe: this.state.clabe,
                tipo_banco: this.state.tipo_banco, tipo_pago: this.state.tipo_pago})
            })
        }
    }

    documento = () =>{
        if(this.state.isConnected != false){
            if(this.state.rol == 2 || this.state.rol == 1){
                this.props.navigation.navigate('DocumentoSCM', {id_usuario: this.state.id_usuario, nombre: this.state.nombre, foto: this.state.foto});
                //this.props.navigation.navigate('DocumentoSNCM', {id_usuario: this.state.id_usuario, nombre: this.state.nombre});
            }
            if(this.state.rol == 3){
                this.props.navigation.navigate('DocumentoSNCM', {id_usuario: this.state.id_usuario, nombre: this.state.nombre, foto: this.state.foto});
            }
        }
    }

    informacion = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('InformacionPersonal',{id_usuario:this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp, 
            correo: this.state.correo, telefono: this.state.telefono, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor})
        }
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    };

    render() {
        if(this.state.loanding == true){
        return (   
            <Container>
                <ScrollView>
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
                                                <Col style={{width:'70%'}}>
                                                    <Text style={{fontWeight:'bold',fontSize:18, paddingTop:15}}>{this.state.nombre}</Text>
                                                </Col>
                                                <Col style={{width:'12%',marginTop:5}}>
                                                    <FontAwesome5 name='question-circle' size={40} style={{color:'#ff8834'}}/>
                                                    <Text style={{fontSize:12}}> Ayuda</Text>
                                                </Col>
                                            </Row>           
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <Text>Correo</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.correo} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <Text>Contraseña</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.contrasena} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <Text>Ciudad</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.ciudad} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <Text>Teléfono</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.telefono} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <Text>Cuenta Bancaria</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.cuenta} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <Text>Tipo de pago por uso de plataforma</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.pago} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <Text>Documentos</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.documento} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <Text>Información Personal</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.informacion} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row><Col><Button onPress={this.Close} block transparent style = {{marginLeft: 20, marginRight: 20, marginTop:15, marginBottom:15}}><Text style={{fontSize:18, color:'black'}}>Cerrar Sesión</Text><FontAwesome5 name='sign-in-alt' size={18}/></Button></Col></Row>    
                    </Grid> 
                </Content>
                </ScrollView>
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

export default Configuracion;