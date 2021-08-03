$(document).ready(function () {
    inicio();
});
var item = $('#item').val();
var dominio;
var dinero;
var paginador= document.getElementsByName("paginador")[0];
var nList = 0;
var allCuentas;
var l;
var list="";
var tabla = "";
var filtrado=[];
var p = document.getElementById("p");
var conection= new clsConection;
var cuentas;
var longCuentas;


/**
 * @function inicio
 * @description Activa eventos escucha e inicia la aplicación.
 */
/////////////////////////////////////////////////////////////////
function inicio() {
    var array={
        'method': 'select',
        'campo' : '*',
         'tabla' : 'cuentas',
    };
    if(validarUser() == 'admin' || validarUser() == 'consult'){
        conection.setRequest(array);
        conection.callServer();
        cuentas= conection.getRespuesta();

        $('#dominio').change(changeDominio);
        $('#dinero').change(changeDinero);
        $('#item').change(cleanTable);
        $('#saveChanges').click(saveChanges);

        filtrado= cuentas;
        setDominio();
        setDinero();
        setLongCuentas();
        crearTabla();
    }
}
/**
 * @function validarUser
 * @description Devuelve el tipo de usuario logueado, sino lo hay, devuelve un false
 * @returns string
 */
 function validarUser(){
    if(clsCookies.ReadCookie('Sesion') == 'admin'){
        return 'admin';
    }if(clsCookies.ReadCookie('Sesion') == 'consult'){
        return 'consult';
    }
    return 'false';
}
/**
 * @function listen 
 * @param {int} num 
 * @description Crea eventos escucha de los botones de paginación.
 */
/////////////////////////////////////////////////////////////////
function listen(num){
    for(i=0; i<=num-1; i++){
        document.getElementsByName("paginador")[i].addEventListener('click', changeTable, false);
    }
}
/**
 * @function listenValores
 * @param {int} valor
 * @description Genera eventos escucha de los elementos de la tabla. 
 * Eventos de si son modificados.
 */
/////////////////////////////////////////////////////////////////
function listenValores(valor){
    list="Cambios efectuados\n";

    $('.link').change(changeList);
    $('.user').change(changeList);
    $('.email').change(changeList);
    $('.money').change(changeList);
    $('.pwd').change(changeList);
    $('.coment').change(changeList);
    $('.delete').click(deleteAccount);
    $('.modifiClient').click(gotoModificar);

}
/////////////////////////////////////////////////////////////////
function disabled(){
    $('.link').prop('disabled', true);
    $('.user').prop('disabled', true);
    $('.email').prop('disabled', true);
    $('.money').prop('disabled', true);
    $('.pwd').prop('disabled', true);
    $('.coment').prop('disabled', true);
}
/**
 * @function gotoModificar
 * @description Coge la cuenta seleccionada para modificar y la manda al html padre
 */
/////////////////////////////////////////////////////////////////
function gotoModificar(){
    if(validarUser() == 'admin'){
        id= this.value;
        //Hacemos un foreach para buscar el cliente con el mismo id
        function iterate(visit) {
            if(visit.id == id){
                cuentaSend= visit;
            }
        }
        cuentas.forEach(iterate);

        var event = new CustomEvent('modificarCuenta', {detail : cuentaSend});
        parent.document.dispatchEvent(event);
    }else{
        alert('No tienes permisos para esta accion');
    }
}
//detach() guarda los datos y borra el elemento.
//empty() Borra los hijos de ese elemento.
/**
 * @function paginator
 * @description Genera los botones de paginación. 
 */
/////////////////////////////////////////////////////////////////
function paginator(){
    numPage= Math.ceil(longCuentas / getItem());
    padre= document.getElementById("lista");

    for(i=2; i<=numPage; i++){
        element= paginador.cloneNode("paginador");
        element.value= i;
        padre.appendChild(element);
    }

    listen(numPage);
}
/**
 * @function deletePaginator
 * @description Elimina el paginador.
 */
/////////////////////////////////////////////////////////////////
function deletePaginator(){
    padre = document.getElementById("lista"); //$('#lista');
    long = document.getElementsByName("paginador").length;

    for (i = 1; i <= long - 1; i++) {
        element = document.getElementsByName("paginador")[1];
        padre.removeChild(element);
    }
}
/**
 * @function deleteAccount
 * @description Elimina a un cliente del json local.
 */
