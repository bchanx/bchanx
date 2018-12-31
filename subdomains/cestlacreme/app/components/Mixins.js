export var ScrollToMixin = {
  componentDidMount: function() {
    this._fn.requestAnimationFrame = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback, element, delay) {
        this.setTimeout(callback, delay || (1000/60), new Date().getTime());
      };
    })();
  },

  _easing: function(x) {
    return (x < 0.5) ? Math.pow(x*2, 2)/2 : 1 - Math.pow((1-x) * 2, 2)/2;
  },

  _fn: {
    requestAnimationFrame: null
  },

  _scroll: {},

  _animateScroll: function(id, timestamp) {
    let s = this._scroll[id];
    if (s.cancel) {
      return;
    }
    if (s.start === null) {
      s.start = timestamp;
    }
    s.progress = timestamp - s.start;
    s.percent = (s.progress >= s.duration) ? 1 : this._easing(s.progress / s.duration);
    s.currentY = s.startY + Math.ceil(s.delta * s.percent);
    s.element.scrollTop = s.currentY;

    if (s.percent < 1) {
      this._fn.requestAnimationFrame.call(window, this._animateScroll.bind(this, id));
    }
  },

  scrollTo: function(id, element, y, duration) {
    if (id) {
      if (!this._scroll[id]) {
        this._scroll[id] = {};
      }
      let s = this._scroll[id];
      s.start = null;
      s.cancel = false;
      s.element = element;
      s.startY = element.scrollTop;
      s.targetY = y;
      s.delta = Math.round(s.targetY - s.startY);
      s.duration = duration;
      s.progress = 0;
      if (this._fn.requestAnimationFrame) {
        this._fn.requestAnimationFrame.call(window, this._animateScroll.bind(this, id));
      }
    }
  },

  scrollCancel: function(id) {
    if (id && this._scroll[id]) {
      this._scroll[id].cancel = true;
    }
  }
};
