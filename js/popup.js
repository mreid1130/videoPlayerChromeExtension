function getQueryVariable(url, variable) {
  // given a query String, search for a query parameter
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
  // parse unique video ID from a given source url
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
  } else if (url.indexOf('vimeo.com/') > -1) {
    url = url.split('?')[0];
    var urlParams = url.split('vimeo.com/')[1];
    if (urlParams) {
      if (urlParams.split('/').length === 1) {
        source = "https://player.vimeo.com/video/" + urlParams;
      }
    }
  } else if (url.indexOf('dailymotion.com/video/') > -1) {
    url = url.split('?')[0];
    var urlParams = url.split('dailymotion.com/video/')[1];
    if (urlParams) {
      if (urlParams.split('/').length === 1) {
        urlParams = urlParams.split('_')[0];
        source = "https://www.dailymotion.com/embed/video/" + urlParams;
      }
    }
  }

  // only send embed message to active tab if there is a proper source
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

  // check for previous valid stream url
  var pastSearch = localStorage.getItem('lastStreamChrome');
  if (pastSearch) {
    document.getElementById('video-url').value = pastSearch;
  }

  // event listener to remove previous video and start embed process of given url
  document.getElementById('video-form').addEventListener("submit", function(e) {
    // prevent refresh on submit
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
