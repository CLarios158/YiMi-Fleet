import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './modules/Login/Login'
import VerificarTelefono from './modules/Login/VerificarTelefono'
import CodigoVerificacion from './modules/Login/CodigoVerficacion'
import Legal from './modules/Login/Legal'
import Terminos from './modules/Login/Politica/Terminos'
import Privacidad from './modules/Login/Politica/Privacidad'
import OlvideContrasena from './modules/Login/RecuperacionContrasena/OlvideContrasena'
import RestablecerContrasena from './modules/Login/RecuperacionContrasena/RestablecerContrasena'
import CodigoVerificacionContrasena from './modules/Login/RecuperacionContrasena/CodigoVerificacionContrasena'
import RecuperacionContrasena from './modules/Login/RecuperacionContrasena/RecuperacionContrasena'
import InformacionPersonalRegistro from './modules/Login/InformacionPersonal'
import DocumentoSC from './modules/Login/DocumentoSC'
import DocumentoSNC from './modules/Login/DocumentoSNC'

import IdentificacionOficialSC from './modules/Login/DocSC/IdentificacionOficialSC'
import LicenciaConducirSC from './modules/Login/DocSC/LicenciaConducirSC'
import CartaAntecedentesPenalesSC from './modules/Login/DocSC/CartaAntecedentesPenalesSC'
import ComprobanteDomicilioSC from './modules/Login/DocSC/ComprobanteDomicilioSC'
import PruebaToxicologicaSC from './modules/Login/DocSC/PruebaToxicologicaSC'
import FotoPerfilSC from './modules/Login/DocSC/FotoPerfilSC'
import ArchivoPublicoSC from './modules/Login/DocSC/ArchivoPublicoSC'
import ArchivoPrivadoSC from './modules/Login/DocSC/ArchivoPrivadoSC'
import CamaraSC from './modules/Login/DocSC/CamaraSC'
import CamaraSNC from './modules/Login/DocSNC/CamaraSNC'
import CamaraSCM from './modules/Perfil/Configuracion/Documento/DocSCM/CamaraSCM'
import CamaraSNCM from './modules/Perfil/Configuracion/Documento/DocSNCM/CamaraSNCM'
import CargarIdentificacionSC from './modules/Login/DocSC/CargarIdentificacionSC'
import CargarLicenciaSC from './modules/Login/DocSC/CargarLicenciaSC'
import CargarCartaSC from './modules/Login/DocSC/CargarCartaSC'
import CargarComprobanteSC from './modules/Login/DocSC/CargarComprobanteSC'
import CargarPruebaTSC from './modules/Login/DocSC/CargarPruebaTSC'
import CargarFotoSC from './modules/Login/DocSC/CargarFotoSC'
import CargarArchivoPublicoSC from './modules/Login/DocSC/CargarArchivoPublicoSC'
import CargarArchivoPrivadoSC from './modules/Login/DocSC/CargarArchivoPrivadoSC'

import IdentificacionOficialSNC from './modules/Login/DocSNC/IdentificacionOficialSNC'
import ComprobanteDomicilioSNC from './modules/Login/DocSNC/ComprobanteDomicilioSNC'
import FotoPerfilSNC from './modules/Login/DocSNC/FotoPerfilSNC'
import ArchivoPublicoSNC from './modules/Login/DocSNC/ArchivoPublicoSNC'
import ArchivoPrivadoSNC from './modules/Login/DocSNC/ArchivoPrivadoSNC'
import CargarIdentificacionSNC from './modules/Login/DocSNC/CargarIdentificacionSNC'
import CargarComprobanteSNC from './modules/Login/DocSNC/CargaComprobanteSNC'
import CargarFotoSNC from './modules/Login/DocSNC/CargarFotoSNC'
import CargarArchivoPublicoSNC from './modules/Login/DocSNC/CargarArchivoPublicoSNC'
import CargarArchivoPrivadoSNC from './modules/Login/DocSNC/CargarArchivoPrivadoSNC'

import CuentaBancariaRegistro from './modules/Login/CuentaBancaria'
import ValidacionRegistro from './modules/Login/ValidacionRegistro'

/* HOME */
import Home from './modules/Home/Home'

