import { Container, Content, Text, Button, Grid, Col, Row } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { Component } from 'react';

class MensajeValidacion extends Component {

  configuracion = () => {
    this.props.navigation.navigate('Configuracion')
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row>
              <Col style={{ display: 'flex', alignItems: 'center', alignContent: 'center', marginTop: 50 }}><FontAwesome5 name='check-circle' size={250} style={{ color: '#2ecc71' }} /></Col>
            </Row>
            <Row>
              <Col style={{ display: 'flex', alignItems: 'center', alignContent: 'center', marginTop: 10, marginLeft: 20, marginRight: 20 }}>
                <Text style={{ textAlign: 'center' }}>Tu información personal ha sido enviada para su validación, se te notificará cuando esto haya sucedido.</Text>
              </Col>
            </Row>
            <Row><Col><Button onPress={this.configuracion} block style={{ marginLeft: 70, marginRight: 70, marginTop: 50, backgroundColor: '#ff8834' }}><Text>OK</Text></Button></Col></Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default MensajeValidacion;