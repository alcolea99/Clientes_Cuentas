document.getElementById("send").addEventListener("click", conexion);

function conexion(){
    var conect= new clsConection;
    var array={
        'method': 'select',
        'campo' : '*',
         'tabla' : 'clientes',
        // 'condition' : 'name',
        // 'id' : 'Zenitsu',
        'user_name' : 'Pilar del rayo'
    };
    //llamada al server
    conect.setRequest(array);
    conect.callServer();
    //recoger respuesta
    var res= conect.getRespuesta();
    console.log(res);
    //console.log(res[0].pais);
}