/* MI PERFIL*/
import Perfil from './modules/Perfil/Perfil'
import Configuracion from './modules/Perfil/Configuracion/Configuracion'
import Correo from './modules/Perfil/Configuracion/Correo/Correo'
import Contrasena from './modules/Perfil/Configuracion/Contrasena/Contrasena'
import Ciudad from './modules/Perfil/Configuracion/Ciudad/Ciudad'
import Telefono from './modules/Perfil/Configuracion/Telefono/Telefono'
import CodigoV from './modules/Perfil/Configuracion/Telefono/CodigoV'
import CuentaBancaria from './modules/Perfil/Configuracion/Cuenta Bancaria/CuentaBancaria'
import TipoPago from './modules/Perfil/Configuracion/TipoPago/TipoPago'
import InformacionPersonal from './modules/Perfil/Configuracion/Informacion Personal/InformacionPersonal'
import MensajeValidacionIP from './modules/Perfil/Configuracion/Informacion Personal/MensajeValidacionIP'

import DocumentoSCM from './modules/Perfil/Configuracion/Documento/DocumentoSCM'
import IdentificacionOficialSCM from './modules/Perfil/Configuracion/Documento/DocSCM/IdentificacionOficialSCM'
import LicenciaConducirSCM from './modules/Perfil/Configuracion/Documento/DocSCM/LicenciaConducirSCM'
import CartaAntecedentesPenalesSCM from './modules/Perfil/Configuracion/Documento/DocSCM/CartaAntecedentesPenalesSCM'
import ComprobanteDomicilioSCM from './modules/Perfil/Configuracion/Documento/DocSCM/ComprobanteDomicilioSCM'
import PruebaToxicologicaSCM from './modules/Perfil/Configuracion/Documento/DocSCM/PruebaToxicologicaSCM'
import FotoPerfilSCM from './modules/Perfil/Configuracion/Documento/DocSCM/FotoPerfilSCM'
import ArchivoPublicoSCM from './modules/Perfil/Configuracion/Documento/DocSCM/ArchivoPublicoSCM'
import ArchivoPrivadoSCM from './modules/Perfil/Configuracion/Documento/DocSCM/ArchivoPrivadoSCM'
import CargarIdentificacionSCM from './modules/Perfil/Configuracion/Documento/DocSCM/CargarIdentificacionSCM'
import CargarLicenciaSCM from './modules/Perfil/Configuracion/Documento/DocSCM/CargarLicenciaSCM'
import CargarCartaSCM from './modules/Perfil/Configuracion/Documento/DocSCM/CargarCartaSCM'
import CargarComprobanteSCM from './modules/Perfil/Configuracion/Documento/DocSCM/CargarComprobanteSCM'
import CargarPruebaTSCM from './modules/Perfil/Configuracion/Documento/DocSCM/CargarPruebaTSCM'
import CargarFotoSCM from './modules/Perfil/Configuracion/Documento/DocSCM/CargarFotoSCM'
import CargarArchivoPublicoSCM from './modules/Perfil/Configuracion/Documento/DocSCM/CargarArchivoPublicoSCM'
import CargarArchivoPrivadoSCM from './modules/Perfil/Configuracion/Documento/DocSCM/CargarArchivoPrivadoSCM'

import DocumentoSNCM from './modules/Perfil/Configuracion/Documento/DocumentoSNCM'
import IdentificacionOficialSNCM from './modules/Perfil/Configuracion/Documento/DocSNCM/IdentificacionOficialSNCM'
import ComprobanteDomicilioSNCM from './modules/Perfil/Configuracion/Documento/DocSNCM/ComprobanteDomicilioSNCM'
import FotoPerfilSNCM from './modules/Perfil/Configuracion/Documento/DocSNCM/FotoPerfilSNCM'
import ArchivoPublicoSNCM from './modules/Perfil/Configuracion/Documento/DocSNCM/ArchivoPublicoSNCM'
import ArchivoPrivadoSNCM from './modules/Perfil/Configuracion/Documento/DocSNCM/ArchivoPrivadoSNCM'
import CargarIdentificacionSNCM from './modules/Perfil/Configuracion/Documento/DocSNCM/CargarIdentificacionSNCM'
import CargarComprobanteSNCM from './modules/Perfil/Configuracion/Documento/DocSNCM/CargarComprobanteSNCM'
import CargarFotoSNCM from './modules/Perfil/Configuracion/Documento/DocSNCM/CargarFotoSNCM'
import CargarArchivoPublicoSNCM from './modules/Perfil/Configuracion/Documento/DocSNCM/CargarArchivoPublicoSNCM'
import CargarArchivoPrivadoSNCM from './modules/Perfil/Configuracion/Documento/DocSNCM/CargarArchivoPrivadoSNCM'







