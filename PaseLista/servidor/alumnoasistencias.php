<?php
include "conexiones.php";
function guardarusuario(){
    $respuesta = false;
    $periodo = GetSQLValueString($_GET["periodo"],"text");
	$numeroControl=GetSQLValueString( $_GET["numerocontrol"],"text");
	$clavemateria=GetSQLValueString( $_GET["clavemateria"],"text");
    $grupo =GetSQLValueString($_GET["grupo"],"text");
    $asistencias = GetSQLValueString($_GET["asistencias"],"text");

	$con=conecta();
	//$consulta ="select * from usuarios where usuario = '".$usuario."' and clave='".$clave."' limit 1";
	$consulta=sprintf("select * from reportealumnos where ncontrol = %s and periodo = %s",$numeroControl,$periodo);
	$resConsulta=mysqli_query($con,$consulta);
	$consultaGuarda = "";
	//si ya esxiste en la tabla el usuario
	if(mysqli_num_rows($resConsulta) > 0){
		$consultaGuarda= sprintf("update reportealumnos set asistencias = %i where ncontrol = %s and periodo = %s",$asistencias,$numeroControl,$periodo);
	}else{
		$consultaGuarda = sprintf("insert into reportealumnos (periodo,ncontrol,materia,grupo,asistencias) values(default,%s,%s,%s,%s,%s,%i)",$periodo,$numeroControl,$clavemateria,$grupo,$asistencias);
	}
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
		case 'guardarUsuario':
			guardarusuario();
			break;
		
		default:
			# code...
			break;
	}

?>