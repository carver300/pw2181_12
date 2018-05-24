<?php
include 'conexiones.php';

    function valida()
    {
        $respuesta = false;
        $usuario = $_POST["usuario"];
        $clave = md5($_POST["clave"]);
        //Conectarnos al servidor de base de datos
        $con = conecta();
        $consulta = "select * from usuarios where usuario= '".$usuario."' and clave= '".$clave."' limit 1";
        $resConsulta = mysqli_query($con,$consulta);
        if (mysqli_num_rows($resConsulta) > 0) {
            $respuesta = true;
        }

        $salidaJSON = array('respuesta' => $respuesta );
        print json_encode($salidaJSON);
    }
   

    $opcion = $_POST["opcion"];
    switch ($opcion) {
        case 'validaentrada':
            valida();
            break;
        default:
            # code...
            break;
    }
?>