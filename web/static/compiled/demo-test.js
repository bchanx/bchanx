/*!
 * Copyright (c) 2014 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

var bchanx=bchanx||{};$(function(){var c=slidr.create("slidr",{theme:"#222",before:function(a){$(a.out.el).css("border","none")},after:function(a){$(a["in"].el).css("border","5px red solid")}}).add("h",["1","2","3","1"]).add("v",["1","2","3","1"]).start();$("#breadcrumbs").bind("click",function(){c.breadcrumbs()});var a=["border","corner","none"],b="border";$("#controls").bind("click",function(){b=a[(a.indexOf(b)+1)%a.length];c.controls(b)})});
