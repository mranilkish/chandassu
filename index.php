<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  
  <title>Romanized latin to Telugu  </title>
  <script type="text/javascript" src="LTLP/telugu.js">
    
  </script>
  <script src="LTLP/converter.js" type="text/javascript">
    
  </script>


<style type="text/css">
h4
{
text-align: center;
}
a {text-decoration: none; }
p
{
font-size:18px;
text-indent: 70px;
text-align:justify; margin-left: 30px; margin-right: 30px;
}
li
{
font-size:18px;text-align:justify; margin-left: 80px;

}
</style>
</head>
<body>
<?php 
ini_set('default_charset', 'utf-8');
if(isset($_POST['converted_text']))
{
	$con = mysql_connect ('localhost','root','') or die(mysql_error()); 
        mysql_select_db('poems') or die(mysql_error());
	//$desc = mysql_real_escape_string($_POST['txtDesc']);//nl2br($_POST['txtDesc']);
	$area = $_POST['converted_text'];
	$query = "INSERT INTO `poems`.`p` (`p`) VALUES('$area');";
	$result = mysql_query($query) or die(mysql_error());



}

$con = mysqli_connect ('localhost','root','') or die(mysql_error()); 
        mysqli_select_db($con,'poems') or die(mysql_error());
$sql = "select * from p;";
	$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
$ij=0;$jjk="";

    while($row = mysqli_fetch_assoc($result)) {
        $jjk.="<p id='id$ij' hidden>".($row["p"])."</p>";
    

$ij++;
 

}
echo "$jjk";
//echo "var ind=0;function movv(x){alert('hi'+x);} alert(poems[0]);</script>";
 
}
/*
if((ind+x)<0)
ind=0;
else 
if((ind+x)>=poems.length)
ind=0;
else
ind=ind+x;

var oo=document.getElementById("poems");
oo.innerHTML=poems[ ind ];
*/
?>

  <form name="convarea"  method="post" action="index.php">
  <table>
    <tbody><tr>
      <th>
        Type or Paste your poem in English/Telugu
      </th>
      <th>
        Telugu Poem
      </th>
    </tr>
    <tr>
      <td>
<input type=button value="<" id=prev onclick=movv(-1) />
<input type=button value=">" id=next onclick=movv(1) />
        <textarea id="poems" name="many_words_text" rows="20" cols="60" onfocus="javascript:print_many_words()" onkeyup="javascript:print_many_words()" onkeydown=fff()>  a A lakShmi </textarea>

      </td>
      <td>

        <textarea id="ppm" name="converted_text" rows=20 cols=60 value="" >       </textarea>
<input type="submit" value="Save" name="save"/>
      </td>
    </tr>
    <tr>
      <th>
        Equivalent HTML text
      </th>
<th >
        chandassu
      </th>

    </tr>
    <tr>
      <td >

<textarea name="html_text" rows="10" cols="80" readonly="readonly">&amp;#3103;&amp;#3142;&amp;#3122;&amp;#3137;&amp;#3095;&amp;#3137;</textarea>
       
      </td>
<td>
<input type=button onclick=chandassu() value="Recognize">
 <textarea id="chand" rows="10" cols="50" > 
</textarea>

</td>
    </tr>


  </tbody></table>
</form>
  <p id="len">Text Length</p> <p id="wrds">Result</p>

<h4>Help</h4>
<table>
  <tbody><tr>
    <td><table border="1">
  <tbody><tr>
    <th colspan="12">Vowels
    </th>
  </tr>
  <tr>
    <td class="mg">అ
    </td>
    <td>a
    </td>
    <td class="mg">ఆ
    </td>
    <td>aa, A
    </td>
    <td class="mg">ఇ
    </td>
    <td>i
    </td>
    <td class="mg">ఈ
    </td>
    <td>ee, I
    </td>
    <td class="mg">ఉ
    </td>
    <td>u
    </td>
    <td class="mg">ఊ
    </td>
    <td>oo, U
    </td>
  </tr>
  <tr>
    <td class="mg">ఎ
    </td>
    <td>e
    </td>
    <td class="mg">ఏ
    </td>
    <td>ae, E
    </td>
    <td class="mg">ఐ
    </td>
    <td>ai
    </td>
    <td class="mg">ఒ
    </td>
    <td>o
    </td>
    <td class="mg">ఓ
    </td>
    <td>oa, O
    </td>
    <td class="mg">ఔ
    </td>
    <td>au
    </td>
  </tr>
  <tr>
    <td class="mg">ఋ
    </td>
    <td>tR
    </td>
    <td class="mg">ౠ
    </td>
    <td>TR
    </td>
      <table>
        <tbody><tr>
          <td>

  </tr>
