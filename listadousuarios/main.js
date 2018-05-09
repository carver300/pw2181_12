//Cuando se pone entre llaves significa que el paquede de lado izquierdo es igual al de derecho
//BrowserWindow es la constante de acceso al uso de ventanas
const {app,BrowserWindow} = require('electron');
//Ruta de sistema de archivos
const path = require('path');
//url de las paginas que se van a cargar
const url = require('url');

//Pantalla principal, let es una constante que cuando toma un valor ya no se puede cambiar
let pantallaPrincipal;

function muestraPantallaPrincipal()
{
	//Se define el tamaño de la pantalla
	pantallaPrincipal = new BrowserWindow({width:320,height:425});
	pantallaPrincipal.loadURL(url.format({
		pathname: path.join(__dirname,'index.html'), //dirname es la carpeta en la que se esta trabajando y se define que se carga index.html
		protocol: 'file', //Se define como archivo el protocolo porque sera lo que vamos a usar
		slashes: true //Se toma encuenta si tiene diagonales.
	}))
	//Herramientas de desarrollo
	pantallaPrincipal.webContents.openDevTools();

	//Se muestra la pantalla
	pantallaPrincipal.show();
}

//Se inicializa la aplicacion
app.on('ready',muestraPantallaPrincipal)