/////////////////////////////////////////////////////////////////
function deleteAccount(){
    if(validarUser() == 'admin'){
        element= this;
        id= this.parentNode.parentNode.firstChild.firstChild.value;

        var info={
            'method': 'delete',
            'tabla' : 'cuentas',
            'condition' : 'link',
            'id' : id
        };
        //funciona
        conection.setRequest(info);
        conection.callServer();
        for(i=0; i<=longCuentas; i++){
            if(cuentas[i].link == id){
                cuentas.splice( i, 1 );
                i=20;
            }
        }
        setLongCuentas();
        $(this).parents('tr').first().remove();
    }else{
        alert('No tienes permisos para esta accion');
    }
}
/**
 * @function changeTable
 * @description Cambia la tabla segun el numero del paginador que se pulsa.
 * Calcula el numero de la lista(arrayCuentas) que debe ser el primero de la tabla.
 */
/////////////////////////////////////////////////////////////////
function changeTable(){
    page= this.value;
    nList= item * (page-1);
    deletePaginator();
    crearTabla();
}
/**
 * @function cleanTable
 * @description Elimina la tabla y el paginador y vuelve a crear una tabla.
 */
/////////////////////////////////////////////////////////////////
function cleanTable() {
    element = $('#tabla'); //document.getElementById("tabla");
    element.remove();
    deletePaginator();
    crearTabla();
}
/**
 * @function crearTabla
 * @description Crea la tabla según los valores que haya seleccionados en ese instante.
 */
/////////////////////////////////////////////////////////////////
function crearTabla() {
    setItem();
    inicioTabla();
    allCuentas= parseInt(nList) + parseInt(item);
    
    if(allCuentas >= longCuentas){
        l= longCuentas - nList;

        for (i = 1; i <= l; i++) {
            generarItem();
            item=i;      
        }

    }else{
        for (i = 1; i <= item; i++) {
            generarItem();
        }
    }
    
    finalTabla();
    p.innerHTML = tabla;
    loadData();
    listenValores(item);
    paginator();
    disabled();
}
/**
 * @function find
 * @description Busca que filtros estan seleccionados.
 */
/////////////////////////////////////////////////////////////////
function find(){
    if(dominio === "" & dinero === 0){
        restartTable();
        return;
    }
    if(dominio === "" || dinero === 0){
        filtrar(true);
    }else if(dominio != "" & dinero > 0){
        filtrar(false);
    }

    longCuentas= filtrado.length;

    if(longCuentas == 0){
        alert("No hay ninguna cluenta con esos requisitos");
        restartTable();
        return;
    }
    cleanTable();
}
/**
 * @function filtrar
 * @param {boolean} condicion
 * @description Filtra las cuentas que cumplen las condiciones de los filtros de busqueda establecidos.
 */
/////////////////////////////////////////////////////////////////
function filtrar(condicion){
    t=0;
    filtrado=[];
    if(condicion){
        for(i=0; i<=longCuentas-1; i++){
            if(cuentas[i]._link.includes(dominio) & dominio !="" || (cuentas[i]._money >= dinero & dinero > 0)){
                filtrado[t]= cuentas[i];
                t++;
            }
        }
    }else if(!condicion){
        for(i=0; i<=longCuentas-1; i++){
            if( cuentas[i]._link.includes(dominio) & cuentas[i]._money >= dinero){
                filtrado[t]= cuentas[i];
                t++;
            }
        }
    }
}
/**
 * @function inicioTabla
 * @description Genera el principio de la tabla y lo guarda en la variable tabla. 
 */
/////////////////////////////////////////////////////////////////
function inicioTabla() {
    tabla = "<table id=tabla class=blueTable><tbody class=centro name=table><tr><th>Link</th><th>userName</th><th>Email</th><th>Money</th><th>Pwd</th><th>Comentario</th></tr>";

}
/**
 * @function generarItem
 * @description Añade a la variable tabla una fila completa por cada llamada.
 */
