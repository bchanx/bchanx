export var Debounce = {
  debounce: function(fn, delay) {
    var timer = null;
    var inProgress = false;

    var debounced = function() {
      var args = arguments;
      if (inProgress) {
        this.clearTimeout(timer);
      }
      inProgress = true;
      timer = this.setTimeout(() => {
        inProgress = false;
        fn(...args);
      }, delay);
    };
    
    return debounced;
  }
};
