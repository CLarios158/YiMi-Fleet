import { View, Container, Content, Text, Button, Grid, Col, Row } from 'native-base';
import { NetInfo, Dimensions, AsyncStorage } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
import React, { Component } from 'react';
import axios from 'axios';

class ValidacionRegistro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_usuario: this.props.navigation.getParam('id_usuario'),
      user: this.props.navigation.getParam('telefono'),
      pass: this.props.navigation.getParam('pass'),
      rol: this.props.navigation.getParam('rol'),
      tiempo: '', telefono: '', email: '', loading: false, isConnected: true
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    axios.get('http://35.203.57.92:3003/webservice/tiempos/tiempos_solicitud')
      .then(response => {
        response.data.datos.forEach(element => {
          this.setState({
            tiempo: element["tiempo"],
            email: element["email_soporte"],
            telefono: element["telefono"],
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

  SaveSession = async () => {
    let campo = this.state.user;
    let passwd = this.state.pass;

    try {

      await AsyncStorage.setItem('campo', campo);
      await AsyncStorage.setItem('passwd', passwd);

    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }

  goHome = () => {
    this.SaveSession();
    this.props.navigation.push('Home', { id_usuario: this.state.id_usuario, rol: this.state.rol });
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style={{ marginTop: 23 }}>
              {!this.state.isConnected
                ? <View style={{ backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'absolute', margin: 0 }}>
                  <Text style={{ color: '#fff' }}>Verifique su conexión e intente nuevamente</Text>
                </View>
                : <View></View>
              }
            </Row>
            <Row>
              <Col style={{ display: 'flex', alignItems: 'center', alignContent: 'center', marginTop: 50 }}><FontAwesome5 name='check-circle' size={250} style={{ color: '#2ecc71' }} /></Col>
            </Row>
            <Row>
              <Col style={{ display: 'flex', alignItems: 'center', alignContent: 'center', marginTop: 10, marginLeft: 20, marginRight: 20 }}>
                <Text style={{ textAlign: 'center' }}>Tu solicitud de registro como socio ha sido enviado para su validación, se te notificará el resultado en un máximo de {this.state.tiempo} horas.</Text>
              </Col>
            </Row>
            <Row>
              <Col style={{ display: 'flex', alignItems: 'center', alignContent: 'center', marginTop: 20 }}>
                <Text style={{ textAlign: 'center' }}>{this.state.telefono}</Text>
              </Col>
            </Row>
            <Row>
              <Col style={{ display: 'flex', alignItems: 'center', alignContent: 'center', marginTop: 20 }}>
                <Text style={{ textAlign: 'center' }}>{this.state.email}</Text>
              </Col>
            </Row>
            <Row><Col><Button onPress={this.goHome} block style={{ marginLeft: 70, marginRight: 70, marginTop: 50, backgroundColor: '#ff8834' }}><Text>OK</Text></Button></Col></Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default ValidacionRegistro;