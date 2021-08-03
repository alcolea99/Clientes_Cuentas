<?php
require_once __DIR__ . '/clsdb.php';

session_name("seMereceUN10");
session_start();

$database= new db;
$datos= json_decode($_POST["request"]);
$loginOk= false;

if(isset($_SESSION['_SSID'])){
    $loginOk= true;
}

$method= $datos->method;
$tabla= $datos->tabla;
$database->setTable($tabla);

//Login
if($method == 'login'){
    $campo= $datos->campo;
    $database->setCampo($campo);
    $user= $datos->name;
    $pwd= $datos->pwd;

    if($database->login($user, $pwd)){
        $database->getTable();
        $response= $database->getData();
        //print_r($response[0]);die;
        //echo $response[0]['tipo'];die;
        if(!empty($response)){
            $_SESSION['_SSID']= 'sesionInit';
            $login=[
                'info' => 'Login OK',
                'user' => $response[0]['tipo'],
            ];
            $database->setData($login);
        }else{
            $login=[
                'info' => 'Login not OK',
            ];
            setcookie("seMereceUN10", "", time() - 3600, "/");
            $database->setData($login);
        }
        $database->response();
        die;
    }
}

//funciona
if($method == 'select' && $loginOk){
    $campo= $datos->campo;
    if(isset($datos->condition)){
        $condition= $datos->condition;
        $id= $datos->id;
        $database->setCondition($condition, $id);
    };
    $database->setCampo($campo);
    if( $database->select() ){
        $database->getTable();
        $database->response();
        //print_r($result);
    }
}

//funciona
if( $method == "insert" && $loginOk){
    $param= $database->createParam($datos);
    if($database->insert($param)){
        $database->response();
        die;    
    };
}

//funciona
if( $method == "update" && $loginOk){
    $userUpdate= $database->paramUpdate($datos);
    $database->setWhere("name='".$datos->oldname."';");
    $database->update($userUpdate);die;
}
//funciona
if( $method == "delete" && $loginOk){
    $condition= $datos->condition;
    $id= $datos->id;
    $database->setCondition($condition, $id);
    $database->delete();
    die;
}
?>