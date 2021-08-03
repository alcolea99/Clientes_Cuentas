$(document).ready(function () {
    inicio();
});
var item = $('#item').val();
var pais;
var tipoEmail;
var paginador= document.getElementsByName("paginador")[0];
var nList = 0;
var allClientes;
var l;
var list="";
var tabla = "";
var filtrado=[];
var p = document.getElementById("p");
var conection= new clsConection;
var clientes;
var longClientes;


/**
 * @function inicio
 * @description Activa eventos escucha e inicia la aplicación.
 */
/////////////////////////////////////////////////////////////////
function inicio() {
    var array={
        'method': 'select',
        'campo' : '*',
        'tabla' : 'clientes',
    };
    if(validarUser() == 'admin' || validarUser() == 'consult'){
        conection.setRequest(array);
        conection.callServer();
        clientes= conection.getRespuesta();

        $('#selectpais').change(changePais);
        $('#tipoemail').change(changeTipoEmail);
        $('#item').change(cleanTable);
        $('#saveChanges').click(saveChanges);
        
        filtrado= clientes;
        setPais();
        setTipoEmail();
        setLongClientes();
        crearTabla();
    } 
    //console.log(clientes); 
}
/**
 * 
 * @returns Devuelve un booleano 
 */
function validarUser(){
    if(clsCookies.ReadCookie('Sesion') == 'admin'){
        return 'admin';
    }if(clsCookies.ReadCookie('Sesion') == 'consult'){
        return 'consult';
    }
    return false;
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

    $('.nombre').change(changeList);
    $('.userName').change(changeList);
    $('.email').change(changeList);
    $('.pwd').change(changeList);
    $('.pais').change(changeList);
    $('.ciudad').change(changeList);
    $('.direccion').change(changeList);
    $('.fecha').change(changeList);
    $('.delete').click(deleteClient);
    $('.modificar').click(gotoModifi);
}
/////////////////////////////////////////////////////////////////
function disabled(){
    $('.nombre').prop('disabled', true);
    $('.userName').prop('disabled', true);
    $('.email').prop('disabled', true);
    $('.pwd').prop('disabled', true);
    $('.pais').prop('disabled', true);
    $('.ciudad').prop('disabled', true);
    $('.direccion').prop('disabled', true);
    $('.fecha').prop('disabled', true);
}
/**
 * @function gotoModifi
 * @description Busca el cliente seleccionado y lo manda al html(js) modificar
 */
