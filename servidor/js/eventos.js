var inicioApp = function()
{
    var Aceptar = function()
    {
        var usuario = $("#txtUsuario").val();
        var clave = $("#txtClave").val();
        var parametros = "opcion=validaentrada"+
                         "&usuario="+usuario+
                         "&clave="+clave+
                         "&aleatorio="+Math.random();
        $.ajax({
            cache:false,
            type: "POST",
            dataType: "json",
            url: "php/validaentrada.php",
            data: parametros,
            success: function(response)
            {
                if (response.respuesta == true) {
                    //Ocultamos el inicio
                    $("#secInicio").hide("slow");
                    //Aparecemos usuarios
                    $("#frmUsuarios").show("slow");
                    //Cursos en el primer cuadro de texto
                    $("#txtNombreUsuario").focus();
                }
                else
                {
                    alert("usuario o clave incorrecta(s)");
                }

            },
            error: function(xhr,ajaxOptions,thrownError)
            {

            }
        });
    }

    var Guardar = function()
    {
        var usuario = $("#txtNombreUsuario").val();
        var nombre = $("#txtNombre").val();
        var parametros = "opc=guardarUsuario"+
                        "&usuario="+usuario+
                        "&clave="+clave+
                        "&aleatorio="+Math.random();
        if(usuario != "" && nombre != "" && clave !="")
        {
            $.ajax({
                cache:false,
                type: "POST",
                dataType: "json",
                url:"php/guardarusuario.php",
                data: parametros,
                success: function(response)
                {
                    if (response.respuesta == true)
                    {

                    }
                },
                error: function(xhr,ajaxOptions,thrownError)
                {

                }

            });
        }
        else
        {
            alert("Llene todos los campos");
        }
    }

    var Borrar = function()
    {
        var usuario = $("#txtNombreUsuario").val();
        var nombre = $("#txtNombre").val();
        var pregunta = prompt("Seguro que quiere borrar a "+nombre+" ? (si/no)", "no");

        if(pregunta != null && pregunta == "si")
        {
            //Aqui va el ajax
        }
    }

    var teclaNombreUsuario = function(tecla)
    {
        if(tecla.which == 13)
        {
            buscarUsuario();
        }
    }

    var buscarUsuario = function()
    {
        var usuario = $("#txtNombreUsuario").val();
        var parametros = "opc=buscarUsuario"+
                         "&usuario="+usuario+
                         "&aleatorio="+Math.random();
        if(usuario != "")
        {
            $.ajax({
                cache:false,
                type: "POST",
                dataType: "json",
                url: "php/buscarusuario.php",
                data: parametros,
                success: function(response)
                {
                    if (response.respuesta == true) {
                       $("#txtNombre").val(response.nombre);
                       $("#txtClaveUsuario").val(response.clave);

                    }
                    else
                    {
                        $("txtNombre").focus();
                    }
    
                },
                error: function(xhr,ajaxOptions,thrownError)
                {
    
                }
            });
        }
    }

    $("#btnAceptar").on("click",Aceptar);
    $("#txtNombreUsuario").on("keypress",teclaNombreUsuario);
    $("#btnGuardar").on("click",Guardar);
    $("#btnBorrar").on("click",Borrar);
}


$(document).ready(inicioApp);