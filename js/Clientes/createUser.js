$(document).ready(function () {

    $('#login').click(function(){
        user= $('#user').val();
        pwd= $('#pwd').val();
        tipo= $('#tipo').val();
        log={
            'method': 'insert',
            'tabla' : 'users',
            'name' : user,
            'pwd' : pwd,
            'tipo' : tipo,
        }
        var conexion= new clsConection;
        conexion.setRequest(log);
        conexion.callServer();
        alert("Datos Enviados");
        location.reload();
        //location.reload();
    });

});