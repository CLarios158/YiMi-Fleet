import React, { Component } from 'react';
import { Container, Content, Text, Input, Form, CheckBox, Button, Grid, Col, Row, H3, Icon, Thumbnail, View} from 'native-base';

class Acerca extends Component {
  
      render() {
      return (
        <Container>
          <Content>
              <Grid>
                <Row>
                  <Col style={{display:'flex',alignContent:'center',alignItems:'center'}}>
                    <Text>Llamada de teléfono...</Text>
                  </Col>
                </Row>
              </Grid> 
          </Content>
        </Container>
      );
    }
  }

export default Acerca;