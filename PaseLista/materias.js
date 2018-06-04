const $ = require('jquery');
const {BrowserWindow} = require('electron').remote
const app = require('electron').app
//Ruta de sistema de archivos
const path = require('path');
//url de las paginas que se van a cargar
const url = require('url');


//Constantes para el PDF
const ipc = require('electron').ipcRenderer;
const botonPDF = document.getElementById('btnPdf');


global.datosUsuario =
{
    usuario: '',
    usuarioValida: '',
	periodo:'',
	clave: '',
	materia: '',
    grupo: ''
}

var usuario = require('electron').remote.getGlobal('datosUsuario').usuario;
var clave = require('electron').remote.getGlobal('datosUsuario').usuarioValida;
var periodo = require('electron').remote.getGlobal('datosUsuario').periodo;
var materias;  //Arreglo de materias
var asistencias = 0;
var faltas = 0;
var respuesta = false;

//Funcion para mandar los datos al arreglo
function datos(usuario,clave,periodo,claveMateria,grupo){
    this.usuario=usuario;
    this.clave=clave;
    this.periodo=periodo;
    this.claveMateria=claveMateria;
    this.grupo=grupo;
}


$("#btnPdf").hide();
$("#seccMaterias").hide();
var iniciar = function ()
{
   
    cargarDatos();
    
    if (respuesta)
    {
       alert("Se encontraron grupos para el usuario: "+usuario+" se procede con la carga")
       $("#seccMaterias").show('slow');
       $("#btnPdf").show('slow');
    }
    else
    {
        alert("Ocurrio un error durante la consulta de la informacion de los grupos");
    }
    $("body").on("click","td > span > button", verGrupo);
    
    botonPDF.addEventListener('click',function(event)
    {
    $("#tbMaterias>tr>td>span>button").hide();
    botonPDF.style.display = 'none'
    ipc.send('print-to-pdf')
    })
    
}
$(document).ready(iniciar);


//******************************************Funciones******************************************/
//Funciones para cargar los datos de los grupos en la pagina
function cargarDatos()
{    
    var claveMateria = "";
    var grupo = "";
    var resultado = "";
    var nombre = "";
    var lunes = "";
    var martes = "";
    var miercoles = "";
    var jueves = "";
    var viernes ="";
    
    $.ajax({
        url:'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienegrupos2.php?usuario='+usuario+'&usuariovalida='+clave+'&periodoactual='+periodo,
        dataType: 'json',
        async:false,
        success: function(data){
            if(data.respuesta){
                //Crear variable para saber cuantos grupos tiene
                var grupos = data.grupos[0].cantidad;
                //Crear arreglo para almacenar todos los grupos del maestro.
                materias = new Array(grupos);
                var j=1;
                for (var i = 0; i < grupos; i++) {
                    claveMateria  = data.grupos[j].clavemateria;
                    grupo = data.grupos[j].grupo;
                    nombre = data.grupos[j].materia;
                    asistenciasPorGrupo(usuario,clave,periodo,claveMateria,grupo);
                    faltasPorGrupo(usuario,clave,periodo,claveMateria,grupo);
                    //Metemos valores en la lista del documento materias.html
                    resultado = "<tr id="+i+" >"+
                                "<td>"+claveMateria+"</td>"+
                                "<td>"+grupo+"</td>"+
                                "<td>"+nombre+"</td>"+
                                "<td>"+asistencias+"</td>"+
                                "<td>"+faltas+"</td>"+
                                "<td><span><button id="+i+" class='btn btn-lg btn-primary'>Ver Grupo</button></span>"
                    $("#tbMaterias").append(resultado);
                    materias[i] = new datos(usuario,clave,periodo,claveMateria,grupo);
                    j++;
                }
                return  respuesta = true;
            }
            else
            {
                return respuesta = false;
            }
           
        },
        error: function(xhr,ajaxOptions,thrownError)
        {

        }
    });
}

//Funcion para ver los alumnos que tiene un grupo
function verGrupo()
{
	require('electron').remote.getGlobal('datosUsuario').usuario = materias[this.id].usuario;
	require('electron').remote.getGlobal('datosUsuario').clave = materias[this.id].claveMateria;
	require('electron').remote.getGlobal('datosUsuario').periodo = materias[this.id].periodo;
	require('electron').remote.getGlobal('datosUsuario').materia = materias[this.id].materia;
	require('electron').remote.getGlobal('datosUsuario').grupo = materias[this.id].grupo;
	pantallaDetalle = new BrowserWindow({width:800,height:600});
	pantallaDetalle.loadURL(url.format(
		{
			pathname: path.join(__dirname,'alumnos.html'),
			protocol: 'file',
			slashes: true
		}
	));
	pantallaDetalle.webContents.openDevTools();
	pantallaDetalle.show();

}

//Funcion para ver el total de asistencias que tenga un grupo
function asistenciasPorGrupo(usuario,usuarioValida,periodo,claveMateria,grupo)
{
    $.ajax({
        url:'http://itculiacan.edu.mx/dadm/apipaselista/data/cantidadasistenciasgrupo.php?usuario='+usuario+'&usuariovalida='+usuarioValida+'&periodoactual='+periodo+'&materia='+claveMateria+'&grupo='+grupo,
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
}

//Funcion para ver el total de faltas que tenga un grupo
function faltasPorGrupo(usuario,usuarioValida,periodo,claveMateria,grupo)
{
    $.ajax({
        url:'http://itculiacan.edu.mx/dadm/apipaselista/data/cantidadfaltasgrupo.php?usuario='+usuario+'&usuariovalida='+usuarioValida+'&periodoactual='+periodo+'&materia='+claveMateria+'&grupo='+grupo,
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