</tbody></table>
          </td>
        </tr>
        <tr>
          <td>
<table border="1">
  <tbody><tr>
    <th colspan="6">Specials
    </th>
  </tr>
  <tr>
    <td class="mg">ఁ
    </td>
    <td>AO
    </td>
    <td class="mg">ం
    </td>
    <td>M
    </td>
    <td class="mg">ః
    </td>
    <td>H
    </td>
  </tr>
</tbody></table>
          </td>
        </tr>
      </tbody></table>
    </td>
    <td>
<table border="1">
  <tbody><tr>
    <th colspan="10">Consonants
    </th>
  </tr>
  <tr>
    <td class="mg">క్
    </td>
    <td>k, K
    </td>
    <td class="mg">ఖ్
    </td>
    <td>kh, Kh
    </td>
    <td class="mg">గ్
    </td>
    <td>g
    </td>
    <td class="mg">ఘ్
    </td>
    <td>gh
    </td>
    <td class="mg">ఙ్
    </td>
    <td>G
    </td>
  </tr>
  <tr>
    <td class="mg">చ్
    </td>
    <td>ch
    </td>
    <td class="mg">ఛ్
    </td>
    <td>Ch
    </td>
    <td class="mg">జ్
    </td>
    <td>j
    </td>
    <td class="mg">ఝ్
    </td>
    <td>jh, J, Jh
    </td>
    <td class="mg">ఞ్
    </td>
    <td>nY
    </td>
  </tr>
  <tr>
    <td class="mg">ట్
    </td>
    <td>t
    </td>
    <td class="mg">ఠ్
    </td>
    <td>T
    </td>
    <td class="mg">డ్
    </td>
    <td>d
    </td>
    <td class="mg">ఢ్
    </td>
    <td>D
    </td>
    <td class="mg">ణ్
    </td>
    <td>N
    </td>
  </tr>
  <tr>
    <td class="mg">త్
    </td>
    <td>th
    </td>
    <td class="mg">థ్
    </td>
    <td>Th
    </td>
    <td class="mg">ద్
    </td>
    <td>dh
    </td>
    <td class="mg">ధ్
    </td>
    <td>Dh
    </td>
    <td class="mg">న్
    </td>
    <td>n
    </td>
  </tr>
  <tr>
    <td class="mg">ప్
    </td>
    <td>p
    </td>
    <td class="mg">ఫ్
    </td>
    <td>ph
    </td>
    <td class="mg">బ్
    </td>
    <td>b
    </td>
    <td class="mg">భ్
    </td>
    <td>B, bh, Bh
    </td>
    <td class="mg">మ్
    </td>
    <td>m
    </td>
  </tr>
  <tr>
    <td class="mg">య్
    </td>
    <td>y
    </td>
    <td class="mg">ర్
    </td>
    <td>r
    </td>
    <td class="mg">ఱ్
    </td>
    <td>R
    </td>
    <td class="mg">ల్
    </td>
    <td>l
    </td>
    <td class="mg">ళ్
    </td>
    <td>L
    </td>
  </tr>
  <tr>
    <td class="mg">వ్
    </td>
    <td>v
    </td>
    <td class="mg">శ్
    </td>
    <td>sh
    </td>
    <td class="mg">ష్
    </td>
    <td>Sh
    </td>
    <td class="mg">స్
    </td>
    <td>s
    </td>
    <td class="mg">హ్
    </td>
    <td>h
    </td>
  </tr>
</tbody></table>
  








</body></html>
