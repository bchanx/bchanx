/*!
 * Copyright (c) 2015 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

var bchanx=bchanx||{};
$(function(){var c={},f,g;$("#touch").width();$("#touch").height();var d=document.getElementById("touch");console.log("--\x3e> OK");var l=function(a){$("#touch").text("touchmove");if(!(1<a.touches.length||a.scale&&1!==a.scale)){var b=a.touches[0];f=b.pageX-c.x;g=b.pageY-c.y;$("#deltax").text(f);$("#deltay").text(g);var b=Number(+new Date-c.time),e=Math.abs(f)+Math.abs(g);if(100<b&&(console.log("--\x3e> DURATION: "+b+", total: "+e),console.log("--\x3e> RATE: "+e/b),0.25>e/b)){console.log("--\x3e> prob not swiping, abort!");$("#scrolling").text("YES");
return}$("#scrolling").text("NO");a.preventDefault()}},m=function(a){console.log("--\x3e> END LISTENER!");$("#touch").text("touchend");a=Number(+new Date-c.time);$("#duration").text(a);if(250>a){a=Math.abs(f);var b=Math.abs(g),e=20<a,d=20<b,h=0>f?"right":"left",k=0>g?"down":"up";$("#valid").text(e||d);(a=e&&d?a>b?h:k:e?h:d?k:null)&&$("#dir").text(a)}$("#touch").css("border-color","black")};d.addEventListener("touchstart",function(a){console.log("--\x3e> START LISTENER!");$("#dir").text("");$("#valid").text("");
$("#scrolling").text("");$("#touch").css("border-color","green").text("touchstart");isScrolling=!1;a=a.touches[0];c={x:a.pageX,y:a.pageY,time:+new Date};$("#x").text(c.x);$("#y").text(c.y);$("#time").text(c.time);g=f=0;d.addEventListener("touchmove",l);d.addEventListener("touchend",m)});slidr.create("slidr-demo",{keyboard:!0,touch:!0}).add("h",["1","2","3","1"]).start()});
