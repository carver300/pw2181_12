<?php
include "conexiones.php";

function guardarusuario(){
	echo "Se inicio el php";
    $respuesta = false;
    $periodo = GetSQLValueString($_GET["periodo"],"text");
	$numeroControl=GetSQLValueString( $_GET["numerocontrol"],"text");
	$nombre = GetSQLValueString( $_GET["nombre"],"text");
	$clavemateria=GetSQLValueString( $_GET["clavemateria"],"text");
    $grupo =GetSQLValueString($_GET["grupo"],"text");
    $faltas = GetSQLValueString($_GET["faltas"],"int");
	echo "tomaeste valores";
	
	$con=conecta();
	//$consulta ="select * from usuarios where usuario = '".$usuario."' and clave='".$clave."' limit 1";
	$consulta=sprintf("select * from reportealumnos where ncontrol = %s and periodo = %s",$numeroControl,$periodo);
	$resConsulta=mysqli_query($con,$consulta);
	$consultaGuarda = "";
	//si ya esxiste en la tabla el usuario
	if(mysqli_num_rows($resConsulta) > 0){
		$consultaGuarda= sprintf("update reportealumnos set faltas = %u where ncontrol = %s and materia = %s",$faltas,$numeroControl,$clavemateria);
	}else{
		$consultaGuarda = sprintf("insert into reportealumnos (identificador,periodo,ncontrol,nombre,materia,grupo,faltas) values(default,%s,%s,%s,%s,%s,%u)",$periodo,$numeroControl,$nombre,$clavemateria,$grupo,$faltas);
	}
	echo $asistencias."/n";
	echo $consultaGuarda;
	mysqli_query($con,$consultaGuarda);
	if(mysqli_affected_rows($con)>0){
		$respuesta = true;
	}

	$salidaJSON = array('respuesta' => $respuesta);
	//var_dump($salidaJSON);
	print json_encode($salidaJSON);
}

	$opc=$_GET['opc'];
	switch ($opc) {
		case 'guardarusuario':
			guardarusuario();
			break;
		
		default:
			# code...
			break;
	}

?>