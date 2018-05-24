<?php
include 'conexiones.php';

    function buscarusuario()
    {
        $respuesta = false;
        $usuario = $_POST["usuario"];
        //Conectarnos al servidor de base de datos
        $con = conecta();
        $consulta = "select usuario,nombre,clave from usuarios where usuario= '".$usuario."' limit 1";
        $resConsulta = mysqli_query($con,$consulta);
        $nombre = "";
        $clave = "";
        if (mysqli_num_rows($resConsulta) > 0) {
            $respuesta = true;
            while($regConsulta=mysqli_fetch_array($resConsulta))
            {
                $nombre = $regConsulta["nombre"];
                $clave = $regConsulta["clave"];
            }
        }

        $salidaJSON = array('respuesta' => $respuesta,
                            'nombre'    => $nombre,
                            'clave'     => $clave );
        print json_encode($salidaJSON);
    }
   

    $opcion = $_POST["opcion"];
    switch ($opcion) {
        case 'buscarUsuario':
        buscarusuario();
            break;
        default:
            # code...
            break;
    }
?>