/////////////////////////////////////////////////////////////////
function generarItem() {
    tabla += "<tr><td><input class=link name=link type=text></td><td><input class=user name=user type=text></td><td><input class=email name=email type=email></td><td><input class=money name=money type=number></td><td><input class=pwd name=pwd type=text></td><td><input class=coment name=coment type=text></td><td><a class=modifiClient type=button name=modifiClient value=''>Modificar</a></td><td><input class=delete type=button name=delete value=Borrar></td></tr>";
    //modifiClient
}
/**
 * @function finalTabla
 * @description Añade el final de la tabla a la variable tabla.
 */
/////////////////////////////////////////////////////////////////
function finalTabla() {
    tabla += "</tbody></table>";
}
/**
 * @function restartTable
 * @description Esta función se ejecuta en caso de error, reinicia la tabla.
 */
/////////////////////////////////////////////////////////////////
function restartTable(){
    filtrado= cuentas;
    setLongCuentas();
    restartFiltros();
    cleanTable();
}
/**
 * @function restartFiltros
 * @description Restableze los filtros de busqueda.
 */
function restartFiltros(){
    document.getElementById("dominio").options.item(0).selected = 'selected';
    document.getElementById("dinero").options.item(0).selected = 'selected';
    //dominio= $('#dominio').val();
    setDominio();
    setDinero();
    //dinero= $('#dinero').val();
}
/**
 * @function loadData
 * @description Carga los datos de las cuentas en la tabla.
 */
/////////////////////////////////////////////////////////////////
function loadData() {
    padre = document.getElementsByName("table")[0];
    var n= nList;
    for (i = 0; i <= item - 1; i++) {
        if(!filtrado[i]){
            n++;
        }else{
            document.getElementsByName("modifiClient")[i].value = filtrado[n].id;
            document.getElementsByName("link")[i].value = filtrado[n].link;
            document.getElementsByName("user")[i].value = filtrado[n].user_name;
            document.getElementsByName("email")[i].value = filtrado[n].email;
            document.getElementsByName("money")[i].value = filtrado[n].money;
            document.getElementsByName("pwd")[i].value = filtrado[n].pwd;
            document.getElementsByName("coment")[i].value = filtrado[n].comentario;
            n++;
        }
    }
}
/**
 * @function changeList
 * @description Genera una lista con los cambios efectuados.
 */
/////////////////////////////////////////////////////////////////
function changeList(){
    element= this;
    id= this.parentNode.parentNode.firstChild.firstChild.value;

    list+= "Al user: "+ id +". Se ha modificado su "+ element.name + " a: " + element.value + "\n";
}
/**
 * @function saveChanges
 * @description Muestra por consola la lista de cambios efectuados.
 */
/////////////////////////////////////////////////////////////////
function saveChanges(){
    //console.log(list);
}
/**
 * @function changeCuenta
 * @description Guarda el valor del filtro cuenta y ejecuta su busqueda.
 */
/////////////////////////////////////////////////////////////////
function changeDominio() {
    setLongCuentas();
    setDominio();
    find();
}
/**
 * @function setDominio
 * @description Actualiza el valor del dominio.
 */
/////////////////////////////////////////////////////////////////
function setDominio(){
    dominio = $('#dominio').val();
    //document.getElementById("cuenta").value;
}

/**
 * @function changeDinero
 * @description Guarda el valor del filtro cliente y ejecuta su busqueda.
 */
/////////////////////////////////////////////////////////////////
function changeDinero() {
    setLongCuentas();
    setDinero();
    find();
}
/**
 * @function setDinero
 * @description Actualiza el valor de Tipo Email.
 */
/////////////////////////////////////////////////////////////////
function setDinero(){
    dinero = parseInt( $('#dinero').val());
}

/**
 * @function setItem
 * @description Controla el valor de cuantas Cuentas se quieren visualizar por pagina.
 */
/////////////////////////////////////////////////////////////////
function setItem() {
    item = $('#item').val();
    //document.getElementById("item").value;
}
/**
 * @function getItem
 * @description Devuelve el valor de el numero de Cuentas que se quieren por pagina.
 */
/////////////////////////////////////////////////////////////////
function getItem() {
    setItem();
    return item;
}
/**
 * @function setLongCuentas
 * @description Iguala la variable longitud cuentas a la longitud del array de cuentas.
 */
/////////////////////////////////////////////////////////////////
function setLongCuentas(){
    longCuentas= cuentas.length;
}
