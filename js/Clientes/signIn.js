/**
 * @author Sergio Alcolea
 * @description Validacion de datos de un formulario login con el uso de jquery y javascript
 * 
 */

$(document).ready(function () {
    $.validator.addMethod("formAlphanumeric", function (value, element) {
        var pattern = /^[\w]+$/i;
        return this.optional(element) || pattern.test(value);
        //nombre: { required: true, minlength: 2, formAlphanumeric: true}
    });
    //Variable donde guardaremos el nombre antiguo.
    var oldname;
    //Escucha del eveto del html padre
    window.addEventListener('message', recibirCliente, false);
    function recibirCliente(e){
        modCliente= e.data;
        oldname= modCliente.name;
        $("#name").val(modCliente.name);
        $("#userName").val(modCliente.user_name);
        $("#email").val(modCliente.email);
        $("#pwd").val(modCliente.pwd);
        $("#pais").val(modCliente.pais);
        $("#ciudad").val(modCliente.ciudad);
        $("#direccion").val(modCliente.direccion);
        $("#fechaNacimiento").val(modCliente.born_date);
    }
    //Modificar cliente
    $("#btnMod").click( function(){
        client={
                'method': 'update',
                'tabla' : 'clientes',
                'oldname' : oldname,
                'name' : $("#name").val(),
                'user_name' : $("#userName").val(),
                'email' : $("#email").val(),
                'pwd' : $("#pwd").val(),
                'pais' : $("#pais").val(),
                'ciudad' : $("#ciudad").val(),
                'direccion' : $("#direccion").val(),
                'born_date' : $("#fechaNacimiento").val(),
        };
        sendCliente(client);
    });
    //Insertar cliente
    $("#submit").click( function(){
        client={
                'method': 'insert',
                'tabla' : 'clientes',
                'name' : $("#name").val(),
                'user_name' : $("#userName").val(),
                'email' : $("#email").val(),
                'pwd' : $("#pwd").val(),
                'pais' : $("#pais").val(),
                'ciudad' : $("#ciudad").val(),
                'direccion' : $("#direccion").val(),
                'born_date' : $("#fechaNacimiento").val(),
        };
        sendCliente(client);
        // conect.setRequest(client);
        // conect.callServer();
        // alert("Datos Enviados");
        // location.reload();
    });
    function sendCliente(client){
        var conect= new clsConection;
        conect.setRequest(client);
        conect.callServer();
        alert("Datos Enviados");
        location.reload();
    }
    $("#basic-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
            },
            userName: {
                required: true,
                minlength: 5,
                formAlphanumeric: true
            },
            email: {
                required: true,
                email: true
            },
            pwd: {
                required: true,
                formAlphanumeric: true,
                minlength: 8
            },
            ciudad: {
                minlength: 3
            },
            pais: {
                required: true,
                minlength: 3
            },
            direccion: {
                required: true,
                minlength: 10,
            },
            fechaNacimiento: {
                required: true,
                date:true
            }
        },
        onkeyup: function( ) {
			this.checkForm();
			
            if (this.valid()) {
                $('#submit').removeAttr("disabled");
                $('#btnMod').removeAttr("disabled"); 
                alert("Todos los campos son correctos")
            } else {
                $('#submit').attr("disabled", true);
            }
	    }
    })
});