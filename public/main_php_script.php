<?php




class Server {
    function __construct($post,$get,$pdo) {
          
    
          
        $path = "DB/base.db";
        $this->pdo = new PDO("sqlite:".$path);
   


 
        $this->dataPost =json_decode(json_encode($post), true);
        
        $this->dataGet = $get;
    }
    function actionSearch(){
       
        $sql_build = " WHERE ";
        $sql = "SELECT * FROM Music_Films";
        if($this->dataGet['singer'] != -1){
            
            $sql .= $sql_build.' Cod_singer='.$this->dataGet['singer'];
            $sql_build = " AND ";
        }
        if($this->dataGet['Cod_country'] != -1){
            $sql .=  $sql_build.' Cod_country='.$this->dataGet['Cod_country'];
            $sql_build = " AND ";
        }
        if($this->dataGet['vidDiska'] != -1){
            $sql .=  $sql_build.' Cod_vida_diska='.$this->dataGet['vidDiska'];
            $sql_build = " AND ";
        }
        if($this->dataGet['producer'] != -1){
            $sql .= $sql_build. ' Cod_producer='.$this->dataGet['producer'];
            $sql_build = " AND ";
        }
        if($this->dataGet['format'] != -1){
            $sql .= $sql_build. ' Cod_formata='.$this->dataGet['format'];
            $sql_build = " AND ";
        }
        // echo $sql;
        $obj['elements'] =   iterator_to_array($this->pdo->query($sql));
 
        $obj['field'] = $this->getField();;
      
        $obj['statistic'] =  $this->getStatistic();
        // print_r($obj);
      
        return  $obj;
    }
    function getField(){

        $objField['singers'] = iterator_to_array($this->pdo->query("SELECT * FROM Singers"));
        $objField['producers'] = iterator_to_array($this->pdo->query("SELECT * FROM Producers")); 
        $objField['vid_diska'] = iterator_to_array($this->pdo->query("SELECT * FROM Vid_diska")); 
        $objField['countries'] = iterator_to_array($this->pdo->query("SELECT * FROM Countries"));
        $objField['formats'] = iterator_to_array($this->pdo->query("SELECT * FROM Disk_format"));
        return $objField;
    }
    function getStatistic(){

        $statistic['title'] ="Минимальная стоимость диска";
        $statistic['value'] = iterator_to_array($this->pdo->query("SELECT MIN(Price) FROM Music_Films"))[0]['MIN(Price)'];
        $obj['statistic'][] =  $statistic;
        $statistic['title'] ="Всего исполнителей";
        $statistic['value'] = iterator_to_array($this->pdo->query("SELECT COUNT(Name_singer) FROM Singers"))[0]['COUNT(Name_singer)'];
        $obj['statistic'][] =  $statistic;
        $statistic['title'] ="Средняя стоимость";
        $statistic['value'] = iterator_to_array($this->pdo->query("SELECT AVG(Price) FROM Music_Films"))[0]['AVG(Price)'];
        $obj['statistic'][] =  $statistic;
        $statistic['title'] ="Количество дисков из России";
        $statistic['value'] = iterator_to_array($this->pdo->query("SELECT COUNT(Cod_country) FROM Music_Films WHERE Cod_country=1"))[0]['COUNT(Cod_country)'] ;
        $obj['statistic'][] =  $statistic;
        $statistic['title'] ="Год последнего релиза ";
        $statistic['value'] = iterator_to_array($this->pdo->query("SELECT MAX(YEAR) FROM Music_Films "))[0]['MAX(YEAR)'] ;
        $obj['statistic'][] =  $statistic;
        $statistic['title'] ="Год первого релиза ";
        $statistic['value'] = iterator_to_array($this->pdo->query("SELECT MIN(YEAR) FROM Music_Films "))[0]['MIN(YEAR)'] ;
        $obj['statistic'][] =  $statistic;

        return  $obj['statistic'];
    }

    function actionDefault(){


        $arr = iterator_to_array($this->pdo->query("SELECT * FROM Music_Films"));
        $obj['elements'] = [];
        foreach($arr as $elem){
            $elem['comments'] = iterator_to_array($this->pdo->query("SELECT * FROM Comments WHERE Cod_diska =".$elem['Cod_diska']));
            $obj['elements'][] =  $elem;
        }
        $obj['field'] = $this->getField();;
      
        $obj['statistic'] =  $this->getStatistic();
 
        return $obj;
    }
            
    function actionCreateComment(){
        print_r($this->dataPost);
        $sth = $this->pdo->prepare("INSERT INTO Comments ( value,   Cod_diska) VALUES ( :commentValue, :cod_diska)");
        $sth->execute(array('commentValue' =>  $this->dataPost['commentValue'], 'cod_diska' => $this->dataPost['cod_diska']));
       print_r($this->dataPost);
       return 'good';
    } 
    public function sent(){
      
        if($this->dataGet['path'] == 'Default'){
            return $this->actionDefault();
        }
        if($this->dataGet['path'] == 'Search'){
            return $this->actionSearch();
        }
        if($this->dataGet['path']== 'CreateComment'){
            return $this->actionCreateComment();
          
        }
      
    }
}

$post = json_decode(file_get_contents('php://input'));

$obj = new Server($post,$_GET,$pdo1);

echo json_encode ($obj->sent());