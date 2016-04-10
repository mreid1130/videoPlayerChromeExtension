chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.source) {
    var existingVideo = document.getElementById('video-player');
    if (existingVideo) {
      document.body.removeChild(existingVideo);
    }
    var iframe = document.createElement('iframe');
    var div = document.createElement('div');
    div.id = "video-container"
    div.style.height = "360px";
    div.style.width = "640px";
    div.style.position = "fixed";
    div.style.top = "0px";
    div.style.left = "0px";
    div.style.zIndex = '1000000000000000000';
    div.style.border = "none";
    div.style.display = "hidden";
    div.style.WebkitTransition = 'background 0.5s linear';
    div.style.MozTransition = 'background 0.5s linear';
    div.style.transition = 'background 0.5s linear';
    div.onmouseover = function() {
      div.style.backgroundColor = "rgba(0, 0, 0, .1)"
    };
    div.onmouseleave = function() {
      div.style.backgroundColor = "rgba(0, 0, 0, 0)"
    };
    iframe.id = 'video-player';
    iframe.src = request.source;
    iframe.height = "95%";
    iframe.width = "95%";
    iframe.style.display = "block";
    iframe.style.marginLeft = "auto";
    iframe.style.marginRight = "auto";
    iframe.style.marginTop = "auto";
    iframe.style.marginBottom = "auto";
    iframe.style.position = "absolute";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.bottom = "0";
    iframe.style.right = "0";

    document.body.insertBefore(div, document.body.firstChild);
    div.appendChild(iframe);
    $("#video-container").resizable();
    sendResponse({
      'success': 'done'
    })
  }
});