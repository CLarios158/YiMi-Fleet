import React, { Component } from 'react';
import { Container, Content, Text, Input, Form, Button, Grid, Col, Row, Picker,Icon, View, H3} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'

class InformacionPersonal extends Component {

    formulario = () =>{
        this.props.navigation.navigate('RegistroIncidentesP');
    }

    render() {
    return (
        <Container>
            <Content>
                <Grid>
                    <Row>
                        <Col style={{marginLeft:'5%', marginTop:'8%'}}>
                            <Text style={{marginTop:5, textAlign:'justify'}}>Estuve involucrado en un accidente.</Text>
                            <Text style={{marginTop:5, textAlign:'justify'}}>Migo está comprometido con la seguridad de todos los que usan su plataforma.</Text>
                            <Text style={{marginTop:5, textAlign:'justify'}}>Si estuviste en un accidente automovilistico:</Text>
                            <Text style={{marginTop:5, textAlign:'justify'}}>1. Asegúrate de que todos los involucrados estén a salvo.</Text>
                            <Text style={{marginTop:5, textAlign:'justify'}}>2. Tú o el conductor pueden llamar a X seguros (0180012345) o a la policia (911), si es necesasrio.</Text>
                            <Text style={{marginTop:5, textAlign:'justify'}}>3. Infórmanospor este medio los detalles de lo sucedido. Nos pondremos en contacto contigo a la brevedad.</Text>
                            <Text style={{marginTop:5, textAlign:'justify'}}>Si estuviste en OTRO tipo de accidente NO AUTOMOVILISTICO:</Text>
                            <Text style={{marginTop:5, textAlign:'justify'}}>1. Infórmanos por este medio los detalles de lo sucedido. Nos pondremos en contacto contigo a la brevedad.</Text>
                            <Button onPress={this.formulario} style={{marginLeft:'35%', marginRight:'40%', width:95}}><Text>Siguiente</Text></Button>
                        </Col>
                    </Row>
                </Grid>
            </Content>
        </Container>
    );
  }
}

export default InformacionPersonal