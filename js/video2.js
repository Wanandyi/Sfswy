window.onload = function() {
	var btnPre = document.getElementById('btpre');
	var btnNext = document.getElementById('next');
	var list = document.getElementById('list');
	var aud = document.getElementById('aud');
	var li = list.getElementsByTagName('li');
	var mymusic = [ './music/shi.mp3','./music/rensheng.mp3', './music/yuanwo.mp3', './music/meige.mp3','./music/niandi.mp3','./music/shenghuo.mp3','./music/zhongyu.mp3','./music/ganen.mp3']; 
	for (var i = 0; i < li.length; i++) {
		li[i].onclick = function() {
			for (var i = 0; i < li.length; i++) {
				if (this == li[i]) {
					li[i].className = 'play';
					aud.src = mymusic[i];
					aud.play();
				} else {
					li[i].className = '';

				}
			}
		}
	}
	function getPlay() {
		for (var r = 0; r < li.length; r++) {
			if (li[r].getAttribute('class') == 'play') {
				return r;

			}
		}
	}
	aud.onended = function() {
		var a = getPlay();
		a++;
		if (a > li.length - 1) {
			a = 0;
		}
		for (var j = 0; j < li.length; j++) {
			li[j].className = '';
		}
		aud.src = mymusic[a];
		aud.play();
		li[a].className = 'play';
	}
	btnNext.onclick = function() {
		var musicIndex = getPlay();
		if (musicIndex == li.length - 1) { 
			musicIndex = -1;
		}
		aud.src = mymusic[musicIndex + 1]; 
		aud.play();
		for (var j = 0; j < li.length; ++j) {
			li[j].className = '';
		}
		li[musicIndex + 1].className = 'play';
	}
	btnPre.onclick = function() {
		var musicIndex = getPlay();
		if (musicIndex == 0) { 
			musicIndex = li.length;
		}
		aud.src = mymusic[musicIndex - 1];
		aud.play();
		for (var j = 0; j < li.length; ++j) {
			li[j].className = '';
		}
		li[musicIndex - 1].className = 'play';
	}
	var __freq = 30; 
	var __fraction = 2 / 5; 

	var __go = function(_lineno) {
		var _time;
		if (_lineno === 0) {
			_time = __lis[_lineno].offset;
		} else {
			_time = __lis[_lineno].offset - __lis[_lineno - 1].offset;
		}
		var _timer = setTimeout(__go.bind(this, _lineno + 1), _time);

		if (_lineno > 0) {
			__eul.children[_lineno - 1].setAttribute("class", "");
		}
		var _ep = __eul.children[_lineno];
		_ep.setAttribute("class", "z-crt");

		var _scrollTop;
		if (_ep.offsetTop < __eul.clientHeight * __fraction) {
			_scrollTop = 0;
		} else if (_ep.offsetTop > (__eul.scrollHeight - __eul.clientHeight * (1 - __fraction))) {
			_scrollTop = __eul.scrollHeight - __eul.clientHeight;
		} else {
			_scrollTop = _ep.offsetTop - __eul.clientHeight * __fraction;
		}

		if (__eul.scrollTop > (_scrollTop + __eul.clientHeight * __fraction) ||
			(__eul.scrollTop + __eul.clientHeight * __fraction) < _scrollTop) {
			__eul.scrollTop = _scrollTop;
		} else {
			
			var _step = Math.ceil(Math.abs(__eul.scrollTop - _scrollTop) / (_time / __freq));
			__scroll(__eul.scrollTop, _scrollTop, _step);
		}

	};
	
	__scroll = function(_crt, _dst, _step) {
		if (Math.abs(_crt - _dst) < _step) {
			return;
		}
		if (_crt < _dst) {
			__eul.scrollTop += _step;
			_crt += _step;
		} else {
			__eul.scrollTop -= _step;
			_crt -= _step;
		}
		setTimeout(__scroll.bind(this, _crt, _dst, _step), __freq);
	};

	__go(0);
}
