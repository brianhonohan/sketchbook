window.onload = function() {
  var canv = document.createElement('canvas');
  canv.id = 'myCanvas';
  canv.setAttribute('resize','true');

  document.body.style.height = "100%";
  document.body.parentElement.style.height = "100%";
  canv.style.width  = "100%";
  canv.style.height = "100%";

  document.body.appendChild(canv);
  setupPaper(canv.id);
}
