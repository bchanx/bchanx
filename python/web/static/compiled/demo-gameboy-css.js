/*!
 * Copyright (c) 2015 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

var bchanx=bchanx||{};
$(function(){var d=null;Array.prototype.slice.call(document.querySelectorAll(".color")).forEach(function(b){b.addEventListener("click",function(){d&&d.classList.remove("active");var c=b.getAttribute("data-color"),a=document.querySelector("#gameboy");a.style.opacity=0;a.classList.remove(a.classList[0]);var e=a.cloneNode(!0);a.remove();e.classList.add(c);e.style.opacity=1;c=document.querySelector("#colors");c.parentNode.insertBefore(e,c);b.classList.add("active");d=b})});document.querySelector('.color[data-color="green"]').dispatchEvent(new MouseEvent("click",{view:window,
bubbles:!0}))});
