const $ = require('jquery');
const {BrowserWindow} = require('electron').remote
const app = require('electron').app
//Ruta de sistema de archivos
const path = require('path');
//url de las paginas que se van a cargar
const url = require('url');


//Constantes para el PDF
const ipc = require('electron').ipcRenderer
const botonPDF = document.getElementById('btnPdf')
botonPDF.addEventListener('click',function(event)
{
    botonPDF.style.display = 'none'
    ipc.send('print-to-pdf')
})

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

cargarDatos();

var materias;
//Funcion para mandar los datos al arreglo
function datos(usuario,clave,periodo,claveMateria,grupo){
    this.usuario=usuario;
    this.clave=clave;
    this.periodo=periodo;
    this.claveMateria=claveMateria;
    this.grupo=grupo;
}

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
                    lunes = data.grupos[j].horalunes;
                    martes = data.grupos[j].horamartes;
                    miercoles = data.grupos[j].horamiercoles;
                    jueves = data.grupos[j].horajueves;
                    viernes = data.grupos[j].horaviernes;
                    //Metemos valores en la lista del documento materias.html
                    resultado = "<tr id="+i+" >"+
                                "<td>"+claveMateria+"</td>"+
                                "<td>"+grupo+"</td>"+
                                "<td>"+nombre+"</td>"+
                                "<td>"+lunes+"</td>"+
                                "<td>"+martes+"</td>"+
                                "<td>"+miercoles+"</td>"+
                                "<td>"+jueves+"</td>"+
                                "<td>"+viernes+"</td>"+
                                "<td><span><button id="+i+" class='btn btn-lg btn-primary'>Ver Grupo</button></span>"
                    $("#tbMaterias").append(resultado);
                    materias[i] = new datos(usuario,clave,periodo,claveMateria,grupo);
                    j++;
                }
            }
           
        }
    });

}

$("body").on("click","td > span > button", verGrupo);
function verGrupo()
{
    alert(this.id);
    alert(materias[this.id].usuario)
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