import React, { Component } from 'react';
import { Container, Content, Text, Input, Button, Grid, Col, Row, Radio, Picker, Icon, View, H3 } from 'native-base';
import axios from 'axios';
import { ActivityIndicator, NetInfo, Dimensions, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');

class DatosBancarios extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nombre: '', apellido: '', tipo_banco: '',
      num_cuenta: '', clabe: '', comision_fija: '',
      comision_porcentaje: '', array: [], loading: false,
      comision: true, cuota: false, isConnected: true,
      tipo_pago: 1, repeat: 0,
      id_usuario: this.props.navigation.getParam('id_usuario'),
      rol: this.props.navigation.getParam('rol'),
      telefono: this.props.navigation.getParam('telefono'),
      pass: this.props.navigation.getParam('pass')
    };
  }

  SaveStatus = async () => {
    let complete = '1';
    try {

      await AsyncStorage.setItem('completeBank', complete);

    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  InsertCuentaBancaria = () => {
    if (this.state.isConnected != false) {
      if (this.state.repeat == 0) {
        axios.post('http://35.203.57.92:3000/registrar_cuenta_bancaria', {
          id_rol: this.state.rol, clabe: this.state.clabe, num_cuenta: this.state.num_cuenta, num_tarjeta: '',
          nombre_propietario: this.state.nombre, apellido_propietario: this.state.apellido, fecha_vencimiento: '', ccv: '', tipo_pago: this.state.tipo_pago, tipo: 1,
          id_banco: this.state.tipo_banco, id_usuario: this.state.id_usuario
        })
          .then(response => {
            // handle success
            this.setState({ repeat: 1 });
            this.SaveStatus();
            console.log("Cuenta Bancaria Registrada");
            this.props.navigation.navigate('ValidacionRegistro', { id_usuario: this.state.id_usuario, rol: this.state.rol, telefono: this.state.telefono, pass: this.state.pass })
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      } else {
        console.log("Cuenta Bancaria Ya Registrada");
        this.props.navigation.navigate('ValidacionRegistro', { id_usuario: this.state.id_usuario, rol: this.state.rol, telefono: this.state.telefono, pass: this.state.pass });
      }
    }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    axios.post('http://35.203.57.92:3003/webservice/comision_fija_plataforma')
      .then(response => {
        response.data.datos.forEach(element => {
          this.setState({
            comision_fija: element['comision_semanal']
          });
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    axios.post('http://35.203.57.92:3003/webservice/comision_porcentaje_plataforma')
      .then(response => {
        response.data.datos.forEach(element => {
          this.setState({
            comision_porcentaje: element['comision_porcentaje'],
            loading: true

          });
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    axios.get('http://35.203.57.92:3000/consultar_banco')
      .then(response => {
        response.data.data.forEach(element => {
          this.state.array.push({ 'id': element['id_banco'], "nombre": element['nombre_banco'] });
          this.setState({
            array: this.state.array,
            loading: true
          });
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  }

  onClickRadio1 = () => {
    if (this.state.comision == true) {
      this.setState({ comision: false });
    } else {
      this.setState({ comision: true, cuota: false, tipo_pago: 1 });
    }
  }

  onClickRadio2 = () => {
    if (this.state.cuota == true) {
      this.setState({ cuota: false });
    } else {
      this.setState({ cuota: true, comision: false, tipo_pago: 2 });
    }
  }

  onValidateInput = () => {
    var validateClabe = /^[0-9]{18}$/;
    var validateCuenta = /^[0-9]{6,16}$/;
    var validateNombres = /^[a-zA-Z\sñáéíóú]+$/;

    if (this.state.isConnected != false) {
      if (this.state.nombre.trim() == "") {
        this.setState(() => ({ errorNombre: "Ingresa tu Nombre" }));
      } else if (!validateNombres.test(this.state.nombre)) {
        this.setState(() => ({ errorNombre: "Formato Incorrecto" }));
      } else {
        this.setState(() => ({ errorNombre: "" }));
      }

      if (this.state.apellido.trim() == "") {
        this.setState(() => ({ errorApellido: "Ingresa tu Apellido" }));
      } else if (!validateNombres.test(this.state.apellido)) {
        this.setState(() => ({ errorApellido: "Formato Incorrecto" }));
      } else {
        this.setState(() => ({ errorApellido: "" }));
      }

      if (this.state.num_cuenta.trim() == "") {
        this.setState(() => ({ errorNumCuenta: "Ingresa tu Número de Cuenta" }));
      } else if (!validateCuenta.test(this.state.num_cuenta)) {
        this.setState(() => ({ errorNumCuenta: "Ingresa un Número de Cuenta Valido" }));
      } else {
        this.setState(() => ({ errorNumCuenta: "" }));
      }

      if (this.state.clabe.trim() == "") {
        this.setState(() => ({ errorClabe: "Ingresa tu CLABE interbancaria" }));
      } else if (!validateClabe.test(this.state.clabe)) {
        this.setState(() => ({ errorClabe: "Ingresa 18 dígitos" }));
      } else {
        this.setState(() => ({ errorClabe: "" }));
      }

      if (this.state.nombre.trim() != "" && validateNombres.test(this.state.nombre) && this.state.apellido.trim() != "" && validateNombres.test(this.state.apellido) && this.state.num_cuenta.trim() != "" && validateCuenta.test(this.state.num_cuenta)
        && this.state.clabe.trim() != "" && validateClabe.test(this.state.clabe)) {
        this.InsertCuentaBancaria();
      }
    }

  }

  render() {
    if (this.state.loading == true) {
      return (
        <ScrollView keyboardShouldPersistTaps='always'>
          <Container>
            <Content>
              <Grid>
                <Row>
                  {!this.state.isConnected
                    ? <View style={{ backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'relative', margin: 0 }}>
                      <Text style={{ color: '#fff' }}>Verifique su conexión e intente nuevamente</Text>
                    </View>
                    : <View></View>
                  }
                </Row>
                <Row style={{ marginTop: 20, marginLeft: 10, marginBottom: 15 }}><Col style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}><H3>Ingrese sus datos bancarios</H3></Col></Row>
                <Row>
                  <Col style={{ width: 250, marginLeft: 15 }}>
                    <Input value={this.state.nombre} onChangeText={nombre => this.setState({ nombre })} placeholder='Nombre(s) del Titular' style={{ borderBottomWidth: 0.5 }}></Input>
                    {!!this.state.errorNombre && (
                      <Text style={{ color: "red", fontSize: 13, marginBottom: 0 }}>{this.state.errorNombre}</Text>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginTop: 15, width: 250, marginLeft: 15 }}>
                    <Input value={this.state.apellido} onChangeText={apellido => this.setState({ apellido })} placeholder='Apellido(s) del Titular' style={{ borderBottomWidth: 0.5 }}></Input>
                    {!!this.state.errorApellido && (
                      <Text style={{ color: "red", fontSize: 13, marginBottom: 0 }}>{this.state.errorApellido}</Text>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginTop: 20, marginLeft: 15, width: 250 }}>
                    <View style={{ borderWidth: 0.5 }}>
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.tipo_banco}
                        onValueChange={(itemValue) => this.setState({ tipo_banco: itemValue })}>
                        {this.state.array.map((item) => {
                          return (< Picker.Item label={item.nombre} key={item.id} value={item.id} />);
                        })}
                      </Picker>
                    </View>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginTop: 15, width: 250, marginLeft: 15 }}>
                    <Input value={this.state.num_cuenta} onChangeText={num_cuenta => this.setState({ num_cuenta })} maxLength={16} placeholder='Número de cuenta' style={{ borderBottomWidth: 0.5 }} keyboardType='numeric'></Input>
                    {!!this.state.errorNumCuenta && (
                      <Text style={{ color: "red", fontSize: 13, marginBottom: 0 }}>{this.state.errorNumCuenta}</Text>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginTop: 15, width: 250, marginLeft: 15 }}>
                    <Input Input value={this.state.clabe} onChangeText={clabe => this.setState({ clabe })} maxLength={18} placeholder='CLABE interbancaria' style={{ borderBottomWidth: 0.5 }} keyboardType='numeric'></Input>
                    {!!this.state.errorClabe && (
                      <Text style={{ color: "red", fontSize: 13, marginBottom: 0 }}>{this.state.errorClabe}</Text>
                    )}
                  </Col>
                </Row>

                <Row><Col style={{ display: 'flex', alignContent: 'center', alignItems: 'center', marginTop: 15, marginRight: 10, marginLeft: 10 }}><Text style={{ fontSize: 12, textAlign: 'center' }}>Seleccione el tipo de pago por uso de la plataforma de software</Text></Col></Row>
                <Row style={{ marginTop: 10 }}>
                  <Col style={{ width: 30, marginLeft: 15 }}>
                    <Radio onPress={this.onClickRadio1} selected={this.state.comision} />
                  </Col>
                  <Col>
                    <Text>% Comisión</Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text style={{ marginLeft: 15, fontSize: 12, marginRight: 15 }}>Su porcentaje de pago de comisión por uso de la plataforma de software sera del {this.state.comision_porcentaje}%.</Text>
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col style={{ width: 30, marginLeft: 15 }}>
                    <Radio onPress={this.onClickRadio2}
                      selected={this.state.cuota} />
                  </Col>
                  <Col>
                    <Text>Cuota fija</Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text style={{ marginLeft: 15, fontSize: 12, marginRight: 15 }}>Su pago de comisión por uso de la plataforma de software sera de ${this.state.comision_fija} MXN semanales.</Text>
                  </Col>
                </Row>
                <Row><Col><Button onPress={this.onValidateInput} block style={{ marginLeft: 20, marginRight: 20, marginTop: 20, backgroundColor: '#ff8834' }}><Text>Siguiente</Text></Button></Col></Row>
              </Grid>
            </Content>
          </Container>
        </ScrollView>
      );
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
          <ActivityIndicator size={80} color="#ff8834" />
        </View>
      );
    }

  }
}

export default DatosBancarios;