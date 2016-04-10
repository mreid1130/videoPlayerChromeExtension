chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.source) {
    var existingVideo = document.getElementById('video-container');
    if (existingVideo) {
      document.body.removeChild(existingVideo);
    }
    var iframe = document.createElement('iframe');
    var div = document.createElement('div');
    var closeButton = document.createElement('button');

    // set class and attrs with JS
    closeButton.className = 'close-icon';
    closeButton.setAttribute('type', 'reset');

    // add id and mouse events on div
    div.id = "video-container"
    div.onmouseover = function() {
      div.style.backgroundColor = "rgba(0, 0, 0, .1)";
      closeButton.style.display = 'inline-block';
    };
    div.onmouseleave = function() {
      div.style.backgroundColor = "rgba(0, 0, 0, 0)";
      closeButton.style.display = 'hidden';
    };

    // iframe JS
    iframe.id = 'video-player';
    iframe.src = request.source;
    iframe.height = "90%";
    iframe.width = "90%";

    // insert elements into document, add draggable and resizable properties to container
    document.body.insertBefore(div, document.body.firstChild);
    div.appendChild(closeButton);
    div.appendChild(iframe);
    $("#video-container").resizable();
    $("#video-container").draggable();

    // event listeners
    closeButton.addEventListener("click", function(e) {
      document.body.removeChild(document.getElementById('video-container'));
    }, false);
    sendResponse({
      'success': 'done'
    });
  }
});
