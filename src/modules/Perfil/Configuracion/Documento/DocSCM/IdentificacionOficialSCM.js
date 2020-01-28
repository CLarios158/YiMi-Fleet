import React, { Component } from 'react';
import { Container, Content, Text, Button,Grid, Col, Row, Thumbnail}  from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

class IdentificacionOficial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            id_usuario: this.props.navigation.getParam('id_usuario'),
            comentario: this.props.navigation.getParam('comentario'),
            archivo: this.props.navigation.getParam('archivo')
        };
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({});
        if (result.cancelled) {
            this.setState({ image: ""});
        }else{
            this.setState({ image: result.uri });
        }
        if(this.state.image != ""){
            this.props.navigation.navigate('CargarIdentificacionSCM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:1})
        }
    };

    cameraImage = async () => {
        let result = await ImagePicker.launchCameraAsync({});
        if (result.cancelled) {
            this.setState({ image: ""});
        }else{
            this.setState({ image: result.uri });
        }
        if(this.state.image != ""){
            this.props.navigation.navigate('CargarIdentificacionSCM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:1})
        }
    };

    openCamera = () => {
        this.props.navigation.navigate('CamaraSCM',{id_usuario: this.state.id_usuario, id_cat_doc:1, estado: this.state.estado})
    };

    render() {
        return (
        <Container>
            <Content>
                <Grid>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:20}}>
                            <Thumbnail style={{ height: 250, width: 200, resizeMode: 'contain', borderRadius:5}} square source= {{uri:this.state.archivo}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center', fontWeight:'bold'}}>Identificación oficial (IFE/INE/Pasaporte)</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center', color:'red',fontWeight:'bold'}}>{this.state.comentario}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>Asegúrese que la información y la imagen sean legible.</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>Carge una foto de tu INE/IFE/Pasaporte que sea vigente.</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>Si la imagen no es clara vuele a tomar otra foto o carga otra imagen.</Text>
                        </Col>
                    </Row>
                    <Row style={{marginTop:20}}>
                        <Col style={{paddingLeft:120}}>
                            <Button onPress={this.cameraImage} transparent><FontAwesome5 name='camera' size={40}/></Button>
                        </Col>
                        <Col>
                            <Button onPress={this.pickImage} transparent><FontAwesome5 name='images' size={40}/></Button>
                        </Col>
                    </Row>
                </Grid> 
            </Content>
        </Container>
        );
    }
}

export default IdentificacionOficial;