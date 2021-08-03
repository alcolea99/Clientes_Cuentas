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
    $( "#pedobear" ).show(2000);
    moveLeft();
    $( "#pedobear" ).hover(
        function () {
            $( "#pedobear" ).css({"transform": "rotateX(180deg)"})
        },
        function (){
            $( "#pedobear" ).css({"transform": "rotateX(360deg)"})
        }
    );
    setTimeout(function(){ $( "#child" ).hide(2000); }, 4000);
    //modificarCuenta
    document.addEventListener('modificarCuenta', recibirDatos, false);


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
    document.getElementById('modifyCuenta').contentWindow.postMessage(objeto, "*");
    console.log("manda mensaje");
}

function modificar(){
    $('#right').attr("hidden", true);
    $('#left').attr("hidden", true);
    $('#modifyCuenta').attr("hidden", false);
}

function vista(){
    pagina= $(this).val();
    if(pagina == 1){
        $('#right').attr("hidden", true);
        $('#modifyCuenta').attr("hidden", true);
        $('#left').attr("hidden", false);
    }else{
        if(clsCookies.ReadCookie('Sesion') == 'admin'){
        $('#left').attr("hidden", true);
        $('#modifyCuenta').attr("hidden", true);
        $('#right').attr("hidden", false);
        }else{
            alert("No tienes permisos");
            $("#page").val("1");
        }
    }
}

function moveLeft(){
    for(var i=0; i<=9; i++){
        $( ".pedobear" ).animate({ "left": "-=50px" }, "slow" );
    }
}