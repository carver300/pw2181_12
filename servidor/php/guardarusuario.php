<?php
include "conexiones.php";
function guardarusuario(){
	$respuesta = false;
	$usuario=GetSQLValueString( $_POST["usuario"],"text");
	$nombre=GetSQLValueString( $_POST["nombre"],"text");
	$clave =GetSQLValueString( md5($_POST["clave"]),"text");

	$con=conecta();
	//$consulta ="select * from usuarios where usuario = '".$usuario."' and clave='".$clave."' limit 1";
	$consulta=sprintf("select usuario from where usuario = %s",$usuario);
	$resConsulta=mysqli_query($con,$consulta);
	$consultaGuarda = "";
	//si ya esxiste en la tabla el usuario
	if(mysqli_num_rows($resConsulta) > 0){
		$consultaGuarda= sprintf("update usuarios set nombre = %s, clave= %s where usuario = %s",$nombre,$clave,$usuario);
	}else{
		$consultaGuarda = sprintf("insert into usuarios values(default,%s,%s,%s",$usuario,$nombre,$clave);
	}
	mysqli_query($con,$consultaGuarda);
	if(mysqli_affected_rows($con)>0){
		$respuesta = true;
	}

	$salidaJSON = array('respuesta' => $respuesta);
	//var_dump($salidaJSON);
	print json_encode($salidaJSON);
}

	$opc=$_POST['opc'];
	switch ($opc) {
		case 'guardarUsuario':
			guardarusuario();
			break;
		
		default:
			# code...
			break;
	}

?>