import { Container, Content, Text, Grid, Col, Row, Button, Left, ListItem, Right, Icon, H3} from 'native-base';
import React, { Component } from 'react';

class Legal extends Component {

    Terminos = () =>{
        this.props.navigation.navigate('Terminos')
    }

    Privacidad = () =>{
        this.props.navigation.navigate('Privacidad')
    }

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row style={{marginTop:20}}>
                            <Col>
                                <ListItem style={{borderBottomWidth:0, height:0}}>
                                    <Left>
                                        <Text>Términos y Condiciones</Text>
                                    </Left>
                                    <Right>
                                        <Button onPress={this.Terminos} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                    </Right>
                                </ListItem>
                            </Col>
                        </Row>
                        <Row style={{marginTop:10}}>
                            <Col>
                                <ListItem style={{borderBottomWidth:0, height:0}}>
                                    <Left>
                                        <Text>Aviso de Privacidad</Text>
                                    </Left>
                                    <Right>
                                        <Button onPress={this.Privacidad} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                    </Right>
                                </ListItem>
                            </Col>
                        </Row>
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default Legal;