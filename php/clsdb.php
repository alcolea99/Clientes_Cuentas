<?php
//require_once __DIR__ . '/clsxmlresponse.php';
class db{
    private $_database;
    private $_dbuser;
    private $_password;
    private $_url;
    private $_data;
    private $_resultProcedure;
    private $_iniParam;
    private $_entreParam;
    private $_finParam;
    private $_xmlresponse;
    private $mysqli;
    private $_numerror;
    private $campo;
    private $table;
    private $condition;
    private $_iniInsert;
    private $_iniUpdate;
    private $_entreParamUp;
    private $_finParamUp;
    private $_where;

    ////////////////////////////////////////////////////////////
    function __construct(){
        $this->_url="localhost";
        $this->_dbuser="root";
        $this->_password="JorgeLorenzo99";
        $this->_database="motogt";
        $this->_iniParam= " ('0";
        $this->_entreParam= "', '";
        $this->_finParam= "');";
        $this->_iniInsert= "Insert into ";
        $this->_iniUpdate= "Update ";
        $this->_iniParamUp= " set ";
        $this->_entreParamUp= ", ";
        $this->_finParamUp= " where ";
        $this->GetConnection();
    }
    //Funcion se conecta con la BD y se utiliza:
    //IP, User, Password, nombre BD
    ////////////////////////////////////////////////////////////
    function GetConnection(){
        $this->mysqli = new mysqli($this->_url, $this->_dbuser,
        $this->_password, $this->_database);

        $this->mysqli->set_charset("utf8");
    }
    ////////////////////////////////////////////////////////////
    function login($name, $pwd){
        //echo "SELECT ".$this->campo."from ".$this->table." where name='".$name."' and password=".$pwd.";"; die;
        if(!($this->_resultProcedure= $this->mysqli->query("SELECT ".$this->campo."from ".$this->table." where name='".$name."' and password='".$pwd."';"))){
            $this->error();
        }
        return true;
        // $this->getTable();
        // if(!empty($this->_data)){
        //     $respuesta=[
        //         'tipo' => $this->_data['tipo']
        //     ];
        //     $this->_data= $respuesta;
        //     return true;
        // }else{
        //     $respuesta=[
        //         'tipo' => 'ninguno'
        //     ];
        //     $this->_data= $respuesta;
        //     return false;
        // }
    }
    ////////////////////////////////////////////////////////////
    function select(){
        //echo "SELECT ".$this->campo."from ".$this->table.$this->condition.";"; die;
        if(!($this->_resultProcedure= $this->mysqli->query("SELECT ".$this->campo."from ".$this->table.$this->condition.";"))){
            $this->error();
        }
        return true;
    }
    //echo $this->_iniInsert.$this->table." values ".$parametros;die;

    ////////////////////////////////////////////////////////////
    function insert($parametros){
        if(!$this->mysqli->query($this->_iniInsert.$this->table." values ".$parametros)){
            $this->error();
        }
        return true;
    }
    //echo $this->_iniUpdate.$this->table.$parametros.$this->_where;die;
    ////////////////////////////////////////////////////////////
    function update($parametros){
        if(!$this->mysqli->query($this->_iniUpdate.$this->table.$parametros.$this->_where)){
            $this->error();
        }
        return true;
    }
    //echo "delete from ".$this->table.$this->_finParamUp.$this->condition.";"; die;
    ////////////////////////////////////////////////////////////
    function delete(){
        if(!$this->mysqli->query("delete from ".$this->table.$this->condition.";")){
            $this->error();
        }
    }
    ////////////////////////////////////////////////////////////
    function getTable(){
        $this->_data=[];
        while ($row = mysqli_fetch_assoc($this->_resultProcedure)) {
            $array=[];
            foreach($row as $column =>$content){
                $array[$column]= $content;
            }
            $this->_data[]= $array;
        }
    }
    ////////////////////////////////////////////////////////////
    function createParam($params){
        $request='';
        $request= $this->_iniParam;
        foreach ($params as $param =>$value){
            if($param != 'method' && $param != 'tabla' && $param !='campo' && $param !='oldname'){
                $request= $request.$this->_entreParam.$value;
            }
        }
        $request= $request.$this->_finParam;
        return $request;
    }
    ////////////////////////////////////////////////////////////
    function paramUpdate($params){
        $request='';
        $request= $this->_iniParamUp;
        foreach ($params as $param =>$value){
            if($param != 'method' && $param != 'tabla' && $param !='campo' && $param !='oldname'){
                if($value == end($params)){
                    $request= $request.$param."='".$value."'";
                }else{
                    $request= $request.$param."='".$value."'".$this->_entreParamUp;
                }
            }
        }
        $request= $request.$this->_finParamUp;
        //echo $request;die;
        return $request;
    }
    ////////////////////////////////////////////////////////////
    function error(){
        echo "Falló en la base de datos: (" . $this->mysqli->errno . ") " . $this->mysqli->error;
        die;
    }
    ////////////////////////////////////////////////////////////
    function response(){
        //print_r($this->_data);die;
        $JSON = json_encode($this->_data);
        echo $JSON;
        //print_r($this->_data);
        die;
    }
    ////////////////////////////////////////////////////////////
    public function getNumError(){
        return $this->_numerror;
    }
    public function getData(){
        return $this->_data;
    }
    public function setData($info){
        $this->_data= $info;
    }
    public function setTable($table){
        $this->table= $table;
    }
    public function setCampo($campo){
        $this->campo= $campo;
    }
    public function setCondition($cond, $id){
        $this->condition= " where ".$cond."='".$id."'";
    }
    public function setWhere($where){
        $this->_where= $where;
    }






    ////////////////////////////////////////////////////////////
    function getProcedure($nameProcedure, $param){
        if (!$this->mysqli->query("SET @numerror='';") ||
            !($this->_resultProcedure= $this->mysqli->query("CALL"." ".$nameProcedure.$param)))
            {
                $this->error();
            }
        if($this->getTable()){
            $this->_xmlresponse->createXML($this->_data);
            $this->_xmlresponse->responseXML();
        }
    }
    ////////////////////////////////////////////////////////////
    function putProcedure($nameProcedure, $param){
        //echo $nameProcedure, " ", $param; die;
        $this->mysqli->query("SET @numerror='';");
        if (!$this->mysqli->query("CALL"." ".$nameProcedure.$param))
            {
                $this->error();
            }
        $this->setNumError();
    }
    ////////////////////////////////////////////////////////////
    function setNumError(){
        $response = $this->mysqli->query("SELECT @numerror as _p_out;");
        $fila = $response->fetch_assoc();
        $this->_numerror= $fila['_p_out'];
        
        //echo $this->_numerror;
    }

}