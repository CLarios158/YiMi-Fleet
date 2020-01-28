import { Container, Content, Button,Grid, Col, Row, Text, Thumbnail} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { Component } from 'react';

class FotoPerfil extends Component {
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
            this.props.navigation.navigate('CargarFotoSNCM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:3})
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
            this.props.navigation.navigate('CargarFotoSNCM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:3})
        }
    };

    openCamera = () => {
        this.props.navigation.navigate('CamaraSNCM',{id_usuario: this.state.id_usuario, id_cat_doc:3, estado: this.state.estado})
    };

    render() {
        return (
        <Container>
            <Content>
                <Grid>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:20}}>
                            <Thumbnail style={{ height: 200, width: 200, borderRadius:100}} square source= {{uri:this.state.archivo}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center', fontWeight:'bold'}}>Foto de Perfil</Text>
                        </Col>
                    </Row>                    
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center', color:'red',fontWeight:'bold'}}>{this.state.comentario}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>Asegúrese que la imagen sean legible.</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>Carge una foto que sea reciente.</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>Si la imagen no es clara vuele a tomar otra foto o carga otra imagen.</Text>
                        </Col>
                    </Row>
                    <Row style={{marginTop:50}}>
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

export default FotoPerfil;