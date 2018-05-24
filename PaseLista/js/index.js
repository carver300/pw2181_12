const $ = require('jquery');
const {BrowserWindow} = require('electron').remote
const app = require('electron').app
//Ruta de sistema de archivos
const path = require('path');
//url de las paginas que se van a cargar
const url = require('url');

let pantallaDetalle;
var materias = new Array(3);

var sUsuario;
var sContraseña;
var bRespuesta;
var sUsuarioValida;
var sPeriodo;

global.datosPorMaestro = 
{
	claveMateria: '',
	grupo: '',
	usuario: '',
	materia: '',
    horalunes: '',
    horamartes:  '',
    horamiercoles: '',
    horajueves: '',
    horaviernes: ''
}

function datosPorMaestro(claveMateria,grupo,usuario,materia,horalunes,horamartes,horamiercoles,horajueves,horaviernes)
{
    this.claveMateria = claveMateria;
    this.grupo = grupo;
    this.usuario = usuario;
    this.materia = materia;
    this.horalunes = horalunes;
    this.horamartes = horamartes;
    this.horamiercoles = horamiercoles;
    this.horajueves = horajueves;
    this.horaviernes = horaviernes;
}

var inicia = function()
{
   var validarLogueo = function()
   {
       var respuestaObtenerDatos = false;
       sUsuario = $("#usuario").val();
       sContraseña = $("#contraseña").val();
       $.ajax({
           url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/validausuario.php?usuario='+sUsuario+'&clave='+sContraseña,
           dataType: 'json',
           success: function(data)
           {
                bRespuesta = data.respuesta;
                sUsuarioValida = data.usuariovalida;
                sPeriodo = data.periodoactual;
                if (bRespuesta)
                {
                    respuestaObtenerDatos = obtenerDatosPorGrupo(sUsuario,sUsuarioValida,sPeriodo);
                    if(true)
                    {
                        alert('Entro a abrir la segunda pantalla')
                        pantallaDetalle = new BrowserWindow({width:800,height:600});
                        pantallaDetalle.loadURL(url.format(
                             {
                                pathname: path.join(__dirname,'materias.html'),
                                protocol: 'file',
                                slashes: true
                              }
                        ));
                        pantallaDetalle.webContents.openDevTools();
                        pantallaDetalle.show();
                    }
                }
           }
       });
   }
    $('#btnIngresar').on("click",validarLogueo);
}
$(document).ready(inicia);

function obtenerDatosPorGrupo(sUsuario,sUsuarioValida,sPeriodo)
{
    var respuesta = false;
    var bRespuesta = false;
    var claveMateria;
    var grupo;
    var usuario;
    var materia;
    var horalunes;
    var horamartes;
    var horamiercoles;
    var horajueves;
    var horaviernes;
    $.ajax({
        url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienegrupos2.php?usuario='+sUsuario+'&usuariovalida='+sUsuarioValida+'&periodoactual='+sPeriodo,
        dataType: 'json',
        success: function(data)
        {
            bRespuesta = data.respuesta;
            if(bRespuesta)
            {
                for(var i=0;i<3;i++)
                {
                    claveMateria = data.grupos[i].clavemateria;
                    grupo = data.grupos[i].grupo;
                    usuario = data.grupos[i].usuario;
                    materia = data.grupos[i].materia;
                    horalunes = data.grupos[i].horalunes;
                    horamartes = data.grupos[i].horamartes;
                    horamiercoles = data.grupos[i].horamiercoles;
                    horajueves = data.grupos[i].horajueves;
                    horaviernes = data.grupos[i].horaviernes;
                    materias[i] = new datosPorMaestro(claveMateria,grupo,usuario,materia,horalunes,horamartes,horamiercoles,horajueves,horaviernes);
                }
               // alert('Se guardaron datos de materias');
               respuesta = true;
            }
            else
            {

            }
        }
    });
    return respuesta;
}