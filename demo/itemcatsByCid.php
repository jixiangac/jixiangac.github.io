<?php
/**
 * 获取商品栏目
 */

require "../Sdk/CuzyApi.php";

$cuzyClient = new CuzyClient();

//设置Appkey
$cuzyClient ->appkey= 200228;

//设置Appsecret
$cuzyClient ->appsecret = "6d166bbe728180f0c442b3348e917ece";

//载入栏目类
$itemCatasHandle = $cuzyClient->load_api("GetItemcatsByCid");

//设置cid
$itemCatasHandle->setCid(0);

//--------------------------------------查询------------------------------------------------------

 // 普通原数据查询
 $resp = $cuzyClient->execute($itemCatasHandle);
 var_dump($resp);


 // 高级模型查询
 // $resp =$cuzyClient->advExecute($itemCatasHandle);
 // var_dump($resp->getData()) ; // 获取栏目数据
