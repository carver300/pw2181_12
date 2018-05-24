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
}


$(document).ready(inicioApp);