var $ = require('jquery');


var sUsuario;
var sContraseña;
var bRespuesta;
var sUsuarioValida;
var sPeriodo;

var inicia = function()
{
   var validarLogueo = function()
   {
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
                    alert("correcto");
                }
           }
       });
   }
    $('#btnIngresar').on("click",validarLogueo);
}
$(document).ready(inicia);