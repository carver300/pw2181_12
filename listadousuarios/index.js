const $ = require('jquery');
const {BrowserWindow} = require('electron').remote
const app = require('electron').app
//Ruta de sistema de archivos
const path = require('path');
//url de las paginas que se van a cargar
const url = require('url');

let pantallaDetalle;

function inicia()
{
	var resultado = "";
	var nombre = "";
	var foto = "";

	$.ajax({
		url: 'https://randomuser.me/api/?results=20',
		dataType: 'json',
		success: function(data)
		{
			for(var i=0;i<20;i++)
			{
				nombre = data.results[i].name.first+" "+data.results[i].name.last;
				foto = data.results[i].picture.medium;
				resultado = "<li><img src="+foto+">"+nombre+"<button id="+i+">Detalle</button>"
				$("#lstUsuarios").append(resultado);
			}
		}
	});
}

function botonDetalle()
{
	alert(this.id);
}

$("body").on("click","li > button",botonDetalle);
inicia();


