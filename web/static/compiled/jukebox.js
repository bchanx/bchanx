var bchanx = bchanx || {};var Playlist = function(player, videos, shuffled) {var self = this;self.TYPE = {'UNKNOWN': -1,'YOUTUBE': 0};self.player = '#' + player;self.videos = videos || [];self.idToVideo = {};for (var i = 0; i < self.videos.length; i++) {self.idToVideo[self.videos[i]['id']] = self.videos[i];}var getShuffleOrder = function() {var order = self.videos.slice(0);for (var i = order.length - 1; i > 0; i--) {var j = Math.floor(Math.random() * (i + 1));var tmp = order[i];order[i] = order[j];order[j] = tmp;}return order;};self.shuffledVideos = getShuffleOrder();self.isShuffled = !!shuffled;self.isRepeat = false;self.currentList = function() {return (self.isShuffled) ? self.shuffledVideos : self.videos;};self.current = self.currentList()[0];self.getResource = function(id, type) {if (id) {if (type == self.TYPE.YOUTUBE) {return 'https://www.youtube.com/embed/' + id + '?rel=0&enablejsapi=1&iv_load_policy=3&showinfo=0&theme=light';}}return '';};self.getUrl = function() {return (self.current) ? self.getResource(self.current['meta']['mediaId'], self.current['meta']['mediaType']) : '';};self.getId = function() {return (self.current) ? self.current['id'] : '';};self.getMediaId = function() {return (self.current) ? self.current['meta']['mediaId'] : '';};self.toggleShuffle = function() {self.isShuffled = !self.isShuffled;};self.toggleRepeat = function() {self.isRepeat = !self.isRepeat;};self.prev = function() {var cur = self.currentList();if (cur.indexOf(self.current) >= 0) {var index = (cur.indexOf(self.current) + cur.length - 1) % cur.length;self.current = cur[index];}return self.getMediaId();};self.next = function() {var cur = self.currentList();if (cur.indexOf(self.current) >= 0) {var index = (cur.indexOf(self.current) + 1) % cur.length;self.current = cur[index];}return self.getMediaId();};self.isEmpty = function() {return !self.current;};self.setCurrent = function(id) {if (id in self.idToVideo) {self.current = self.idToVideo[id];return true;}return false;};};/*** slidr - A simple Javascript library for adding slide effects. Currently under development.*/function SlidrException(message) {this.message = message;}function Slidr() {/*** A {mapping} of slides to their neighbors.*/var _slidr = {};/*** The slide to start at.*/var _start = null;/*** The current slide.*/var _current = null;/*** Defines our available css transitions.*/var _css = {'cube': {'init': {'-webkit-transition': 'all 1s cubic-bezier(0.15, 0.9, 0.25, 1)','-moz-transition': 'all 1s cubic-bezier(0.15, 0.9, 0.25, 1)','-o-transition': 'all 1s cubic-bezier(0.15, 0.9, 0.25, 1)','-webkit-backface-visibility': 'hidden','-moz-backface-visibility': 'hidden','backface-visibility': 'hidden','-webkit-transform-style': 'preserve-3d','-moz-transform-style': 'preserve-3d','transform-style': 'preserve-3d',},'reset': {'left': function(width) { return _cssTransform("rotateY(-90deg) translateZ(" + width/2 + "px)") },'right': function(width) { return _cssTransform("rotateY(90deg) translateZ(" + width/2 + "px)") },'up': function(height) { return _cssTransform("rotateX(-90deg) translateZ(" + height/2 + "px)") },'down': function(height) { return _cssTransform("rotateX(90deg) translateZ(" + height/2 + "px)") },},'in': {'left': function(width) { return _cssTransform("rotateY(0deg) translateZ(" + width/2 + "px)") },'right': function(width) { return _cssTransform("rotateY(0deg) translateZ(" + width/2 + "px)") },'up': function(height) { return _cssTransform("rotateX(0deg) translateZ(" + height/2 + "px)") },'down': function(height) { return _cssTransform("rotateX(0deg) translateZ(" + height/2 + "px)") },},'out': {'left': function(width) { return _cssTransform("rotateY(90deg) translateZ(" + width/2 + "px)") },'right': function(width) { return _cssTransform("rotateY(-90deg) translateZ(" + width/2 + "px)") },'up': function(height) { return _cssTransform("rotateX(90deg) translateZ(" + height/2 + "px)") },'down': function(height) { return _cssTransform("rotateX(-90deg) translateZ(" + height/2 + "px)") },}}};/*** CSS rules to apply to all slides in our Slidr when we initialize.*/function _cssInit(element, transition) {var css = _lookup(_css, [transition, 'init']);if (element && $(element).length && css) {var display = $(element).css('display');display = (display === 'none') ? 'block' : display;_extend(css, {'display': display,'opacity': '0','position': 'absolute','left': '50%','margin-left': '-' + $(element).width()/2 + 'px','z-index': '-1'});$(element).css(css);return true;}return false;}/*** CSS rules to apply to an `element` about to enter the Slidr viewport from `dir` with `transition` effects.*/function _cssReset(element, transition, dir) {var css = _lookup(_css, [transition, 'reset', dir]);if (element && $(element).length && css) {css = (dir === 'up' || dir === 'down') ? css($(element).height()) : css($(element).width());$(element).css(css).hide();return true;}return false;}/*** CSS rules to apply to an `element`, coming [in|out] as `type`, from the `dir` direction with `transition` effects.*/function _cssApply(element, transition, type, dir) {var css = _lookup(_css, [transition, type, dir]);if (element && $(element).length && css) {css = (dir === 'up' || dir === 'down') ? css($(element).height()) : css($(element).width());var opacity = (type === 'in') ? '1' : '0';$(element).css(css).css('opacity', opacity).show();return true;}return false;}/*** Helper for applying CSS transform rules.*/function _cssTransform(rules) {return {'-webkit-transform': rules,'-moz-transform': rules,'-o-transform': rules,'transform': rules,}}/*** Traverse [keys] in {object} to lookup a value, or null if nothing found.*/function _lookup(obj, keys) {var result = null;if (!!obj && obj.constructor === Object && !!keys && keys.constructor === Array) {result = obj;for (var k in keys) {if (!result.hasOwnProperty(keys[k])) {return null;}result = result[keys[k]];}}return result;}/*** Add all key:values found in {from} to {to}, in place. Overwrites existing keys by default.*/function _extend(to, from, opt_noOverwrite) {if (!!to && to.constructor === Object && !!from && from.constructor === Object) {for (var f in from) {if (to.hasOwnProperty(f) && !!opt_noOverwrite) {continue;}to[f] = from[f];}}return to || {};}/*** Get the next transition for `element` entering/leaving the viewport from `dir` direction.*/function _getTransition(transition) {return (transition && self.transitions[transition]) ? transition : 'cube';}/*** Applies the out transition to an `element` being displaced by a slide coming from the `dir` direction.*/function _transitionOut(element, dir) {if (element && $(element).length) {var transition = _getTransition();if (_cssApply(element, transition, 'out', dir)) {return true;}}return false;}/*** Applies the in transition to an `element` entering the Slidr viewport, from the `dir` direction.*/function _transitionIn(element, dir) {if (element && $(element).length) {var transition = _getTransition();if (_cssReset(element, transition, dir)) {if (_cssApply(element, transition, 'in', dir)) {return true;}}}return false;}/*** Transition to the next slide in the `dir` direction.*/function _slide(dir) {var next = _lookup(_slidr, [_current, dir]);if (_current && next) {$(_current).stop();_transitionOut(_current, dir);_transitionIn(next, dir);_current = next;return true;}return false;}/*** Sets the height of our Slidr container in order to fully contain the slides.*/function _setHeight(height) {if ($('#slidr').length) {$('#slidr').css('min-height', height + 'px');}}/*** Keyboard bindings for navigating Slidr.*/function _dynamicBindings() {$(document).keydown(function(e) {if (e.which === 40) {self.down();} else if (e.which === 39) {self.right();} else if (e.which === 38) {self.up();} else if (e.which === 37) {self.left();}});}/*** Who am I?*/var self = this;/*** [List] of available slide transitions.*/self.transitions = ['cube'];/*** Adds a set of slides to our Slidr.* `slides` - expects an object with a `horizontal` and/or a `vertical` field, which contains [lists] of DOM elements* we wish to transform into slides.** `opt_transition` - defines what transition to use for navigating the given set of slides. Slidr will use a* default transition if nothing is given.** `opt_warn` - by default, Slidr does a best-effort to compile the slides according to the given specifications.* We silently abort adding the rest of a row if we end up redefining the same transition to two different slides.* Use this flag if you want it to throw an exception instead (useful during development).** e.g. `slides`:* {*   'horizontal': [*     ['#one', '#two', '#three', '#four'],*   ],*   'vertical': [*     ['#five', '#two', '#six'],*     ['#seven', '#four', '#eight'],*   ]* }*/self.add = function(slides, opt_transition, opt_warn) {if (slides.horizontal) {for (var i = 0; i < slides.horizontal.length; i++) {self.addHorizontal(slides.horizontal[i], opt_transition, opt_warn);}}if (slides.vertical) {for (var i = 0; i < slides.vertical.length; i++) {self.addVertical(slides.vertical[i], opt_transition, opt_warn);}}};/*** Adds a [list] of slides we want to navigate in the left/right direction.*/self.addHorizontal = function(slides, opt_transition, opt_warn) {var current;for (var i = 0; current = slides[i]; i++) {var newLeft = slides[i-1] || null;var newRight = slides[i+1] || null;if (_slidr[current]) {var existingLeft = _slidr[current].left;var existingRight = _slidr[current].right;var previousLeft = _lookup(_slidr, [newRight, 'left']);if ((existingRight && newRight && existingRight != newRight)|| (existingLeft && newLeft && existingLeft != newLeft)|| (previousLeft && previousLeft != current)) {if (opt_warn) {throw new SlidrException("[Slidr] Horizontal add error.");}return false;}} else {_slidr[current] = {};}if (_cssInit(current, _getTransition(opt_transition))) {if (!_start) {_start = current;}if (newLeft) {_slidr[current].left = newLeft;}if (newRight) {_slidr[current].right = newRight;}}}return true;};/*** Adds a [list] of slides that we want to navigate in the up/down direction.*/self.addVertical = function(slides, opt_transition, opt_warn) {var current;for (var i = 0; current = slides[i]; i++) {var newUp = slides[i-1] || null;var newDown = slides[i+1] || null;if (_slidr[current]) {var existingUp = _slidr[current].up;var existingDown = _slidr[current].down;var previousUp = _lookup(_slidr, [newDown, 'up']);if ((existingUp && newUp && existingUp != newUp)|| (existingDown && newDown && existingDeft != newDown)|| (previousUp && previousUp != current)) {if (opt_warn) {throw new SlidrException("[Slidr] Vertical add error.");}return false;}} else {_slidr[current] = {};}if (_cssInit(current, _getTransition(opt_transition))) {if (!_start) {_start = current;}if (newUp) {_slidr[current].up = newUp;}if (newDown) {_slidr[current].down = newDown;}}}return true;};/*** Slide up.*/self.up = function() {return _slide('up');};/*** Slide down.*/self.down = function() {return _slide('down');};/*** Slide left.*/self.left = function() {return _slide('left');};/*** Slide right.*/self.right = function() {return _slide('right');};/*** Start the Slidr!* Defaults to showing the first slide added. Specify a slide to begin with using `opt_start`.*/self.init = function(opt_start) {if (!!opt_start && !!_slidr[opt_start]) {_start = opt_start;}if ($('#slidr').length && _start && $(_start).length) {$('#slidr').css({'position': 'relative','margin': '0 auto','display': 'table',});_current = _start;$(_current).hide().css({'z-index': '1', 'opacity': '1'}).show();_setHeight($(_current).height());_dynamicBindings();}};}$(function() {if ($('#slidr').length) {$('#slidr').css('display', 'none');}});bchanx.player = {};function onYouTubeIframeAPIReady() {bchanx.player = new YT.Player('video-src', {events: {'onReady': onPlayerReady,'onStateChange': onPlayerStateChange}});}function onPlayerReady(e) {e.target.setVolume(100);e.target.playVideo();}function onPlayerStateChange(e) {if (e.data == YT.PlayerState.PLAYING) {$('#play').hide();$('#pause').css('display', 'inline-block');} else if (e.data == YT.PlayerState.PAUSED) {$('#pause').hide();$('#play').css('display', 'inline-block');} else if  (e.data == YT.PlayerState.ENDED) {$('#next').trigger('click', [true]);}}bchanx.Jukebox = function() {var self = this;self.slidr = null;self.playlist = null;self.playlistData = {};var formatTime = function(t) {return Math.floor(t / 60) + ':' + ("0" + t % 60).slice(-2);};var jq = function(id) {return '#' + id.replace(/(:|\.|\[|\])/g, '\\$1');};var staticBindings = function() {$('#pause').bind('click', function() {if (self.playlist && !self.playlist.isEmpty() && bchanx.player.hasOwnProperty('pauseVideo')) {bchanx.player.pauseVideo();}});$('#play').bind('click', function() {if (self.playlist && !self.playlist.isEmpty() && bchanx.player.hasOwnProperty('playVideo')) {bchanx.player.playVideo();}});$('#prev').bind('click', function() {if (self.playlist && !self.playlist.isEmpty() && bchanx.player.hasOwnProperty('loadVideoById')) {bchanx.player.loadVideoById(self.playlist.prev());self.updateNowPlaying();}});$('#next').bind('click', function(event, mediaHasEnded) {if (self.playlist && !self.playlist.isEmpty()) {if (mediaHasEnded && self.playlist.isRepeat) {bchanx.player.seekTo(0);} else if (bchanx.player.hasOwnProperty('loadVideoById')) {bchanx.player.loadVideoById(self.playlist.next());self.updateNowPlaying();}}});$('#repeat').bind('click', function() {if (self.playlist && !self.playlist.isEmpty()) {self.playlist.toggleRepeat();var r = self.playlist.isRepeat;$('#repeat').removeClass((r) ? 'off' : 'on').addClass((r) ? 'on' : 'off');}});$('#shuffle').bind('click', function() {if (self.playlist && !self.playlist.isEmpty()) {self.toggleShuffle();}});$('#playlist').bind('click', function() {if (self.playlist && !self.playlist.isEmpty()) {self.toggleTracklist();}});};var dynamicBindings = function() {$(document).on('click', '.mediaItem', function() {if (self.playlist && !self.playlist.isEmpty()) {if (self.playlist.setCurrent($(this).attr('mediaid'))) {bchanx.player.loadVideoById(self.playlist.getMediaId());self.updateNowPlaying();}}});$(document).on('click', 'li[pid]', function() {self.loadPlaylist($(this).attr('pid'));});$(document).keydown(function(e) {if (e.which === 78) {$('#next').click();} else if (e.which === 80) {$('#prev').click();} else if (e.which === 83) {$('#shuffle').click();}});};self.init = function() {staticBindings();dynamicBindings();$.ajax({'url': '/jukebox/playlistGetAll','type': 'GET','dataType': 'json','success': self.onPlaylistGetAll});};self.onPlaylistGetAll = function(data) {if (data.length) {data = data.sort(function(a, b) {return a.pid - b.pid;});var playlists = $('<ul></ul>');for (var i = 0; i < data.length; i++) {playlists.append('<li pid="' + data[i].pid + '">' + data[i].title + '</li>');}$('#playlists').append(playlists);}self.slidr = new Slidr();self.slidr.addHorizontal(['#playlists-container', '#video-container', '#about-container', '#playlists-container']);self.slidr.addVertical(['#playlists-container', '#video-container', '#about-container', '#playlists-container']);self.slidr.init();};self.loadPlaylist = function(pid) {self.slidr.right();setTimeout(function() {if (self.playlistData[pid]) {return self.onLoadPlaylist(pid, self.playlistData[pid]);}$.ajax({'url': '/jukebox/playlistLoad','type': 'POST','data': {'pid': pid},'dataType': 'json','success': function(result) {self.playlistData[result.pid] = result.data;self.onLoadPlaylist(result.pid, result.data);}});}, 600);};self.onLoadPlaylist = function(pid, data) {self.playlist = new Playlist('video-src', data, true);if (self.playlist.isEmpty()) {self.toggleVideoDisplay(true);} else {self.toggleVideoDisplay();$('tbody').remove();var normalTracklist = self.createTracklist(self.playlist.videos, 'normal-tracklist');var shuffledTracklist = self.createTracklist(self.playlist.shuffledVideos, 'shuffled-tracklist');$('#video-table').append(normalTracklist, shuffledTracklist);$('tr.themeable').addClass($('#theme').attr('current-theme'));if (!$('#video-src').attr('src') || !bchanx.player.hasOwnProperty('playVideo')) {$('#video-src').attr('src', self.playlist.getUrl()).css('visibility', 'visible');} else {bchanx.player.loadVideoById(self.playlist.getMediaId());}self.toggleTracklist(true);self.toggleShuffle(true);$('#video-settings').fadeIn();}self.updateNowPlaying(pid);};self.toggleVideoDisplay = function(hide) {if (hide) {if (bchanx.player.hasOwnProperty('stopVideo')) {bchanx.player.stopVideo();}$('.playlist-playing').removeClass('playlist-playing');$('#video-src').hide();$('#video-settings').hide();$('#video-src-none').css('visibility', 'visible');} else {$('#video-src-none').css('visibility', 'hidden');$('#video-src').show();}};self.updateNowPlaying = function(pid) {if (self.playlist && !self.playlist.isEmpty()) {$('.playing').removeClass('playing');$('tr[mediaid="' + self.playlist.getId() + '"]').addClass('playing');var title = self.playlist.current['meta']['title'];var length = self.playlist.current['meta']['duration'];$('#video-title').attr('title', title).text(title);$('#video-length').text(formatTime(length));}if (pid) {$('.playlist-playing').removeClass('playlist-playing');$('li[pid="' + pid + '"]').addClass('playlist-playing');}};self.toggleShuffle = function(opt_reset) {if (self.playlist) {if (!opt_reset) {self.playlist.toggleShuffle();}var s = self.playlist.isShuffled;$('#shuffle').removeClass((s) ? 'off' : 'on').addClass((s) ? 'on' : 'off');var oldPlaylist = 'tbody.' + ((s) ? 'normal' : 'shuffled') + '-tracklist';var switchingPlaylist = 'tbody.' + ((s) ? 'shuffled' : 'normal') + '-tracklist';$(oldPlaylist).css('opacity', 0).hide();$(switchingPlaylist).show().animate({'opacity': 1}, 400);}};self.toggleTracklist = function(opt_reset) {if (opt_reset || $('#playlist').hasClass('hide')) {$('#playlist').removeClass('hide').addClass('show');$('#video-playlist').hide();$('#video-playing-info').fadeIn();} else {$('#playlist').removeClass('show').addClass('hide');$('#video-playing-info').hide();$('#video-playlist').fadeIn();}};self.createTracklist = function(data, className) {var tracklist = $('<tbody class="' + className + '" style="display: none"></tbody>');for (var d = 0; d < data.length; d++) {var item = data[d];var track = item['meta']['title'];var length = formatTime(item['meta']['duration']);tracklist.append('<tr mediaid="' + item['id'] + '" class="mediaItem themeable">' +'<td class="track" title="' + track + '">' + track + '</td><td class="length">' + length + '</td></tr>');}return tracklist;};};$(function() {$('.themeable').addClass($('#theme').attr('current-theme'));$('#theme span').bind('click', function() {var currentTheme = $(this).parent().attr('current-theme');var selectedTheme = $(this).attr('id');$('.themeable').removeClass(currentTheme).addClass(selectedTheme);$('#theme').attr('current-theme', selectedTheme);$('#theme span').show();$('#theme span#' + selectedTheme).hide();});var jukebox = new bchanx.Jukebox();jukebox.init();var formIds = ['#playlist-create'];for (var f in formIds) {if ($(formIds[f]).length) {$(formIds[f]).bind('submit', function(e) {e.preventDefault();$.ajax({'url': this.action,'data': $(this).serialize(),'type': 'POST','dataType': 'json','success': function(data) {$('input[type="text"]').val('');console.log(data);}});});}}});