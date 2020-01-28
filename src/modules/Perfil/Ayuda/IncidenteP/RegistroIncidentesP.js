import React, { Component } from 'react';
import { Container, Content, Text, Input, Form, Button, Grid, Col, Row, Picker,Icon, View, H3, DatePicker} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';


class InformacionPersonal extends Component {

    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
      }
      setDate(newDate) {
        this.setState({ chosenDate: newDate });
      }

    formulario = () =>{
        this.props.navigation.navigate('RegistroIncidentesP');
    }

    render() {
    return (
        <Container>
            <Content>
                <Grid>
                    <Row>
                        <Col style={{marginLeft:'5%', marginTop:'4%'}}>
                            <Text style={{marginTop:5, textAlign:'justify'}}>¿Ya contactaron al seguro?.</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{width:250, marginLeft:20}}>
                            <Input placeholder='Si/No - Detalles' style={{borderBottomWidth: 0.5}}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginLeft:'5%', marginTop:'4%'}}>
                            <Text>Fecha del Incidente: {this.state.chosenDate.toString().substr(4, 12)}</Text>
                            <DatePicker
                                defaultDate={new Date(2020, 1, 1)}
                                minimumDate={new Date(2019, 1, 1)}
                                maximumDate={new Date(2050, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Seleccione fecha"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setDate}
                                disabled={false}
                                />

                        </Col>
                        <Col>
                            <FontAwesome5 name='calendar-alt' size={25} style={{color:'#ff8834', marginTop:'30%'}}/>                                             
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginLeft:'5%', marginTop:'4%'}}>
                            <Text style={{marginTop:5, textAlign:'justify'}}>Lugar del Incidente</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{width:250, marginLeft:20}}>
                            <Input placeholder='Referencia para su ubicación' style={{borderBottomWidth: 0.5}}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginLeft:'5%', marginTop:'4%'}}>
                            <Text style={{marginTop:5, textAlign:'justify'}}>¿Cómo Sucedio?</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{width:250, marginLeft:20}}>
                            <Input placeholder='Detalles' style={{borderBottomWidth: 0.5}}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginLeft:'5%', marginTop:'4%'}}>
                            <Text style={{marginTop:5, textAlign:'justify'}}>¿Estabas dentro del Vehículo?</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{width:250, marginLeft:20}}>
                            <Input placeholder='Si/No' style={{borderBottomWidth: 0.5}}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginLeft:'5%', marginTop:'4%'}}>
                            <Text style={{marginTop:5, textAlign:'justify'}}>¿Alguien requiere atención médica?</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{width:250, marginLeft:20}}>
                            <Input placeholder='Explicar Detalles' style={{borderBottomWidth: 0.5}}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{marginLeft:'5%', marginTop:'4%'}}>
                            <Text style={{marginTop:5, textAlign:'justify'}}>Detalles Adicionales</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{width:250, marginLeft:20}}>
                            <Input placeholder='Detalles' style={{borderBottomWidth: 0.5}}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <View style={{borderWidth:0.5, marginLeft:'10%', width:'60%'}}>
                                <Button transparent style={{borderWidth:0.5, width:'50%', height:'50%', marginLeft:'35%', marginRight:'40%'}}>
                                    <FontAwesome5 name='camera' size={50} style={{color:'#ff8834', marginTop:'30%'}}/>                                             
                                </Button>
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onPress={this.formulario} style={{marginLeft:'35%', marginRight:'40%', width:95, marginTop:'5%', marginBottom:'5%'}}><Text>Enviar</Text></Button>
                        </Col>
                    </Row>
                </Grid>
            </Content>
        </Container>
    );
  }
}

export default InformacionPersonal