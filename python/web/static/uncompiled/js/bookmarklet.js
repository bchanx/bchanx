//                                                                                                       
// Copyright 2013. All Rights Reserved.
// Author: Brian Chan
// Contact: bchanx@gmail.com
//

// JUKEBOX 
javascript:(function(){function addVideo(){window.location.href='http://www.bchanx.com/jukebox/playlistAddMedia?key='+CryptoJS.HmacMD5(location.href,"<key>")+'&pid=1&media-url='+encodeURIComponent(location.href);}script=document.createElement('script');script.src='https://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-md5.js';script.onload=addVideo;document.body.appendChild(script);})();

