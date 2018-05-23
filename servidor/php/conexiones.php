<?php

    function conecta()
    {
        //Servidor,usuario,contrasena,base de datos
        $con = mysqli_connect("127.0.0.1","root","","pw218112");
        return $con;
    }
?>