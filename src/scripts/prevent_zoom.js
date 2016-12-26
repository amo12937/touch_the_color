"use strict";

export default (d) => {
  d.addEventListener("touchstart", (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, true);

  (() => {
    let lastTouch = 0;
    d.addEventListener("touchend", (e) => {
      const now = Date.now();
      if (now - lastTouch < 500) {
        e.preventDefault();
      }
      lastTouch = now;
    }, true);
  })();
}

