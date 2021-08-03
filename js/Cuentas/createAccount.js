/**
 * @author Sergio Alcolea
 * @description Validacion de datos de un formulario con el uso de jquery y javascript
 */
/**
 * @method formAlphanumeric
 * @description Controla que se hayan introducido solo valores alphaNumericos.
 */
/**
 * @method link
 * @description Controla que se hayan introducido una url.
 */

$(document).ready(function () {
    $.validator.addMethod("formAlphanumeric", function (value, element) {
        var pattern = /^[\w]+$/i;
        return this.optional(element) || pattern.test(value);
    });
    $.validator.addMethod("link", function (value, element) {
        var pattern = /^[a-zA-Z]+\.[a-z]{2,3}$/i;
        return this.optional(element) || pattern.test(value);
    });

    //Variable donde guardaremos el nombre antiguo.
    var oldname;
    //Escucha del eveto del html padre
    window.addEventListener('message', recibirCuenta, false);
    /**
     * @function recibirCuenta
     * @description Captura el objeto cliente que es enviado 
     * desde el otro iframe y pinta los datos de este en el html
     * @param {objeto} e 
     */
    function recibirCuenta(e){
        modCuenta= e.data;
        //console.log(modCuenta);
        oldname= modCuenta.name;
        $("#link").val(modCuenta.link);
        $("#user").val(modCuenta.user_name);
        $("#email").val(modCuenta.email);
        $("#money").val(modCuenta.money);
        $("#pwd").val(modCuenta.pwd);
        $("#coment").val(modCuenta.comentario);
    }
    //Modificar cuenta
    $("#btnMod").click( function(){
        account={
                'method': 'update',
                'tabla' : 'cuentas',
                'oldname' : oldname,
                'link' : $("#link").val(),
                'user_name' : $("#user").val(),
                'email' : $("#email").val(),
                'money' : $("#money").val(),
                'pwd' : $("#pwd").val(),
                'comentario' : $("#coment").val()
        };
        sendAccount(account);
    });
    //Insertar cuenta
    $("#submit").click( function(){
        account={
                'method': 'insert',
                'tabla' : 'cuentas',
                'link' : $("#link").val(),
                'user_name' : $("#user").val(),
                'email' : $("#email").val(),
                'money' : $("#money").val(),
                'pwd' : $("#pwd").val(),
                'comentario' : $("#coment").val()
        };
        sendAccount(account);
    });
    //Manda los datos a la datebase
    /**
     * @function sendAccount
     * @description Envia el contenido a la base de datos
     * @param {objeto} account 
     */
    function sendAccount(account){
        var conect= new clsConection;
        conect.setRequest(account);
        conect.callServer();
        alert("Datos Enviados");
        location.reload();
    }
    //////////////////////////////////////////
    $("#test").validate({
        rules: {
            link: {
                required: true,
                minlength: 6,
                link: true
            },
            user: {
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
            money: {
                required: true,
                minlength: 2
            }
        },
        onkeyup: function( ) {
			this.checkForm();
			 if (this.valid()) { 
				 $('#submit').removeAttr("disabled");
				 alert("Todos los campos son correctos")
			 } else {
				 $('#submit').attr("disabled", true);
			 }
	    },
		messages: {
			link: {
				link: "El link debe contener un nombre de dominio con un top level domain separado mediante un punto simple",
                minlength: "Escribe al menos 6 caracteres, Tu puedes!!"
			},
			user: {
				required: "Debes intriducir un User",
                minlength: "Otra vez escribiendo poco? Haz un esfuerzo, que es GRATIS!!"
			},
			email: {
				email: "El email debe seguir el siguiente formato: example@domain.lol"
			},
			pwd: {
				required: "Debes introducir una contraseña. ",
				minlength: "La contraseña debe contener al menos 8 caracteres",
			},
			money: {
				required: "Debes introducir algún valor.",
				minlength: "Seguro que tienes algo más, pon al menos dos cifras"
            }
		}
    })
});