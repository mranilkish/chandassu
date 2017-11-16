// -*- mode: java; -*-

// Chandassu Recognizer - Identifies Chadhassu for Telugu Poems or Text
// Indic scripts.

// Copyright (C) 2017, P Anil Kishan <anilkishu@gmail.com>, S Harika <sirimallaharika14@gmail.com>, 
G Navitha <navitha.gomasi6@gmail.com> ,Humera Tazeen <mirzatazeen.518@gmail.com>,

// Chandassu Recognizer is free software; you can redistribute it
// and/or modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2 of
// the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
// 02110-1301, USA.

// 	$Id: converter.js,v 1.1.1.1 2006-05-26 11:49:07 vijay Exp $	
// 	Author: Vijay Lakshminarayanan	
// 	$Date: 2006-05-26 11:49:07 $	

function split_word(word)
{
  var syllables = new Array(0);
  var vowel_start_p = true;
  while (word.length) {
    re = new RegExp(vowels);
    var index = word.search(vowels);
    if (index == 0) {  //the vowel's at the start of word
      var matched = re.exec(word)[0]; //what is it?
      if (vowel_start_p) {
	syllables.push(("~"+matched)); //one more to the syllables
      } else {
	syllables.push(matched);
      }
      vowel_start_p = true;
      word = word.substring(matched.length);
    } else {
      re = new RegExp(consonants);
      var index = word.search(consonants);
      if (index == 0) {
	var matched = re.exec(word)[0];
	syllables.push(matched);
	vowel_start_p = false;
	word = word.substring(matched.length);

	//look ahead for virama setting
	var next = word.search(vowels);
	if (next != 0 || word.length == 0)
	  syllables.push('*');

      } else {
	syllables.push(word.charAt(0));
	word = word.substring(1);
      }
    }
  }
//alert(syllables);
  return syllables;
}

function match_code(syllable_mcc)
{
  var matched = letter_codes[syllable_mcc];

  if (matched != null) return matched;
  return syllable_mcc;
}

function one_word(word_ow)
{
  if (!word_ow) return "";
  var syllables_ow = split_word(word_ow);
  var letters_ow = new Array(0);

  for (var i_ow = 0; i_ow < syllables_ow.length; i_ow++) {
    letters_ow.push(match_code(syllables_ow[i_ow]));
  }
  return letters_ow.join("");
}

function many_words(sentence)
{

  var regex = "((" + vowels + ")|(" + consonants + "))+";
  var words = new Array(0);


  while (sentence.length >= 1) {

    re = new RegExp("^``" + regex);

    var match = re.exec(sentence);

    if (match != null) {
      match = match[0];
      words.push("`");
      words.push(one_word(match.substring(2)));
      sentence = sentence.substring(match.length);
    } else {
      re = new RegExp("^`" + regex);
      match = re.exec(sentence);
      if (match != null) {
	match = match[0];
	words.push(match.substring(1));
	sentence = sentence.substring(match.length);
      } else {
	re = new RegExp("^" + regex);
	match = re.exec(sentence);
	if (match != null) {
	  match = match[0];
	  words.push(one_word(match));
	  sentence = sentence.substring(match.length);
	} else {
	  words.push(sentence.charAt(0));
	  sentence = sentence.substring(1);
	}
      }
    }
  }
  return words.join("");
}

