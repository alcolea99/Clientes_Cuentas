/**
 * @class clsConection
 * @description Clase para realizar una conexion con php mediante ajax 
 */
class clsConection{
    constructor(){
        this.xhr= new XMLHttpRequest();
        this._method;
        this._request;
        this._php= "../../php/controller.php";
        this._respuesta;
        this.xhr.addEventListener("readystatechange", this.onReadyStateChange.bind(this));
    }
    /////////////////////////////////////////////////////////////////////////////////
    /**
     * @method callServer
     * @description Abre la conexion con el php y manda los datos que queremos
     */
    callServer(){
        this.xhr.open("POST", this._php, false);
        this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.xhr.send('request='+this._request);
    }
    /**
     * @method onReadyStateChange
     * @description Cuando recibe una respuesta del php la guarda
     */
    /////////////////////////////////////////////////////////////////////////////////
    onReadyStateChange(){
        if (this.xhr.readyState == 4 && this.xhr.status == 200) {
            //console.log(this.xhr.responseText);
            this._respuesta= JSON.parse(this.xhr.responseText);
            console.log(this._respuesta);
            console.log("El servidor ha respondido");
        }
    }
    /**
     * @method setRequest
     * @param {array} datos
     * @description Setea la variable que sera enviada al php
     */
    ////////////////////////////////////////////////////////////////////////////////
    setRequest(datos){
        this._request= JSON.stringify(datos);
    }
    /**
     * @method getRespuesta
     * @returns array
     * @description Devuelve la variable de respuesta del php
     */
    ////////////////////////////////
    getRespuesta(){
        return this._respuesta;
    }
}