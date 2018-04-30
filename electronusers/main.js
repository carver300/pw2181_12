//Aplicación General
const app = require('electron').app;
//Uso de pantallas del sistema
const BrowserWindow = require('electron').BrowserWindow;
//Ruta de la carpeta base
const path = require('path');
//Url de las paginas
const url = require('url');
//ECMASCRIPT 6 - JS
let PantallaPrincipal;

function muestraPantallaPrincipal()
{
	PantallaPrincipal = new BrowserWindow({width:620,height:825});
	PantallaPrincipal.loadURL(url.format({
		//join: concatenar cadenas
		pathname: path.join(__dirname,'index.html'),
		protocol: 'file',
		slashes: true

	}));
	PantallaPrincipal.show();
}
app.on('ready',muestraPantallaPrincipal);