function print_many_words(index_pmw)
{
  var text_pmw = many_words(document.convarea.many_words_text.value);

  var ans = "";
  while (text_pmw.length) {
    var unicode_chars = /&#[0-9]+;/;
    re = unicode_chars;
    var matche = re.exec(text_pmw);
    if (matche != null) {
      matche = matche[0];
      search = text_pmw.search(unicode_chars);
      ans += text_pmw.substring(0, search);
      ans += String.fromCharCode(matche.match(/[0-9]+/));
      text_pmw = text_pmw.substring(search + matche.length);
    } else {
      ans += text_pmw.substring(0);
      text_pmw = "";
    }
  }

  document.convarea.converted_text.value ="\n"+ ans;

  var html_txt = "\n";
  for (i=0; i<ans.length; i++) {
    var unicode_character = ans.charCodeAt(i);
//alert(ans.charAt(i));
    switch (unicode_character) {
    case 32:
      html_txt += " ";
      break;
    case 10:
    case 13:
      html_txt += "<br/>\n\n";
      break;
    case 94:html_txt += "&#8205;" ;break;
    default:
      html_txt += "&#" + unicode_character + ";";
    }
  }

  document.convarea.html_text.value = html_txt;
tstrlen(ans);
splitter(ans);
}
function tstrlen(txt)
{
sl=0;

for (i=0; i<txt.length; i++) {
    var ucode = txt.charCodeAt(i);
//alert(ucode);
if(ucode==3149)
{
i+=1;continue;
}
switch(ucode)
{//skip symbols
case 3134:case 3135:case 3136:case 3137:case 3138:
case 3142:case 3143:case 3144:case 3146:case 3147:
case 3148:case 3074:case 3075:case 3073:case 3140:
case 32:case 10:case 33:case 44:case 46:case 124:
case 34:case 39:case 3139:
;continue;
}
sl++;
}

var oo=document.getElementById("len");
oo.innerHTML="Text count:"+sl;

}
b=[];
function splitter(txt)
{
txt+=" ";
 k=0;w=0;ww=0;
a=[""];
for (i=0; i<txt.length; i++) 
{
var ucode = txt.charCodeAt(i);
//alert(ucode);
switch(ucode)
{//skip symbols
case 32:case 10:case 33:case 44:case 46:case 124:
case 34:case 39:a[k+1]="";k++;ww=w=0;continue;
case 3149:ww++;w=1;a[k]+=ucode+",";continue;
}
if((ucode>=3093&&ucode<=3129))
{
if(w==1)
{
if(txt.charCodeAt(i-1)==3149)
{
a[k]+=ucode+",";w=1;ww++;
continue;
}

a[k+1]=ucode+",";

ww=w=1;k++;continue;
}
else
{
if(a[k]==null)
a[k]=ucode+",";
else
a[k]+=ucode+",";
w=1;
ww++;

}

}

switch(ucode)
{//skip symbols
case 3134:case 3135:case 3136:case 3137:case 3138:
case 3142:case 3143:case 3144:case 3146:case 3147:
case 3148:case 3074:case 3075:case 3140:case 3139:
case 3077:case 3078:case 3079:case 3080:case 3081:
case 3082:case 3086:case 3086:case 3087:case 3088:
case 3090:case 3091:case 3092:case 3073:
if((txt.charCodeAt(i+1)==3074||txt.charCodeAt(i+1)==3075||txt.charCodeAt(i+1)==3073))
{

a[k]+=ucode+","+txt.charCodeAt(i+1)+"";
a[k+1]="";
i++;
k++;
w=0;
ww=0;

}
else 
{
a[k]+=ucode;
ww=w=0;k++;a[k]="";
}


}


}

b=[];
for(i=0,j=-1;i<a.length;i++)
{
{
if(!isNaN(a[i].charCodeAt(0)))
b[++j]=a[i];
}
}
//alert(b);


}
pattern=[0];
function res()
{
var rr;
R=0;
//alert(pattern.length);
switch(pattern[0])
{
case "UUU"://MA 
rr="sardhulam";

a=["UUU" ,"IIU", "IUI" ,"IIU", "UII", "UUI" ,"U"];
for(i=1;i<pattern.length;i++)
if(a[i%7]==pattern[i]) R++;
break;
case "IIU"://SA
rr="mathebham"; 
a=["IIU" ,"UII", "UIU" ,"III", "UUU", "IUU" ,"IU"];
for(i=1;i<pattern.length;i++)
if(a[i%7]==pattern[i]) R++;
break;
case "UII"://BHA
rr="utplamamala"; 
a=["UII" ,"UIU", "III" ,"UII", "UII", "UIU" ,"IU"];
for(i=1;i<pattern.length;i++)
if(a[i%7]==pattern[i]) R++;
break;
case  "III":
rr="champakamala"; 
a=["III" ,"IUI", "UII" ,"IUI", "IUI", "IUI" ,"UIU"];
for(i=1;i<pattern.length;i++)
if(a[i%7]==pattern[i]) R++;
break;
default: return "error in recognizing";

}
per=(R/i*100);
return per.toFixed(2)+"% "+rr;
}
function chandassu()
{
z="";
c=chandassrec(b);
s=c.split(",");
for(i=0,j=0;i<s.length;j++)
{

switch(pattern[0])
{
case "UUU"://MA
if((j+1)%7==0) {z+=pattern[j]=s[i];i+=1}
else {z+=pattern[j]=s[i]+((s[i+1]==undefined) ?"":s[i+1])+
((s[i+2]==undefined) ?"":s[i+2]);i+=3;}
break;
case "IIU"://SA
if((j+1)%7==0) {z+=pattern[j]=s[i]+s[i+1];i+=2} 
else {z+=pattern[j]=s[i]+((s[i+1]==undefined) ?"":s[i+1])+
((s[i+2]==undefined) ?"":s[i+2]);i+=3;} 
break;
case "UII"://BHA
 if((j+1)%7==0)
{z+=pattern[j]=s[i]+s[i+1];i+=2}
else {z+=pattern[j]=s[i]+((s[i+1]==undefined) ?"":s[i+1])+
((s[i+2]==undefined) ?"":s[i+2]);i+=3;} 
break;

default:
z+=pattern[j]=s[i]+((s[i+1]==undefined) ?"":s[i+1])+
((s[i+2]==undefined) ?"":s[i+2]);i+=3;


//alert(pattern[j]);
}

//alert(showc(pattern[0])=="య");


if((k=showc(pattern[j]))!="x")
z+=","+k;


}

	

var obj=document.getElementById("chand");
obj.innerHTML=z;
//alert(pattern);
var oo=document.getElementById("wrds");
oo.innerHTML="res:"+res();
//alert("hi");
}

