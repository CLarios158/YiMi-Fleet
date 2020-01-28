import React, { Component } from 'react';
import { Container, Content, Text, Button,Grid, Col, Row, Thumbnail} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

class ArchivoPrivado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DocumentoPrivado: '',
            name:'',
            id_usuario: this.props.navigation.getParam('id_usuario'),
            estado: this.props.navigation.getParam('estado'),
            comentario: this.props.navigation.getParam('comentario'),
            nameCargado: this.props.navigation.getParam('name')
        };
    }

    pickDocumentPrivado = async () => {           
        let result = await DocumentPicker.getDocumentAsync({type: "*/*"});
        
        if (result.type == 'cancel') {
            this.setState({ DocumentoPrivado: ""});
        }else{
            this.setState({ DocumentoPrivado: result.uri, name: result.name });
            var allowedExtensions = /(\.key)$/i;
            if(!allowedExtensions.exec(this.state.name)){
                alert('Por favor cargue un documento con la extensión .key')
            }else{                
                if(this.state.DocumentoPrivado != "" && allowedExtensions.exec(this.state.name)){
                    this.props.navigation.navigate('CargarArchivoPrivadoSNCM',{archivo: this.state.DocumentoPrivado, name: this.state.name, id_usuario: this.state.id_usuario, id_cat_documento:6, estado: this.state.estado});
                }
            }
        } 
    }

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row>
                            <Col style={{display:'flex',alignItems:'center',alignContent:'center', marginTop:50}}><FontAwesome5 name='key' size={150} style={{color:'#ff8834'}}/></Col>
                        </Row>
                        <Row>
                            <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                                <Text style = {{textAlign:'center', fontWeight:'bold'}}>Archivo .key</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                                <Text style = {{textAlign:'center', fontWeight:'bold', color:'red'}}>{this.state.comentario}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                                <Text style = {{textAlign:'center'}}>Seleccione el archivo correspondiente a la extensión ".key"</Text>
                            </Col>
                        </Row>
                        <Row style={{marginTop:50}}>
                            <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85, marginTop:15}}>
                                <Button onPress={this.pickDocumentPrivado} block style={{backgroundColor:'#ff8834'}}><Text>Seleccionar Archivo</Text></Button>
                            </Col>
                        </Row>
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default ArchivoPrivado;