$(document).ready(function () {

    $('#login').click(function(){
        user= $('#user').val();
        pwd= $('#pwd').val();
        console.log(pwd);
        log={
            'method': 'login',
            'tabla' : 'users',
            'campo' : '*',
            'name' : user,
            'pwd' : pwd 
        }
        var conexion= new clsConection;
        conexion.setRequest(log);
        conexion.callServer();

        var respons= conexion.getRespuesta();
        alert(respons.info);
        if(respons.user == 'admin'){
            loginOK();
            clsCookies.DeleteCookie('Sesion');
            clsCookies.WriteCookie("Sesion", 'admin');
        }
        if(respons.user == 'consult'){
            loginOK();
            clsCookies.DeleteCookie('Sesion');
            clsCookies.WriteCookie("Sesion", 'consult');
        }
        location.reload();
    });
    if(clsCookies.ReadCookie('Sesion') == 'admin' || 
        clsCookies.ReadCookie('Sesion') == 'consult'){
        loginOK();
    }
    
    $('#page').change(vista);
    $( "#moto" ).show(2000);
    moveMoto();
    var origin= true;
    $( "#moto" ).hover(
        function () {
            if(origin == true){
                $( "#moto" ).css({"transform": "rotateX(180deg)"})
                origin=false;
            }else{
                $( "#moto" ).css({"transform": "rotateX(0deg)"})
                origin= true;
            }
        }
    );
    //modificarCuenta
    document.addEventListener('modificar', recibirDatos, false);
});

function loginOK(){
    console.log("Login OK");
    $("#page").removeAttr("disabled");
    $('#left').attr("hidden", false);
}
function recibirDatos(e){
    objeto=e.detail;
    //console.log(e.detail);
    $("#page").val("");
    modificar();
    document.getElementById('modify').contentWindow.postMessage(objeto, "*");
}

function modificar(){
    $('#right').attr("hidden", true);
    $('#left').attr("hidden", true);
    $('#modify').attr("hidden", false);
}
function vista(){
    pagina= $(this).val();
    if(pagina == 1){
        $('#right').attr("hidden", true);
        $('#modify').attr("hidden", true);
        $('#left').attr("hidden", false);
    }else{
        if(clsCookies.ReadCookie('Sesion') == 'admin'){
            $('#left').attr("hidden", true);
            $('#modify').attr("hidden", true);
            $('#right').attr("hidden", false);
        }else{
            alert("No tienes permisos");
            $("#page").val("1");
        }
        
    }
    console.log(pagina);
}

function moveMoto(){
    $( ".moto" ).animate({ "left": "-=500px" }, "fast" );
}