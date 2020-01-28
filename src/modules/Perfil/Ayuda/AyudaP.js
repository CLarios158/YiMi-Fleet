import React, { Component } from 'react';
import { Container, View, Content, Text, Button, Grid, Col, Row, Icon, ListItem, Left, Right, Body, Card, CardItem, Thumbnail} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'
import axios from 'axios'

class Ayuda extends Component {

    QNA = () =>{
        this.props.navigation.navigate('QNAP');
    }

    Incidentes = () =>{
        this.props.navigation.navigate('IncidenteP');
    }

    SoporteCorreo = () =>{
        this.props.navigation.navigate('SoporteCorreoP');
    }

    SoporteTelefono = () =>{
        this.props.navigation.navigate('SoporteTelefonoP');
    }

    SoporteWhats = () =>{
        this.props.navigation.navigate('SoporteWhatsP');
    }

    Acerca = () =>{
        this.props.navigation.navigate('AcercaP');
    }

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row>
                            <Col>                                
                                <Card>
                                    <CardItem>
                                        <Body>
                                        <Button transparent onPress={this.QNA}>
                                            <Row>
                                                <Col style={{width:60}}>
                                                    <FontAwesome5 name='question-circle' size={50} style={{color:'#ff8834'}}/>                                             
                                                </Col>
                                                <Col>
                                                    <Text style={{color:'black', fontSize:20, paddingTop:15}}>Preguntas Frecuentes</Text>
                                                </Col>
                                            </Row>
                                            </Button>
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
                                        <Button transparent onPress={this.Incidentes}>
                                            <Row>
                                                <Col style={{width:60}}>
                                                    <FontAwesome5 name='plus-circle' size={50} style={{color:'#ff8834'}}/>                                             
                                                </Col>
                                                <Col>
                                                    <Text style={{color:'black', fontSize:20, paddingTop:15}}>Registro de Incidentes (Accidentes)</Text>
                                                </Col>
                                            </Row>
                                            </Button>
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
                                        <Button transparent onPress={this.SoporteCorreo}>
                                            <Row>
                                                <Col style={{width:60}}>
                                                    <FontAwesome5 name='envelope' size={50} style={{color:'#ff8834'}}/>                                             
                                                </Col>
                                                <Col>
                                                    <Text style={{color:'black', fontSize:20, paddingTop:15}}>Soporte Yimi vía Correo</Text>
                                                </Col>
                                            </Row>
                                            </Button>
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
                                        <Button transparent onPress = {this.SoporteTelefono}>
                                            <Row>
                                                <Col style={{width:60}}>
                                                    <FontAwesome5 name='phone' size={50} style={{color:'#ff8834'}}/>                                             
                                                </Col>
                                                <Col>
                                                    <Text style={{color:'black', fontSize:20, paddingTop:15}}>Soporte Yimi vía Teléfono</Text>
                                                </Col>
                                            </Row>
                                            </Button>
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
                                        <Button transparent onPress={this.SoporteWhats}>
                                            <Row>
                                                <Col style={{width:60}}>
                                                    <FontAwesome5 name='comments' size={50} style={{color:'#ff8834'}}/>                                             
                                                </Col>
                                                <Col>
                                                    <Text style={{color:'black', fontSize:20, paddingTop:15}}>Soporte Yimi vía WhatsApp 3121234567</Text>
                                                </Col>
                                            </Row>
                                            </Button>
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
                                        <Button transparent onPress={this.Acerca}>
                                            <Row>
                                                <Col style={{width:60}}>
                                                    <FontAwesome5 name='info-circle' size={50} style={{color:'#ff8834'}}/>                                             
                                                </Col>
                                                <Col>
                                                    <Text style={{color:'black', fontSize:20, paddingTop:15}}>Acerca de Yimi</Text>
                                                </Col>
                                            </Row>
                                            </Button>
                                        </Body>
                                    </CardItem>
                                </Card>                                
                            </Col>
                        </Row>
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default Ayuda;