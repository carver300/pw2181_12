const $ = require('jquery');
const {BrowserWindow} = require('electron').remote
const app = require('electron').app
//Ruta de sistema de archivos
const path = require('path');
//url de las paginas que se van a cargar
const url = require('url');

let pantallaDetalle;

var sUsuario;
var sContraseña;
var bRespuesta;


global.datosUsuario =
{
    usuario: '',
    usuarioValida: '',
	periodo:'',
	clave: '',
	materia: '',
    grupo: ''
}
function datos (usuario,usuarioValida,periodo)
{
    this.usuario = usuario;
    this.usuarioValida = usuarioValida;
    this.periodo = periodo;
}

var inicia = function()
{
   var validarLogueo = function()
   {
       var respuestaObtenerDatos = false;
       var sUsuario = $("#txtUsuario").val();
       var sContraseña = $("#txtClave").val();
       $.ajax({
           url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/validausuario.php?usuario='+sUsuario+'&clave='+sContraseña,
           dataType: 'json',
           success: function(data)
           {
                bRespuesta = data.respuesta;
                
                if (bRespuesta)
                {
                    alert(sUsuario);
                    require('electron').remote.getGlobal('datosUsuario').usuario = sUsuario;
                    require('electron').remote.getGlobal('datosUsuario').usuarioValida = data.usuariovalida;
                    require('electron').remote.getGlobal('datosUsuario').periodo = data.periodoactual;
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
       });
   }
    $('#btnAceptar').on("click",validarLogueo);
}
$(document).ready(inicia);
