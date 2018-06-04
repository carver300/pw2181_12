const $ = require('jquery');
const app = require('electron').app
//Ruta de sistema de archivos
const path = require('path');
//url de las paginas que se van a cargar
const url = require('url');


//Constantes para el PDF
const ipc = require('electron').ipcRenderer
const botonPDF = document.getElementById('btnPdf')


var usuario = require('electron').remote.getGlobal('datosUsuario').usuario;
var usuarioValida = require('electron').remote.getGlobal('datosUsuario').usuarioValida;
var clave = require('electron').remote.getGlobal('datosUsuario').clave;
var periodo = require('electron').remote.getGlobal('datosUsuario').periodo;
var claveMateria = require('electron').remote.getGlobal('datosUsuario').materia;
var grupo = require('electron').remote.getGlobal('datosUsuario').grupo;
var respuesta = false;
var asistencias = 0;
var faltas = 0;
var alumnos;

function datos(numeroControl,apellidoPaterno,apellidoMaterno,nombre)
{
    this.numeroControl = numeroControl;
    this.apellidopaterno = apellidoPaterno;
    this.apellidomaterno = apellidoMaterno;
    this.nombre = nombre;
}

$("#seccMaterias").hide();
$("#btnPdf").hide();
var iniciar = function()
{
    cargarListaAlumnos();


    if (true)
    {   
        alert("Se cargaran los datos del grupo");
        $("#seccMaterias").show('slow');
        $("#btnPdf").show('slow');
    }
    else
    {
        alert("Se encontro un problema con el servicio de informacion de los grupos, favor de reportarlo al administrador");
    }

    $("body").on("click","td > span > button", faltaAsistencia);
    
    botonPDF.addEventListener('click',function(event)
    {
        $("#tbAlumnos>tr>td>span>button").hide();
        botonPDF.style.display = 'none'
        ipc.send('print-to-pdf')
    })
}
$(document).ready(iniciar);

function cargarListaAlumnos()
{
    var cantidad;
    var numeroControl;
    var apellidoPaterno;
    var apellidoMaterno;
    var nombre;
    $.ajax({
        url:'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienealumnos2.php?usuario='+usuario+'&usuariovalida='+usuarioValida+'&periodoactual='+periodo+'&materia='+clave+'&grupo='+grupo,
        dataType: 'json',
        success: function(data){
            if(data.respuesta){
                //Crear variable para saber cuantos alumnos hay
                cantidad = data.alumnos[0].cantidad;
                //Para almacenar los datos de los alumnos
                alumnos = new Array(cantidad);
                verde = numeroControl;
                var j=1;
                var btnAsistencia = 10;
                var btnFalta = 50;
                for (var i = 0; i < cantidad; i++) {
                    numeroControl = data.alumnos[j].ncontrol;
                    apellidoPaterno = data.alumnos[j].apellidopaterno;
                    apellidoMaterno = data.alumnos[j].apellidomaterno;
                    nombre = data.alumnos[j].nombre;
                    asistenciasPorAlumno(usuario,usuarioValida,periodo,clave,grupo,numeroControl,nombre);
                    faltasPorAlumno(usuario,usuarioValida,periodo,clave,grupo,numeroControl,nombre);
                    //Metemos valores en la lista del documento materias.html
                    resultado = "<tr id="+i+" >"+
                                "<td>"+numeroControl+"</td>"+
                                "<td>"+apellidoPaterno+"</td>"+
                                "<td>"+apellidoMaterno+"</td>"+
                                "<td>"+nombre+"</td>"+
                                "<td>"+asistencias+"</td>"+
                                "<td>"+faltas+"</td>"+
                                "<td><span><button id="+i+" class='btn btn-lg btn-primary'>Asistencia</button></span>"+
                                "<td><span><button id="+btnFalta+" class='btn btn-lg btn-primary'>Falta</button></span>"
                    $("#tbAlumnos").append(resultado);
                    alumnos[i] = new datos(numeroControl,apellidoPaterno,apellidoMaterno,nombre);
                    j++;
                    btnFalta++;
                }
                return respuesta = true;
            }
            else
            {
                return respuesta = false;
            }
           
        }
    });

}

function asistenciasPorAlumno(usuario,usuarioValida,periodo,claveMateria,grupo,numeroControl,nombre)
{
    $.ajax({
        url:'http://itculiacan.edu.mx/dadm/apipaselista/data/cantidadasistenciasalumno.php?usuario='+usuario+'&usuariovalida='+usuarioValida+'&periodoactual='+periodo+'&materia='+claveMateria+'&grupo='+grupo+'&ncontrol='+numeroControl,
        dataType: 'json',
        async:false,
        success: function(data)
        {
            if(data.respuesta)
            {
                return asistencias =  data.cantidad;
               
            }
            else
            {
                alert("El servicio para la consulta de incidencias no se encuentra disponible por el momento")
            }
        }
    });
    $.ajax({
        cache:false,
        type: "GET",
        dataType: "json",
        async: false,
        url: 'http://localhost/apidelpenu/alumnoasistencias.php?periodo='+periodo+'&numerocontrol='+numeroControl+'&nombre='+nombre+'&clavemateria='+claveMateria+'&grupo='+grupo+'&asistencias='+asistencias+'&opc=guardarusuario',
        success: function(data)
        {
            if (data.respuesta)
            {
                alert('se guardo')
                return true;
            }
            else
            {
                alert("Problema al guardar/actualizar los datos del alumno");
            }
        },
        error: function(xhr,ajaxOptions,thrownError)
        {

        }
    })
}

function faltasPorAlumno(usuario,usuarioValida,periodo,claveMateria,grupo,numeroControl)
{
    $.ajax({
        url:'http://itculiacan.edu.mx/dadm/apipaselista/data/cantidadfaltasalumno.php?usuario='+usuario+'&usuariovalida='+usuarioValida+'&periodoactual='+periodo+'&materia='+claveMateria+'&grupo='+grupo+'&ncontrol='+numeroControl,
        dataType: 'json',
        async:false,
        success: function(data)
        {
            if(data.respuesta)
            {
                return faltas =  data.cantidad;
               
            }
            else
            {
                alert("El servicio para la consulta de incidencias no se encuentra disponible por el momento")
            }
        }
    });
}

function faltaAsistencia()
{
    var id = this.id;
    var incidencia;
    var numeroControl;
    //Si es mayor o igual a 50 es un boton de falta
    if(this.id >= 50)
    {
        incidencia = 2;
        id = id-50;
    }
    else
    {
        incidencia = 1;
    }
    numeroControl = alumnos[id].numeroControl;
    $.ajax({
        url:'http://itculiacan.edu.mx/dadm/apipaselista/data/asignaincidencia.php?usuario='+usuario+'&usuariovalida='+usuarioValida+'&periodoactual='+periodo+'&materia='+clave+'&grupo='+grupo+'&ncontrol='+numeroControl+'&incidencia='+incidencia,
        dataType: 'json',
        success: function(data){
            if(data.respuesta)
            {
                if(incidencia == 2)
                {
                    alert('Se capturo una falta para el numero de control: '+numeroControl);
                }
                else
                {
                    alert('Se capturo una asistencia para el numero de control: '+numeroControl);
                }
            }
            else
            {
                alert('Se encontro un error al autenticar los datos, favor de reportarlo con el administrador');
            }
           
        }
    });
}