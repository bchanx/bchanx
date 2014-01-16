/*!
 * Copyright (c) 2014 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

var bchanx=bchanx||{};
$(function(){var e=function(a,b){if(Array.prototype.indexOf)return a.indexOf(b);if(a&&a.length)for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1},r=["one","two","three","four","one"],s=["six","five","four","six"],l=function(a,b){b=b||"linear";a.add("h",r,b,!0).add("v",s,b,!0).start();var c=b;$("#slidr-home-demo-effects > div").removeClass("active");$("#slidr-home-demo-effects > div."+c).addClass("active");$("#slidr-home-demo > div").text(c)},c=slidr.create("slidr-home-demo",{overflow:!0,
keyboard:!0});l(c,"linear");c.auto();var d="ontouchstart"in window?"touchend":"click";$('aside[id="slidr-home-demo-control"]').one(d,function(){c.stop()});$(document).one("keydown",function(){c.stop()});$('aside[id="slidr-home-demo-breadcrumbs"]').one(d,function(){c.stop()});$("#slidr-home-demo-effects > div").each(function(){$(this).bind(d,function(){l(c,$(this).text())})});var g=["border","corner","none"];$("#slidr-home-demo-settings > div").each(function(){$(this).bind(d,function(){var a=$(this).text(),
b=$(this).attr("data-meta");"controls"===a?(a=(e(g,b)+1)%g.length,a=g[a],$(this).attr("data-meta",a),c.controls(a),"none"===a?$(this).removeClass("active"):$(this).addClass("active")):"breadcrumbs"===a&&(a="off"===b?"on":"off","on"===a?$(this).addClass("active"):$(this).removeClass("active"),$(this).attr("data-meta",a),c.breadcrumbs())})});if(bchanx.isIE)$(".slidr-docs").remove(),$('a[href="#docs"]').attr("href","https://github.com/bchanx/slidr");else{$(".markdown").each(function(){this.innerHTML=
marked("".trim?this.innerHTML.trim():this.innerHTML.replace(/^\s+|\s+$/g,""))});hljs.initHighlightingOnLoad();slidr.create("slidr-nav-demo",{controls:"none",overflow:!0,keyboard:!0,touch:!0}).add("h",["one","two","three","one"],"cube").add("v",["one","two","three","one"],"linear").start();for(var m=[slidr.create("slidr-div",{theme:"#222"}).start(),slidr.create("slidr-img",{theme:"#222"}).start(),slidr.create("slidr-ul",{theme:"#222"}).start()],f=["#slidr-div-control","#slidr-img-control","#slidr-ul-control"],
n=0,h;h=f[n];n++)$(h+" .slidr-control.left").bind(d,function(a){a.preventDefault?a.preventDefault():a.returnValue=!1;a.stopPropagation();a=0;for(var b;b=m[a];a++)b.slide("left")}),$(h+" .slidr-control.right").bind(d,function(a){a.preventDefault?a.preventDefault():a.returnValue=!1;a.stopPropagation();a=0;for(var b;b=m[a];a++)b.slide("right")});slidr.create("slidr-api-demo",{breadcrumbs:!0,overflow:!0}).add("h",["one","two","three","one"]).add("v",["five","four","three","five"],"cube").start();slidr.create("slidr-css-demo",
{breadcrumbs:!0,overflow:!0,transition:"cube"}).add("h",["one","two","three","one"],"linear").start();slidr.create("slidr-inline-dynamic",{transition:"cube",controls:"none"}).add("v",["one","three","two","one"]).auto(3E3,"up");slidr.create("slidr-inline-static",{transition:"cube",controls:"none"}).add("v",["one","three","two","one"]).auto(3E3,"up");var k=[];$(".markdown[id]").each(function(){var a=$(this).find("h2").get(0);if(a){var b=$('<div class="breadcrumb-link"><div class="action"><a href="#'+
a.innerHTML.toLowerCase()+'">'+a.innerHTML+'</a></div><div class="top"><a href="#">Top</a></div><h2>'+a.innerHTML+"</h2></div>").get(0);a.parentNode.insertBefore(b,a);a.parentNode.removeChild(a);k.push("#"+a.innerHTML.toLowerCase())}})}var t=["#home","#docs"],p=function(){var a=window.location.hash;return 0<=e(t,a)?a.slice(1):0<=e(k,a)?"docs":""===a&&0>e(window.location.href,"#")?"home":null},q=function(){var a=window.location.hash,b=$('a[href="'+a+'"]');0<=e(k,a)&&b&&b.get(0).click()},f=p(),u=slidr.create("slidr",
{controls:"none",transition:"cube",overflow:!0}).start(f);"docs"===f&&q();$(window).bind("hashchange",function(a){if(a=p())u.slide(a),q()})});
