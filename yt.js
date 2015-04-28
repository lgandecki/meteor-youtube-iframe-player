

var iframeApiReady = new ReactiveVar(false);

window.onYouTubeIframeAPIReady = function () {
  console.log("api ready 2");
  iframeApiReady.set(true);
};

Meteor.startup(function () {
  $.getScript('http://www.youtube.com/iframe_api');
});

YTPlayer = function (name, playerVars) {
  if (arguments.length === 1) {
    playerVars = name;
    name = 'ytplayer';

  }

  var self = this;
  playerVars.autoplay = 0;
  var playerReady = new ReactiveVar(false);

    Meteor.autorun(function () {
      console.log("running autorun");
      if (iframeApiReady.get()) {
        console.log("inside if");
        self.player = new YT.Player(name, {
          events: {
            'onReady': function () {
              playerReady.set(true);
            }
          },
          playerVars: playerVars || {}
        });
      }
    });

  self.ready = function () {
    console.log("running ready", playerReady.get());
    return playerReady.get();
  };
};
