let data=[];
var cuenta0 = new clsCuentas;
var cuenta1 = new clsCuentas;
var cuenta2 = new clsCuentas;
var cuenta3 = new clsCuentas;
var cuenta4 = new clsCuentas;
var cuenta5 = new clsCuentas;

window.onload = start();

///////////////////////////////////////////////////////////////////////
function start(){
    generarDatos();
}
///////////////////////////////////////////////////////////////////////
function crearJson(){
    data=[
        cuenta0,
        cuenta1,
        cuenta2,
        cuenta3,
        cuenta4,
        cuenta5
    ];
    localStorage.setItem("InfoCuentas", JSON.stringify(data));
}
///////////////////////////////////////////////////////////////////////
function generarDatos(){
    cuenta0._link='manolo.com';
    cuenta0._userName='Supermanolo';
    cuenta0._email='manolo@gmail.com';
    cuenta0._money='2350';
    cuenta0._pwd='manolo99';
    cuenta0._comentario='Pagina para ver lo solo que estoy';
    ///////////////////////////////////////////////////////////////////////
    cuenta1._link='Juan.com';
    cuenta1._userName='SuperJuan';
    cuenta1._email='Juan@gmail.com';
    cuenta1._money='5742';
    cuenta1._pwd='Juan99';
    cuenta1._comentario='Pagina donde se reproduce el anuncion de juan juan eres el numero one en bucle';
    ///////////////////////////////////////////////////////////////////////
    cuenta2._link='OscarMayer.es';
    cuenta2._userName='SuperOscar';
    cuenta2._email='Oscar@gmail.com';
    cuenta2._money='6321';
    cuenta2._pwd='Oscar99';
    cuenta2._comentario='Hoy, mañana y siempre... con oscar mayer en el corazon';
    ///////////////////////////////////////////////////////////////////////
    cuenta3._link='Paula.org';
    cuenta3._userName='SuperPaula';
    cuenta3._email='Paula@gmail.com';
    cuenta3._money='32';
    cuenta3._pwd='Paula99';
    cuenta3._comentario='Pagina de donaciones porque soy pobre, no onlyfans';
    ///////////////////////////////////////////////////////////////////////
    cuenta4._link='German.cat';
    cuenta4._userName='SuperGerman';
    cuenta4._email='German@gmail.com';
    cuenta4._money='27000';
    cuenta4._pwd='German99';
    cuenta4._comentario='Pagina de como gastarte 27000€ en una moto';
    ///////////////////////////////////////////////////////////////////////
    cuenta5._link='Adrian.es';
    cuenta5._name='Adrian';
    cuenta5._userName='SuperAdrian';
    cuenta5._email='Adrian@gmail.com';
    cuenta5._money='51236478';
    cuenta5._pwd='Adrian99';
    cuenta5._comentario='Gana 50.000 al año con mi metodo de MasterClassProgramador... aunque nadie me crea';

    crearJson();
}