
//Variables para los webworkers
var wbCirculo,wbEquis;
var iTurno = 0;
var inicia = function() 
{
	
	var jugar = function()
	{
		alert("click en iniciar");
		//Preguntamos si se soportan workers
		if (iTurno == 0)
		{
			if (iTurno = 0)
			{
			//Preguntamos si nuestra variable de webwokers no esta indefinida
				if (typeof(wbCirculo) != "undefined")
				{
					wbCirculo = new Worker("js/demoWorker.js");
					wbCirculo.onmessage = function(event)
					{
						$("#tiempoCirculo").html(event.data);
					};
				}
			}
		}
		else
		{
			$("#tiempoCirculo").html("No se soportan workers");
		}
	}
	$("#btnIniciar").on("click",jugar);
}
$(document).ready(inicia);




function drop(event)
{
	event.preventDefault();
	var data=event.dataTransfer.getData("text");
	event.target.appendChild(document.getElementById(data));
}
function drag (event)
{
	event.dataTransfer.setData("text",event.target.id);
}
function allowDrop(event)
{
	//Permita que el objeto caiga sobre el
	event.preventDefault();
}
