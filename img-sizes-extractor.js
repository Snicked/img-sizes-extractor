// ==UserScript==
// @name         Sizes Extractor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://localhost:9002/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const images = [];
  const availableSizes = [
    { width: 100 },
    { width: 200 },
    { width: 300 },
    { width: 400 },
    { width: 600 },
    { width: 800 },
    { width: 1200 },
    { width: 1400 },
    { width: 1600 },
    { width: 1800 },
    { width: 2000 },
    { width: 2400 },
  ];

  document.body.querySelectorAll("img").forEach((img) => {
    img.addEventListener("contextmenu", (event) => {
      event.currentTarget.style = "box-shadow:0 0 5px 5px red";
      images.push(event.currentTarget);
    });
  });

  window.addEventListener("resize", function (e) {
    var windowWidth = document.body.clientWidth;
    images.forEach((img) => {
      var sizes = img.dataset?.sizes?.split(",") || [];
      if (typeof sizes === "string") {
        sizes = [sizes];
      }
      var lastSize = img.dataset.lastsize || undefined;
      var pWidth = img.clientWidth;
      var size = availableSizes.find(function (size, i) {
        return size.width >= pWidth;
      });

      if (size && lastSize != size.width) {
        var mq = "(min-width: " + windowWidth + "px)";
        sizes.push(mq + " " + pWidth + "px");
        img.dataset.sizes = sizes;
        img.dataset.lastsize = size.width;
      }
      var out = [];
      img.sizes = out.concat(sizes).reverse().join(",");
    });
  });
})();
