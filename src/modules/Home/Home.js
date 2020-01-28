import React, { Component } from 'react';
import { Container, Content, Text, Input, Button, Grid, Col, Row, Radio, Picker, Icon, View, H3, Footer, FooterTab} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import {NetInfo, Dimensions} from 'react-native';
const { width } = Dimensions.get('window');


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id_usuario: this.props.navigation.getParam('id_usuario'),
      rol: this.props.navigation.getParam('rol'),
      isConnected: true
    }
  }

  componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  };


  goMyProfile = () =>{
    if(this.state.isConnected == true){
      this.props.navigation.navigate('Perfil', {id_usuario:this.state.id_usuario, rol: this.state.rol});
    }
  }
    
    render() {
      return (
        <Container>
          <Content>
            <Grid>
              <Row style={{marginTop:23}}>            
                {!this.state.isConnected 
                  ?<View style={{backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'relative', margin:0}}>
                  <Text style={{color: '#fff'}}>Verifique su conexión e intente nuevamente</Text>
                  </View> 
                  :<View></View>
                }
              </Row>
            </Grid>
          </Content>
          <Text>{/*this.state.id_usuario}{this.state.rol*/}</Text>
          <Footer style={{height:65}}>
            <FooterTab  style={{backgroundColor:'white', borderTopColor:'black', borderWidth:0.5}}>
              <Button vertical>
                <FontAwesome5 name='home' size={40} style={{color:'#ec6a2c'}}/>
                <Text style={{color:'black', fontSize:9}}>Inicio</Text>
              </Button>
              <Button vertical >
                <FontAwesome5 name='address-card' size={40} style={{color:'#ec6a2c'}}/>
                <Text style={{color:'black', fontSize:9}}>Conductor</Text>
              </Button>
              <Button vertical>
                <FontAwesome5 name='car' size={40} style={{color:'#ec6a2c'}}/>
                <Text style={{color:'black', fontSize:9}}>Vehiculos</Text>
              </Button>
              <Button vertical onPress={this.goMyProfile}>
                <FontAwesome5 name='user' size={40} style={{color:'#ec6a2c'}}/>
                <Text style={{color:'black', fontSize:9}}>Mi perfil</Text>
              </Button>
              <Button vertical>
                <FontAwesome5 name='boxes' size={40} style={{color:'#ec6a2c'}}/>
                <Text style={{color:'black', fontSize:9}}>Gestión</Text>
              </Button>
            </FooterTab>
        </Footer>
        </Container>
      );
  }
}

export default Home