function chandassrec(x)
{
y="";
for(i=0;i<x.length;i++)
{

if(pollu(x[i])==true) {alert(x[i]);i++;continue;}


if(x[i+1]!=null && pollu(x[i+1])==true)
{
i=i+2;
y+="U,";

continue;
}

if(x[i+1]!=null)
{
if(issamdwit(x[i+1]))
{
y+="U,";
continue;
}
}
s=x[i].split(",");
//alert(s.length+":"+s);
if(s.length==1||s[1]=="")
{
y+=cc(parseInt(s[0]));
continue;
}


tok=parseInt(s[s.length-1]);
//alert(tok);
if(tok==3074||tok==3075)
{
y+="U,";
continue;
}


if(dmatra(s[s.length-1]))
y+="U,";
else
y+="I,";


}
return y;
}
function cc(x)
{
switch(x)
{
case 3078:
case 3080:
case 3082:
case 3087:
case 3088:
case 3091:
case 3091:
case 3092:
//alert(x);
return "U,";
}
switch(x)
{
case 3077:case 3079:case 3081:case 3086:case 3090:case 3102:case 3093:case 3095:
case 3098:case 3100:case 3110:case 3103:case 3105:case 3107:case 3108:case 310:case 3112:
case 3114:case 3116:case 3118:case 3119:case 3120:case 3122:case 3125:
case 3126:case 3127:case 3128:case 3129:case 3123:case 3121:case 3097:case 3094:case 3096:case 3099:case 3104:case 3101:case 3106:
case 3109:case 3111:case 3115:case 3117:

//alert(x);

return "I,";
}

return "x";
}

function dmatra(x)
{
x=parseInt(x);
switch(x)
{
case 3134:
case 3136:
case 3138:
case 3143:
case 3144:
case 3147:
case 3148:
case 3140:
case 3074:
case 3075:
 return true;
}
return false;
}

function issamdwit(x)
{
s=x.split(",");
for(j=0;j<s.length;j++)
{
if(parseInt(s[j])==3149)
return true;
}
return false;
}
function pollu(x)
{
s=x.split(",");
if(s[s.length-1] =="")
k=parseInt( s[s.length-2] );
else
k=parseInt( s[s.length-1] ) ;
if(k==3149)
return true;
return false;
}

function showc(g)
{
//alert(g);

switch(g){
case "IUU" :return "య"; 
case "UUU" :return "మ" ; 
case "UUI" :return "త"; 
case "UIU" :return "ర"; 
case "IUI" :return"జ" ; 
case "UII" :return"భ"; 
case "III" :return"న"; 
case "IIU" :return"స"; 
case "IU" :return"వ"; 
case "U" :return"గ"; 
case "I" :return "ల";
}

return "x";
}
function fff()
{

var oo=document.getElementById("ppm");
oo.value=oo.innerHTML;
}
var ind=0;

function movv(x) {
if((ind+x)<=0)
ind=0;
else
ind=ind+x;

var oo=document.getElementById("id"+ind);
if(oo==null) ind--;

var ob=document.getElementById("poems");
ob.innerHTML=1+ind+")"+oo.innerHTML;

}








//tpce06uc
