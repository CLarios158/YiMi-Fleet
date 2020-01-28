import React, { Component } from 'react';
import { Container, Content, Text, Input, Form, Button, Grid, Col, Row, Radio, Picker, Icon, View, H3, Textarea} from 'native-base';
import axios from 'axios'

class SoporteCorreo extends Component {

  render() {
    return (
      <Container>
        <Content>
          <Grid>
              <Row style = {{marginTop: 10,  marginLeft:20, marginBottom:15}}><Col style={{display:'flex',alignContent: 'center', alignItems: 'center'}}><H3>Ingrese la información</H3></Col></Row>
              <Row>
                <Col style={{width:250, marginLeft:20}}>
                  <Input placeholder='Nombre(s)' style={{borderBottomWidth: 0.5}}></Input>
                </Col>
              </Row>
              <Row>
                <Col style={{width:250, marginLeft:20, marginTop:15}}>
                  <Input placeholder='Apellido(s)' style={{borderBottomWidth: 0.5}}></Input>
                </Col>
              </Row>
              <Row>
                <Col style={{width:250, marginLeft:20, marginTop:15}}>
                  <Input placeholder='Correo' style={{borderBottomWidth: 0.5}}></Input>
                </Col>
              </Row>
              <Row>
                <Col style={{marginLeft:20, marginRight:20, marginTop:20}}>
                    <Textarea rowSpan={5} bordered placeholder="Explicanos tus dudas..." />
                </Col>
              </Row>
              <Row><Col><Button style = {{marginTop:20,marginLeft:'45%',marginRight:'45%', width:76, backgroundColor:'#ff8834'}}><Text>Envíar</Text></Button></Col></Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default SoporteCorreo;