/////////////////////////////////////////////////////////////////
function gotoModifi(){
    if(validarUser() == 'admin'){
        id= this.value;
        //Hacemos un foreach para buscar el cliente con el mismo id
        function iterate(visit) {
            if(visit.id == id){
                clientSend= visit;
            }
        }
        clientes.forEach(iterate);
        var event = new CustomEvent('modificar', {detail : clientSend});
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
    numPage= Math.ceil(longClientes / getItem());
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
 * @function deleteClient
 * @description Elimina a un cliente del json local.
 */
/////////////////////////////////////////////////////////////////
function deleteClient(){
    if(validarUser() == 'admin'){
        element= this;
        id= this.parentNode.parentNode.firstChild.firstChild.value;
        var info={
            'method': 'delete',
            'tabla' : 'clientes',
            'condition' : 'name',
            'id' : id
        };

        //funciona
        conection.setRequest(info);
        conection.callServer();

        for(i=0; i<=longClientes; i++){
            if(clientes[i].name == id){
                clientes.splice( i, 1 );
                i=20;
            }
        }
        
        setLongClientes();
        $(this).parents('tr').first().remove();

    }else{
        alert('No tienes permisos para esta accion');
    }
}
/**
 * @function changeTable
 * @description Cambia la tabla segun el numero del paginador que se pulsa.
 * Calcula el numero de la lista(arrayClientes) que debe ser el primero de la tabla.
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
    allClientes= parseInt(nList) + parseInt(item);
    
    if(allClientes >= longClientes){
        l= longClientes - nList;

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
    if(pais === "" & tipoEmail === ""){
        restartTable();
        return;
    }
    if(pais === "" || tipoEmail === ""){
        filtrar(true);
    }else if(pais != "" & tipoEmail != ""){
        //console.log(pais, tipoEmail);
        filtrar(false);
    }

    longClientes= filtrado.length;

    if(longClientes == 0){
        alert("No hay ningun cliente con esos requisitos");
        restartTable();
        return;
    }
    cleanTable();
}
/**
 * @function filtrar
 * @param {boolean} condicion
 * @description Filtra los clientes que cumplen las condiciones de los filtros de busqueda establecidos.
 */
/////////////////////////////////////////////////////////////////
function filtrar(condicion){
    t=0;
    filtrado=[];
    if(condicion){
        for(i=0; i<=longClientes-1; i++){
            if(clientes[i].pais == pais || clientes[i].email.includes(tipoEmail) & tipoEmail !=""){
                filtrado[t]= clientes[i];
                t++;
            }
        }
    }else if(!condicion){
        for(i=0; i<=longClientes-1; i++){
            if(clientes[i].pais == pais & clientes[i].email.includes(tipoEmail)){
                filtrado[t]= clientes[i];
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
    tabla = "<table id=tabla class=blueTable><tbody class=centro name=table><tr><th>Nombre</th><th>userName</th><th>Email</th><th>pwd</th><th>Pais</th><th>Ciudad</th><th>Direccion</th><th>Fecha Nacimiento</th></tr>";
}
/**
 * @function generarItem
 * @description Añade a la variable tabla una fila completa por cada llamada.
 */
/////////////////////////////////////////////////////////////////
function generarItem() {
    tabla += "<tr><td><input class=nombre name=nombre type=text></td><td><input class=userName name=userName type=text></td><td><input class=email name=email type=email></td><td><input class=pwd name=pwd type=text></td><td><input class=pais name=pais type=text></td><td><input class=ciudad name=ciudad type=text></td><td><input class=direccion name=direccion type=text></td><td><input class=fecha name=fecha type=date></td><td><a class=modificar type=button name=modificar value=''>Modificar</a></td><td><input class=delete type=button name=delete value=Borrar></td></tr>";
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
    filtrado= clientes;
    setLongClientes();
    restartFiltros();
    cleanTable();
}
/**
 * @function restartFiltros
 * @description Restableze los filtros de busqueda.
 */
/////////////////////////////////////////////////////////////////
function restartFiltros(){
    document.getElementById("selectpais").options.item(0).selected = 'selected';
    document.getElementById("tipoemail").options.item(0).selected = 'selected';
    pais= $('#selectpais').val();
    tipoEmail= $('#tipoemail').val();
}
/**
 * @function loadData
 * @description Carga los datos de los clientes en la tabla.
 */
/////////////////////////////////////////////////////////////////
function loadData() {
    padre = document.getElementsByName("table")[0];
    var n= nList;
    for (i = 0; i <= item - 1; i++) {
        if(!filtrado[i]){
            n++;
        }else{
            document.getElementsByName("modificar")[i].value = filtrado[n].id;
            document.getElementsByName("nombre")[i].value = filtrado[n].name;
            document.getElementsByName("userName")[i].value = filtrado[n].user_name;
            document.getElementsByName("email")[i].value = filtrado[n].email;
            document.getElementsByName("pwd")[i].value = filtrado[n].pwd;
            document.getElementsByName("pais")[i].value = filtrado[n].pais;
            document.getElementsByName("ciudad")[i].value = filtrado[n].ciudad;
            document.getElementsByName("direccion")[i].value = filtrado[n].direccion;
            document.getElementsByName("fecha")[i].value = filtrado[n].born_date;
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

    list+= "Cliente: "+ id +". Se ha modificado su "+ element.name + " a: " + element.value + "\n";
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
function changePais() {
    setLongClientes();
    setPais();
    find();
}
/**
 * @function setPais
 * @description Actualiza el valor del pais.
 */
/////////////////////////////////////////////////////////////////
function setPais(){
    pais = $('#selectpais').val();
    //document.getElementById("cuenta").value;
}

/**
 * @function changeTipoEmail
 * @description Guarda el valor del filtro cliente y ejecuta su busqueda.
 */
/////////////////////////////////////////////////////////////////
function changeTipoEmail() {
    setLongClientes();
    setTipoEmail();
    find();
}
/**
 * @function setTipoEmail
 * @description Actualiza el valor de Tipo Email.
 */
/////////////////////////////////////////////////////////////////
function setTipoEmail(){
    tipoEmail = $('#tipoemail').val();
    //document.getElementById("cliente").value;
}

/**
 * @function setItem
 * @description Controla el valor de cuantos Clientes se quieren visualizar por pagina.
 */
/////////////////////////////////////////////////////////////////
function setItem() {
    item = $('#item').val();
}
/**
 * @function getItem
 * @description Devuelve el valor de el numero de Clientes que se quieren por pagina.
 */
/////////////////////////////////////////////////////////////////
function getItem() {
    setItem();
    return item;
}
/**
 * @function setLongClientes
 * @description Iguala la variable longitud clientes a la longitud del array de clientes.
 */
function setLongClientes(){
    longClientes= clientes.length;
}