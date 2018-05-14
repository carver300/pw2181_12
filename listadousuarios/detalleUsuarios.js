const $ = require('jquery')

var nombre = require('electron').remote.getGlobal('infoUsuarios').nombre = usuarios[this.id].nombre;
var genero = require('electron').remote.getGlobal('infoUsuarios').genero = usuarios[this.id].genero;
var foto = require('electron').remote.getGlobal('infoUsuarios').foto = usuarios[this.id].foto;
var direccion = require('electron').remote.getGlobal('infoUsuarios').direccion = usuarios[this.id].direccion;
var telefono = require('electron').remote.getGlobal('infoUsuarios').telefono = usuarios[this.id].telefono;

$("#idNombre").html(nombre);
$("#idGenero").html(genero);
$("#idFoto").html(foto);
$("#idDireccion").html(direccion);
$("#idTelefono").html(telefono);