/*!
 * Copyright (c) 2015 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

var bchanx=bchanx||{};$(function(){$(".tab").bind("click",function(){$("#all").hide();var a=$(this).attr("pos");"ALL"==a?$(".player").show():($(".player").hide(),$(".player").each(function(){$(this).attr("pos")==a&&$(this).show()}));$("#all").fadeIn()});$(".player").bind("click",function(){$(this).hasClass("selected")?$(this).removeClass("selected"):$(this).addClass("selected")})});
