const $ = require('jquery')

var usuario = require('electron').remote.getGlobal('datosUsuario').usuario;
var usuarioValida = require('electron').remote.getGlobal('datosUsuario').usuarioValida;
var clave = require('electron').remote.getGlobal('datosUsuario').clave;
var periodo = require('electron').remote.getGlobal('datosUsuario').periodo;
var materia = require('electron').remote.getGlobal('datosUsuario').materia;
var grupo = require('electron').remote.getGlobal('datosUsuario').grupo;

var alumnos;

function datos(numeroControl,apellidoPaterno,apellidoMaterno,nombre)
{
    this.numeroControl = numeroControl;
    this.apellidopaterno = apellidoPaterno;
    this.apellidomaterno = apellidoMaterno;
    this.nombre = nombre;
}

cargarListaAlumnos();

function cargarListaAlumnos()
{
    var respuesta;
    var cantidad;
    var numeroControl;
    var apellidoPaterno;
    var apellidoMaterno;
    var nombre;
    $.ajax({
        url:'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienealumnos2.php?usuario='+usuario+'&usuariovalida='+usuarioValida+'&periodoactual='+periodo+'&materia='+clave+'&grupo='+grupo,
        dataType: 'json',
        success: function(data){
            respuesta = data.respuesta;
            if(respuesta){
                //Crear variable para saber cuantos alumnos hay
                cantidad = data.alumnos[0].cantidad;
                //Para almacenar los datos de los alumnos
                alumnos = new Array(cantidad);
                verde = numeroControl;
                var j=1;
                for (var i = 0; i < cantidad; i++) {
                    numeroControl = data.alumnos[j].nombre;
                    apellidoPaterno = data.alumnos[j].apellidopaterno;
                    apellidoMaterno = data.alumnos[j].apellidomaterno;
                    nombre = data.alumnos[j].nombre;
                    //Metemos valores en la lista del documento materias.html
                    resultado = "<tr id="+i+" >"+
                                "<td>"+numeroControl+"</td>"+
                                "<td>"+apellidoPaterno+"</td>"+
                                "<td>"+apellidoMaterno+"</td>"+
                                "<td>"+nombre+"</td>"+
                                "<td><span><button id="+i+" class='btn btn-lg btn-primary'>Asistencia</button></span>"+
                                "<td><span><button id="+i+" class='btn btn-lg btn-primary'>Falta</button></span>"
                    $("#tbAlumnos").append(resultado);
                    alumnos[i] = new datos(numeroControl,apellidoPaterno,apellidoMaterno,nombre);
                    j++;
                }
            }
            else
            {
                alert('no entro')
            }
           
        }
    });

}