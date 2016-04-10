chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.source) {
    var existingVideo = document.getElementById('video-player');
    if (existingVideo) {
      document.body.removeChild(existingVideo);
    }
    var iframe = document.createElement('iframe');
    iframe.id = 'video-player';
    // Must be declared at web_accessible_resources in manifest.json
    iframe.src = request.source;
    iframe.height = "360px";
    iframe.width = "640px";
    iframe.style.position = "fixed";
    iframe.style.top = "0px";
    iframe.style.left = "0px";
    iframe.style.zIndex = '1000000000000000000'
    console.log(iframe);
    document.body.insertBefore(iframe, document.body.firstChild);
    sendResponse({
      'success': 'done'
    })
  }
});