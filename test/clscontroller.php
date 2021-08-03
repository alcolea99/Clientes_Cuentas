<?php
class controller{
    private $_database;
    private $_user;
    private $_password;
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

    ////////////////////////////////////////////////////////////
    function __construct(){
        $this->database= new db;
    }
}
?>