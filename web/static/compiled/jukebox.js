var bchanx = bchanx || {};/*!* Copyright (c) 2013 Brian Chan (bchanx.com)* All Rights Reserved.*/var Playlist = function(player, videos, shuffled) {var self = this;self.TYPE = {'UNKNOWN': -1,'YOUTUBE': 0};self.player = '#' + player;self.videos = videos || [];self.idToVideo = {};for (var i = 0; i < self.videos.length; i++) {self.idToVideo[self.videos[i]['id']] = self.videos[i];}var getShuffleOrder = function() {var order = self.videos.slice(0);for (var i = order.length - 1; i > 0; i--) {var j = Math.floor(Math.random() * (i + 1));var tmp = order[i];order[i] = order[j];order[j] = tmp;}return order;};self.shuffledVideos = getShuffleOrder();self.isShuffled = !!shuffled;self.isRepeat = false;self.currentList = function() {return (self.isShuffled) ? self.shuffledVideos : self.videos;};self.current = self.currentList()[0];self.getResource = function(id, type) {if (id) {if (type == self.TYPE.YOUTUBE) {return 'https://www.youtube.com/embed/' + id + '?rel=0&enablejsapi=1&iv_load_policy=3&showinfo=0&theme=light';}}return '';};self.getUrl = function() {return (self.current) ? self.getResource(self.current['meta']['mediaId'], self.current['meta']['mediaType']) : '';};self.getId = function() {return (self.current) ? self.current['id'] : '';};self.getMediaId = function() {return (self.current) ? self.current['meta']['mediaId'] : '';};self.toggleShuffle = function() {self.isShuffled = !self.isShuffled;};self.toggleRepeat = function() {self.isRepeat = !self.isRepeat;};self.prev = function() {var cur = self.currentList();if (cur.indexOf(self.current) >= 0) {var index = (cur.indexOf(self.current) + cur.length - 1) % cur.length;self.current = cur[index];}return self.getMediaId();};self.next = function() {var cur = self.currentList();if (cur.indexOf(self.current) >= 0) {var index = (cur.indexOf(self.current) + 1) % cur.length;self.current = cur[index];}return self.getMediaId();};self.isEmpty = function() {return !self.current;};self.setCurrent = function(id) {if (id in self.idToVideo) {self.current = self.idToVideo[id];return true;}return false;};};/*!* Copyright (c) 2013 Brian Chan (bchanx.com)* All Rights Reserved.*/bchanx.player = {};function onYouTubeIframeAPIReady() {bchanx.player = new YT.Player('video-src', {events: {'onReady': onPlayerReady,'onStateChange': onPlayerStateChange}});}function onPlayerReady(e) {e.target.setVolume(100);e.target.playVideo();}function onPlayerStateChange(e) {if (e.data == YT.PlayerState.PLAYING) {$('#play').hide();$('#pause').css('display', 'inline-block');} else if (e.data == YT.PlayerState.PAUSED) {$('#pause').hide();$('#play').css('display', 'inline-block');} else if  (e.data == YT.PlayerState.ENDED) {$('#next').trigger('click', [true]);}}bchanx.Jukebox = function() {var self = this;self.slidr = null;self.playlist = null;self.playlistData = {};var formatTime = function(t) {return Math.floor(t / 60) + ':' + ("0" + t % 60).slice(-2);};var jq = function(id) {return '#' + id.replace(/(:|\.|\[|\])/g, '\\$1');};var staticBindings = function() {$('#pause').bind('click', function() {if (self.playlist && !self.playlist.isEmpty() && bchanx.player.hasOwnProperty('pauseVideo')) {bchanx.player.pauseVideo();}});$('#play').bind('click', function() {if (self.playlist && !self.playlist.isEmpty() && bchanx.player.hasOwnProperty('playVideo')) {bchanx.player.playVideo();}});$('#prev').bind('click', function() {if (self.playlist && !self.playlist.isEmpty() && bchanx.player.hasOwnProperty('loadVideoById')) {bchanx.player.loadVideoById(self.playlist.prev());self.updateNowPlaying();}});$('#next').bind('click', function(event, mediaHasEnded) {if (self.playlist && !self.playlist.isEmpty()) {if (mediaHasEnded && self.playlist.isRepeat) {bchanx.player.seekTo(0);} else if (bchanx.player.hasOwnProperty('loadVideoById')) {bchanx.player.loadVideoById(self.playlist.next());self.updateNowPlaying();}}});$('#repeat').bind('click', function() {if (self.playlist && !self.playlist.isEmpty()) {self.playlist.toggleRepeat();var r = self.playlist.isRepeat;$('#repeat').removeClass((r) ? 'off' : 'on').addClass((r) ? 'on' : 'off');}});$('#shuffle').bind('click', function() {if (self.playlist && !self.playlist.isEmpty()) {self.toggleShuffle();}});$('#playlist').bind('click', function() {if (self.playlist && !self.playlist.isEmpty()) {self.toggleTracklist();}});};var dynamicBindings = function() {$(document).on('click', '.mediaItem', function() {if (self.playlist && !self.playlist.isEmpty()) {if (self.playlist.setCurrent($(this).attr('mediaid'))) {bchanx.player.loadVideoById(self.playlist.getMediaId());self.updateNowPlaying();}}});$(document).on('click', 'li[pid]', function() {self.loadPlaylist($(this).attr('pid'));});$(document).keydown(function(e) {if (e.which === 78) { $('#next').click(); }else if (e.which === 80) { $('#prev').click(); }else if (e.which === 83) { $('#shuffle').click(); }});};self.init = function() {staticBindings();dynamicBindings();$.ajax({'url': '/jukebox/playlistGetAll','type': 'GET','dataType': 'json','success': self.onPlaylistGetAll});};self.onPlaylistGetAll = function(data) {if (data.length) {data = data.sort(function(a, b) {return a.pid - b.pid;});var playlists = $('<ul></ul>');for (var i = 0; i < data.length; i++) {playlists.append('<li pid="' + data[i].pid + '">' + data[i].title + '</li>');}$('#playlists').append(playlists);}self.slidr = slidr.create('jukebox', {'transition': 'cube','overflow': true,'controls': 'none','keyboard': true}).add('h', ['playlists', 'video', 'about', 'playlists']).add('v', ['playlists', 'video', 'about', 'playlists']).start();};self.loadPlaylist = function(pid) {self.slidr.slide('right');setTimeout(function() {if (self.playlistData[pid]) {return self.onLoadPlaylist(pid, self.playlistData[pid]);}$.ajax({'url': '/jukebox/playlistLoad','type': 'POST','data': {'pid': pid},'dataType': 'json','success': function(result) {self.playlistData[result.pid] = result.data;self.onLoadPlaylist(result.pid, result.data);}});}, 600);};self.onLoadPlaylist = function(pid, data) {self.playlist = new Playlist('video-src', data, true);if (self.playlist.isEmpty()) {self.toggleVideoDisplay(true);} else {self.toggleVideoDisplay();$('tbody').remove();var normalTracklist = self.createTracklist(self.playlist.videos, 'normal-tracklist');var shuffledTracklist = self.createTracklist(self.playlist.shuffledVideos, 'shuffled-tracklist');$('#video-table').append(normalTracklist, shuffledTracklist);$('tr.themeable').addClass($('#theme').attr('current-theme'));if (!$('#video-src').attr('src') || !bchanx.player.hasOwnProperty('playVideo')) {$('#video-src').attr('src', self.playlist.getUrl()).css('visibility', 'visible');} else {bchanx.player.loadVideoById(self.playlist.getMediaId());}self.toggleTracklist(true);self.toggleShuffle(true);$('#video-settings').fadeIn();}self.updateNowPlaying(pid);};self.toggleVideoDisplay = function(hide) {if (hide) {if (bchanx.player.hasOwnProperty('stopVideo')) {bchanx.player.stopVideo();}$('.playlist-playing').removeClass('playlist-playing');$('#video-src').hide();$('#video-settings').hide();$('#video-src-none').css('visibility', 'visible');} else {$('#video-src-none').css('visibility', 'hidden');$('#video-src').show();}};self.updateNowPlaying = function(pid) {if (self.playlist && !self.playlist.isEmpty()) {$('.playing').removeClass('playing');$('tr[mediaid="' + self.playlist.getId() + '"]').addClass('playing');var title = self.playlist.current['meta']['title'];var length = self.playlist.current['meta']['duration'];$('#video-title').attr('title', title).text(title);$('#video-length').text(formatTime(length));}if (pid) {$('.playlist-playing').removeClass('playlist-playing');$('li[pid="' + pid + '"]').addClass('playlist-playing');}};self.toggleShuffle = function(opt_reset) {if (self.playlist) {if (!opt_reset) {self.playlist.toggleShuffle();}var s = self.playlist.isShuffled;$('#shuffle').removeClass((s) ? 'off' : 'on').addClass((s) ? 'on' : 'off');var oldPlaylist = 'tbody.' + ((s) ? 'normal' : 'shuffled') + '-tracklist';var switchingPlaylist = 'tbody.' + ((s) ? 'shuffled' : 'normal') + '-tracklist';$(oldPlaylist).css('opacity', 0).hide();$(switchingPlaylist).show().animate({'opacity': 1}, 400);}};self.toggleTracklist = function(opt_reset) {if (opt_reset || $('#playlist').hasClass('hide')) {$('#playlist').removeClass('hide').addClass('show');$('#video-playlist').hide();$('#video-playing-info').fadeIn();} else {$('#playlist').removeClass('show').addClass('hide');$('#video-playing-info').hide();$('#video-playlist').fadeIn();}};self.createTracklist = function(data, className) {var tracklist = $('<tbody class="' + className + '" style="display: none"></tbody>');for (var d = 0; d < data.length; d++) {var item = data[d];var track = item['meta']['title'];var length = formatTime(item['meta']['duration']);tracklist.append('<tr mediaid="' + item['id'] + '" class="mediaItem themeable">' +'<td class="track" title="' + track + '">' + track + '</td><td class="length">' + length + '</td></tr>');}return tracklist;};};$(function() {$('.themeable').addClass($('#theme').attr('current-theme'));$('#theme span').bind('click', function() {var currentTheme = $(this).parent().attr('current-theme');var selectedTheme = $(this).attr('id');$('.themeable').removeClass(currentTheme).addClass(selectedTheme);$('#theme').attr('current-theme', selectedTheme);$('#theme span').show();$('#theme span#' + selectedTheme).hide();});var jukebox = new bchanx.Jukebox();jukebox.init();var formIds = ['#playlist-create'];for (var f in formIds) {if ($(formIds[f]).length) {$(formIds[f]).bind('submit', function(e) {e.preventDefault();$.ajax({'url': this.action,'data': $(this).serialize(),'type': 'POST','dataType': 'json','success': function(data) {$('input[type="text"]').val('');console.log(data);}});});}}});