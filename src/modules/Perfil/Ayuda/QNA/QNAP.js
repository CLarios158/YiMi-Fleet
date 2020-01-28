import React, { Component } from 'react';
import { Container, View, Content, Text, Button, Grid, Col, Row, Icon, ListItem, Left, Right, Body, Card, CardItem, Thumbnail} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

class QNA extends Component {
    /*
    constructor(props) {
        super(props);
        this.state = {
            nombre: ''
        }
    }
    */


    Registro = () =>{
        this.props.navigation.navigate('RegistroQNA');
    }

    Seguridad = () =>{
        this.props.navigation.navigate('SeguridadQNA');
    }

    Ganancias = () =>{
        this.props.navigation.navigate('GananciasQNA');
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
                                                    <FontAwesome5 name='copy' size={50} style={{color:'#ff8834'}}/>                                             
                                                </Col>
                                                <Col>
                                                    <Text style={{color:'black', fontSize:20, paddingTop:15, fontSize:18}}>¿Qué documentos se requieren para ser conductor?</Text>
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
                                        <Button transparent>
                                            <Row>
                                                <Col style={{width:60}}>
                                                    <FontAwesome5 name='lock' size={50} style={{color:'#ff8834'}}/>                                             
                                                </Col>
                                                <Col>
                                                    <Text style={{color:'black', fontSize:20, paddingTop:15, fontSize:18}}>¿Qué tan seguro es Yimi?</Text>
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
                                        <Button transparent>
                                            <Row>
                                                <Col style={{width:60}}>
                                                    <FontAwesome5 name='dollar-sign' size={50} style={{color:'#ff8834'}}/>                                             
                                                </Col>
                                                <Col> 
                                                    <Text style={{color:'black', fontSize:20, paddingTop:15, fontSize:18}}>¿Puedo aceptar propinas en efectivo?</Text>
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

export default QNA;