import React, { Component } from 'react';
import { Container, Content, Text, Button,Grid, Col, Row, Thumbnail} from 'native-base';
import axios from 'axios'
import { View, NetInfo, Dimensions, Alert} from 'react-native';
const { width } = Dimensions.get('window');

class IdentificacionOficial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.navigation.getParam('image'),
            id_usuario: this.props.navigation.getParam('id_usuario'),
            id_cat_documento: this.props.navigation.getParam('id_cat_documento'),
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

            axios.put('http://35.203.57.92:3000/modificar_documento',{id_usuario: this.state.id_usuario, archivo: this.state.image, id_cat_documento: this.state.id_cat_documento, tipo_rfc: null})
            .then(response => {
                console.log('Modifico Identificacion');
                Alert.alert(
                    'Aviso',
                    'Tu Identificación oficial han sido enviada para su validación, se te notificará cuando esto haya sucecido.',
                    [
                    {text: 'OK', onPress: () => this.props.navigation.navigate('DocumentoSCM', {id_usuario: this.state.id_usuario})},
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
                    <Row style={{marginTop:30}}>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center'}}>
                            <Thumbnail style={{ height: 400, width: 300, resizeMode: 'contain', borderRadius:5}} square source= {{uri:this.state.image}} />
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

export default IdentificacionOficial;