const navigator = createStackNavigator({

  Login:{
    screen : Login,
    navigationOptions: {
      header:null
    }
  }
  ,
  VerificarTelefono:{
    screen : VerificarTelefono,
    navigationOptions: {
      headerTitle:'Registrarse'
    }
  },
  CodigoVerificacion:{
    screen : CodigoVerificacion,
    navigationOptions: {
      headerTitle:'Registrarse'
    }
  },
  Legal:{
    screen : Legal,
    navigationOptions: {
      headerTitle:'Legal'
    }
  },
  Terminos:{
    screen : Terminos,
    navigationOptions: {
      headerTitle:'Términos y Condiciones'
    }
  },
  Privacidad:{
    screen : Privacidad,
    navigationOptions: {
      headerTitle:'Aviso de Privacidad'
    }
  },
  OlvideContrasena:{
    screen : OlvideContrasena,
    navigationOptions: {
      headerTitle:'Recuperar Mi Contraseña'
    }
  },
  RestablecerContrasena:{
    screen : RestablecerContrasena,
    navigationOptions: {
      headerTitle:'Recuperar Mi Contraseña'
    }
  },
  CodigoVerificacionContrasena:{
    screen : CodigoVerificacionContrasena,
    navigationOptions: {
      headerTitle:'Recuperar Mi Contraseña'
    }
  },
  RecuperacionContrasena:{
    screen : RecuperacionContrasena,
    navigationOptions: {
      headerTitle:'Recuperar Mi Contraseña'
    }
  },
  InformacionPersonalRegistro:{
    screen : InformacionPersonalRegistro,
    navigationOptions: {
      headerTitle:'Registrarse'
    }
  },
  DocumentoSC:{
    screen : DocumentoSC,
    navigationOptions: {
      headerTitle:'Registrarse'
    }
  },
  DocumentoSNC:{
    screen : DocumentoSNC,
    navigationOptions: {
      headerTitle:'Registrarse'
    }
  },
  IdentificacionOficialSC:{
    screen : IdentificacionOficialSC,
    navigationOptions: {
      headerTitle:'Identificación oficial'
    }
  },
  LicenciaConducirSC:{
    screen : LicenciaConducirSC,
    navigationOptions: {
      headerTitle:'Licencia de Conducir'
    }
  },
  CartaAntecedentesPenalesSC:{
    screen : CartaAntecedentesPenalesSC,
    navigationOptions: {
      headerTitle:'Carta de No Antecedentes Penales'
    }
  },
  ComprobanteDomicilioSC:{
    screen : ComprobanteDomicilioSC,
    navigationOptions: {
      headerTitle:'Comprobante de Domicilio'
    }
  },
  PruebaToxicologicaSC:{
    screen : PruebaToxicologicaSC,
    navigationOptions: {
      headerTitle:'Prueba Toxicológica de 3 Elementos'
    }
  },
  FotoPerfilSC:{
    screen : FotoPerfilSC,
    navigationOptions: {
      headerTitle:'Foto de Perfil'
    }
  },
  ArchivoPublicoSC:{
    screen : ArchivoPublicoSC,
    navigationOptions: {
      headerTitle:'Archivo de Certificado Público'
    }
  },
  ArchivoPrivadoSC:{
    screen : ArchivoPrivadoSC,
    navigationOptions: {
      headerTitle:'Archivo de Certificado Privado'
    }
  },
  CamaraSC:{
    screen : CamaraSC,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor:'white'
    }
  },
  CamaraSNC:{
    screen : CamaraSNC,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor:'white'
    }
  },
  CargarIdentificacionSC:{
    screen : CargarIdentificacionSC,
    navigationOptions: {
      headerTitle:'Cargar Identificación Oficial'
    }
  },
  CargarLicenciaSC:{
    screen : CargarLicenciaSC,
    navigationOptions: {
      headerTitle:'Cargar Licencia de Conducir'
    }
  },
  CargarCartaSC:{
    screen : CargarCartaSC,
    navigationOptions: {
      headerTitle:'Cargar Carta de No Antecedentes Penales'
    }
  },
  CargarComprobanteSC:{
    screen : CargarComprobanteSC,
    navigationOptions: {
      headerTitle:'Cargar Comprobante de Domicilio'
    }
  },
  CargarPruebaTSC:{
    screen : CargarPruebaTSC,
    navigationOptions: {
      headerTitle:'Cargar Prueba Toxicológica'
    }
  },
  CargarFotoSC:{
    screen : CargarFotoSC,
    navigationOptions: {
      headerTitle:'Cargar Foto de Perfil'
    }
  },
  CargarArchivoPublicoSC:{
    screen : CargarArchivoPublicoSC,
    navigationOptions: {
      headerTitle:'Cargar Archivo Certificado Público'
    }
  },
  CargarArchivoPrivadoSC:{
    screen : CargarArchivoPrivadoSC,
    navigationOptions: {
      headerTitle:'Cargar Archivo Certificado Privado'
    }
  },
  IdentificacionOficialSNC:{
    screen : IdentificacionOficialSNC,
    navigationOptions: {
      headerTitle:'Identificación Oficial'
    }
  },
  ComprobanteDomicilioSNC:{
    screen : ComprobanteDomicilioSNC,
    navigationOptions: {
      headerTitle:'Comprobante Domicilio'
    }
  },  
  FotoPerfilSNC:{
    screen : FotoPerfilSNC,
    navigationOptions: {
      headerTitle:'Foto Perfil'
    }
  },
  ArchivoPublicoSNC:{
    screen : ArchivoPublicoSNC,
    navigationOptions: {
      headerTitle:'Archivo de Certificado Público'
    }
  },
  ArchivoPrivadoSNC:{
    screen : ArchivoPrivadoSNC,
    navigationOptions: {
      headerTitle:'Archivo de Certificado Privado'
    }
  },
  CargarFotoSNC:{
    screen : CargarFotoSNC,
    navigationOptions: {
      headerTitle:'Cargar Foto de Perfil'
    }
  },
  CargarComprobanteSNC:{
    screen : CargarComprobanteSNC,
    navigationOptions: {
      headerTitle:'Cargar Comprobante de Domicilio'
    }
  },
  CargarIdentificacionSNC:{
    screen : CargarIdentificacionSNC,
    navigationOptions: {
      headerTitle:'Cargar Identificación Oficial'
    }
  },
  CargarArchivoPublicoSNC:{
    screen : CargarArchivoPublicoSNC,
    navigationOptions: {
      headerTitle:'Cargar Archivo Certificado Público'
    }
  },
  CargarArchivoPrivadoSNC:{
    screen : CargarArchivoPrivadoSNC,
    navigationOptions: {
      headerTitle:'Cargar Archivo Certificado Privado'
    }
  },
  CuentaBancariaRegistro:{
    screen : CuentaBancariaRegistro,
    navigationOptions: {
      headerTitle:'Registrarse'
    }
  },
  ValidacionRegistro:{
    screen : ValidacionRegistro,
    navigationOptions: {
      header: null
    }
  },
  Home:{
    screen : Home,
    navigationOptions: {
      header:null
    }
  },
  Perfil:{
    screen : Perfil,
    navigationOptions: {
      headerTitle:'Mi Perfil'
    }
  },
  Configuracion:{
    screen : Configuracion,
    navigationOptions: {
      headerTitle:'Configuración'
    }
  },
  Correo:{
    screen : Correo,
    navigationOptions: {
      headerTitle:'Correo Eléctronico'
    }
  },
  Contrasena:{
    screen : Contrasena,
    navigationOptions: {
      headerTitle:'Contraseña'
    }
  },
  Ciudad:{
    screen : Ciudad,
    navigationOptions: {
      headerTitle:'Ciudad'
    }
  },
  Telefono:{
    screen : Telefono,
    navigationOptions: {
      headerTitle:'Número de Teléfono'
    }
  },
  CuentaBancaria:{
    screen : CuentaBancaria,
    navigationOptions: {
      headerTitle:'Datos Bancarios'
    }
  },
  TipoPago:{
    screen : TipoPago,
    navigationOptions: {
      headerTitle:'Tipo de pago por uso de plataforma'
    }
  },
  InformacionPersonal:{
    screen : InformacionPersonal,
    navigationOptions: {
      headerTitle:'Información Personal'
    }
  },
  MensajeValidacionIP:{
    screen : MensajeValidacionIP,
    navigationOptions: {
      header: null
    }
  },
  DocumentoSCM:{
    screen : DocumentoSCM,
    navigationOptions: {
      headerTitle:'Documentos Pendientes'
    }
  },
  IdentificacionOficialSCM:{
    screen : IdentificacionOficialSCM,
    navigationOptions: {
      headerTitle:'Identificación oficial'
    }
  },
  LicenciaConducirSCM:{
    screen : LicenciaConducirSCM,
    navigationOptions: {
      headerTitle:'Licencia de Conducir'
    }
  },
  CartaAntecedentesPenalesSCM:{
    screen : CartaAntecedentesPenalesSCM,
    navigationOptions: {
      headerTitle:'Carta de Antecedentes Penales'
    }
  },
  ComprobanteDomicilioSCM:{
    screen : ComprobanteDomicilioSCM,
    navigationOptions: {
      headerTitle:'Comprobante de Domicilio'
    }
  },
  PruebaToxicologicaSCM:{
    screen : PruebaToxicologicaSCM,
    navigationOptions: {
      headerTitle:'Prueba Toxicológica de 3 Elementos'
    }
  },
  FotoPerfilSCM:{
    screen : FotoPerfilSCM,
    navigationOptions: {
      headerTitle:'Foto de Perfil'
    }
  },
  ArchivoPublicoSCM:{
    screen : ArchivoPublicoSCM,
    navigationOptions: {
      headerTitle:'Archivo de Certificado Público'
    }
  },
  ArchivoPrivadoSCM:{
    screen : ArchivoPrivadoSCM,
    navigationOptions: {
      headerTitle:'Archivo de Certificado Privado'
    }
  },
  CargarIdentificacionSCM:{
    screen : CargarIdentificacionSCM,
    navigationOptions: {
      headerTitle:'Cargar Identificación Oficial'
    }
  },
  CargarLicenciaSCM:{
    screen : CargarLicenciaSCM,
    navigationOptions: {
      headerTitle:'Cargar Licencia Conducir'
    }
  },
  CargarCartaSCM:{
    screen : CargarCartaSCM,
    navigationOptions: {
      headerTitle:'Cargar Carta de No Antecedentes Penales'
    }
  },
  CargarComprobanteSCM:{
    screen : CargarComprobanteSCM,
    navigationOptions: {
      headerTitle:'Cargar Comprobante de Domicilio'
    }
  },
  CargarPruebaTSCM:{
    screen : CargarPruebaTSCM,
    navigationOptions: {
      headerTitle:'Cargar Prueba Toxicológica'
    }
  },
  CargarFotoSCM:{
    screen : CargarFotoSCM,
    navigationOptions: {
      headerTitle:'Cargar Foto de Perfil'
    }
  },
  CargarArchivoPublicoSCM:{
    screen : CargarArchivoPublicoSCM,
    navigationOptions: {
      headerTitle:'Cargar Archivo Certificado Público'
    }
  },
  CargarArchivoPrivadoSCM:{
    screen : CargarArchivoPrivadoSCM,
    navigationOptions: {
      headerTitle:'Cargar Archivo Certificado Privado'
    }
  },  
  DocumentoSNCM:{
    screen : DocumentoSNCM,
    navigationOptions: {
      headerTitle:'Documentos Pendientes'
    }
  },
  IdentificacionOficialSNCM:{
    screen : IdentificacionOficialSNCM,
    navigationOptions: {
      headerTitle:'Identificación Oficial'
    }
  },
  ComprobanteDomicilioSNCM:{
    screen : ComprobanteDomicilioSNCM,
    navigationOptions: {
      headerTitle:'Comprobante de Domicilio'
    }
  },
  FotoPerfilSNCM:{
    screen : FotoPerfilSNCM,
    navigationOptions: {
      headerTitle:'Foto de Perfil'
    }
  },
  ArchivoPublicoSNCM:{
    screen : ArchivoPublicoSNCM,
    navigationOptions: {
      headerTitle:'Archivo de Certificado Público'
    }
  },
  ArchivoPrivadoSNCM:{
    screen : ArchivoPrivadoSNCM,
    navigationOptions: {
      headerTitle:'Archivo de Certificado Privado'
    }
  },
  CargarIdentificacionSNCM:{
    screen : CargarIdentificacionSNCM,
    navigationOptions: {
      headerTitle:'Cargar Identificación Oficial'
    }
  },
  CargarComprobanteSNCM:{
    screen : CargarComprobanteSNCM,
    navigationOptions: {
      headerTitle:'Cargar Comprobante de Domicilio'
    }
  },
  CargarFotoSNCM:{
    screen : CargarFotoSNCM,
    navigationOptions: {
      headerTitle:'Cargar Foto de Perfil'
    }
  },
  CargarArchivoPublicoSNCM:{
    screen : CargarArchivoPublicoSNCM,
    navigationOptions: {
      headerTitle:'Cargar Archivo Certificado Público'
    }
  },
  CargarArchivoPrivadoSNCM:{
    screen : CargarArchivoPrivadoSNCM,
    navigationOptions: {
      headerTitle:'Cargar Archivo Certificado Privado'
    }
  },
  CamaraSCM:{
    screen : CamaraSCM,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor:'white'
    }
  },
  CamaraSNCM:{
    screen : CamaraSNCM,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor:'white'
    }
  },
  
  CodigoV:{
    screen : CodigoV,
    navigationOptions: {
      headerTitle:'Verificación'
    }
  },
},{headerLayoutPreset : 'center'});

export default createAppContainer(navigator);