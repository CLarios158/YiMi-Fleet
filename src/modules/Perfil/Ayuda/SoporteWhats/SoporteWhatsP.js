import React, { Component } from 'react';
import { Container, View, Content, Text, Button, Grid, Col, Row, Icon, ListItem, Left, Right, Body, Card, CardItem, Thumbnail} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

class SoporteWhats extends Component {

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row >
                            <Col>                                
                                <Card>
                                    {/* style = {{width:'100%', height:'50%'}} */}
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <Text style={{color:'black', fontSize:20, paddingTop:15, fontSize:18}}>Se ha enviado un mensaje WhatsApp al número 1234567890 para brindarte soporte técnico, si nos has recibido el mensaje da clic en "Enviar Mensaje".</Text>
                                                </Col>
                                            </Row>
                                            <Row><Col><Button style = {{marginTop:20,marginLeft:'40%',marginRight:'45%', width:76, backgroundColor:'#ff8834'}}><Text>Enviar</Text></Button></Col></Row>
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

export default SoporteWhats;