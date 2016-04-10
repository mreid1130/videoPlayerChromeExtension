function getQueryVariable(url, variable) {
  var vars = url.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query variable %s not found', variable);
}


var embedVideo = function(url) {
  var source;
  if (url.indexOf('twitch.tv/') > -1) {
    var channel = url.split('twitch.tv/')[1];
    if (channel) {
      source = "https://player.twitch.tv/?channel=" + channel;
    }
  } else if (url.indexOf('youtube.com/watch') > -1) {
    var queryParams = url.split('?')[1];
    if (queryParams) {
      var videoId = getQueryVariable(queryParams, 'v');
      if (videoId) {
        source = "https://www.youtube.com/embed/" + videoId;
      }
    }
  }
  if (source) {
    var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
    if (!location.ancestorOrigins.contains(extensionOrigin)) {

      localStorage.setItem('lastStreamChrome', url);

      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          source: source
        }, function(response) {
          console.log(response);
        });
      });
    }

  };
};

window.onload = function() {
  var pastSearch = localStorage.getItem('lastStreamChrome');
  if (pastSearch) {
    document.getElementById('video-url').value = pastSearch;
  }


  document.getElementById('video-form').addEventListener("submit", function(e) {
    e.preventDefault();
    var existingVideo = document.getElementById('video-player');
    if (existingVideo) {
      document.body.removeChild(existingVideo);
    }
    var videoUrl = document.getElementById('video-url').value;
    if (videoUrl) {
      embedVideo(videoUrl);
    }
  }, false);

};