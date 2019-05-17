"use strict";

window.addEventListener("DOMContentLoaded", function() {
  function getElementOffset(el) {
    let top = 0;
    let left = 0;
    let element = el;

    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return {
      top,
      left
    };
  }

  const backImage = document.querySelectorAll(".itemContentBack");

  backImage.forEach(function(element) {
    element.onmousemove = function(event) {
      let pos = getElementOffset(element);

      let self = this;

      let left = event.pageX - self.offsetWidth / 2 - pos.left;
      let top = event.pageY - self.offsetHeight / 2 - pos.top;

      self.style.transform =
        "perspective(1000px) rotateY(" +
        left * -0.08 +
        "deg) rotateX(" +
        top * 0.08 +
        "deg) scale3d(0.9, 0.9, 0.9)";

      let glare = self.querySelector(".glare-inner");

      glare.style.transform =
        "rotate(" + left * 0.5 + "deg) translate(-50%, -50%)";
      glare.style.opacity = ".2";
    };

    element.onmouseover = function() {
      let self = this;

      self.style.transition =
        "transform 700ms cubic-bezier(0.3, 0.98, 0.52, 0.99)";

      setTimeout(
        function() {
          self.style.transition = "transform 0s";
        }.bind(self),
        700
      );
    };

    element.onmouseleave = function() {
      let self = this;

      self.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
      self.style.transition =
        "transform 700ms cubic-bezier(0.3, 0.98, 0.52, 0.99)";

      let glare = self.querySelector(".glare-inner");

      glare.style.transform = "rotate(180deg) translate(-50%, -50%)";
      glare.style.opacity = "0";
    };
  });
});
