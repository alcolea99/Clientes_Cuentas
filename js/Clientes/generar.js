let data=[];
var cliente0 = new clsCliente;
var cliente1 = new clsCliente;
var cliente2 = new clsCliente;
var cliente3 = new clsCliente;
var cliente4 = new clsCliente;
var cliente5 = new clsCliente;

window.onload = start();

///////////////////////////////////////////////////////////////////////
function start(){
    generarDatos();
}
///////////////////////////////////////////////////////////////////////
function crearJson(){
    data=[
        cliente0,
        cliente1,
        cliente2,
        cliente3,
        cliente4,
        cliente5
    ];
    localStorage.setItem("InfoClientes", JSON.stringify(data));
}
///////////////////////////////////////////////////////////////////////
function generarDatos(){
    cliente0._name='Johan';
    cliente0._userName='SuperJohan';
    cliente0._email='Johan@gmail.com';
    cliente0._pwd='Johan99';
    cliente0._pais='Francia';
    cliente0._ciudad='Le mans';
    cliente0._direccion='C/ Gabacho 10';
    cliente0._fechaNacimiento= '1980-03-25';
    ///////////////////////////////////////////////////////////////////////
    cliente1._name='Francesco';
    cliente1._userName='SuperFrancesco';
    cliente1._email='Francesco@gmail.com';
    cliente1._pwd='Francesco99';
    cliente1._pais='Italia';
    cliente1._ciudad='Florencia';
    cliente1._direccion='C/ dame un euro 27';
    cliente1._fechaNacimiento= '1987-03-04';
    ///////////////////////////////////////////////////////////////////////
    cliente2._name='Oscar';
    cliente2._userName='SuperOscar';
    cliente2._email='Oscar@gmail.com';
    cliente2._pwd='Oscar99';
    cliente2._pais='Portugal';
    cliente2._ciudad='Madeira';
    cliente2._direccion='C/ pobreza 2';
    cliente2._fechaNacimiento= '1974-05-04';
    ///////////////////////////////////////////////////////////////////////
    cliente3._name='Paula';
    cliente3._userName='SuperPaula';
    cliente3._email='Paula@hotmail.com';
    cliente3._pwd='Paula99';
    cliente3._pais='España';
    cliente3._ciudad='Barcelona';
    cliente3._direccion='C/ Valencia 280';
    cliente3._fechaNacimiento= '1991-08-16';
    ///////////////////////////////////////////////////////////////////////
    cliente4._name='German';
    cliente4._userName='SuperGerman';
    cliente4._email='German@gmail.com';
    cliente4._pwd='German99';
    cliente4._pais='España';
    cliente4._ciudad='Barcelona';
    cliente4._direccion='C/ Mallorca 450';
    cliente4._fechaNacimiento= '1991-11-05';
    ///////////////////////////////////////////////////////////////////////
    cliente5._name='Adrian';
    cliente5._userName='SuperAdrian';
    cliente5._email='Adrian@hotmail.com';
    cliente5._pwd='Adrian99';
    cliente5._pais='España';
    cliente5._ciudad='Barcelona';
    cliente5._direccion='C/ Almogavers 130';
    cliente5._fechaNacimiento= '1991-05-11';

    crearJson();
}