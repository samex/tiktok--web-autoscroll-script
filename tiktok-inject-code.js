
const tikTokBodyElementToObserve = document.querySelector("body");

var tt_lastClick = 0;
var tt_delay = 100;

let tt_selectors = {
  "videoObject" : "div[class*='DivVideoWrapper'] video",
  "ButtonLoadMore" : "button[class*='ButtonMore']",
  "ButtonNextVideo" : "button[data-e2e='arrow-right']"
}

var tt_disable_text_content = true;

if (tt_disable_text_content) {
  document.head.insertAdjacentHTML("beforeend", "<style>div[class*=DivBrowserModeContainer] > div[class*=DivContentContainer]{display:none;}</style>");
}

function loadMoreVideos() {
  // TRY LOAD MORE VIDEOS IN BACKGROUND
  try {
    document.querySelector(tt_selectors['ButtonLoadMore']).click();
  } catch (error) {}
}

function tikTokClickHandler(e) {
    if (tt_lastClick >= (Date.now() - tt_delay)) { //PREVENT MULTIPLE CLICKS
      return;
    }
    tt_lastClick = Date.now();
    loadMoreVideos();
    document.querySelector(tt_selectors['ButtonNextVideo']).click(); //CLICK FOR NEXT VIDEO
}

const tikTokVideoObserver = new MutationObserver(function() {
    if ( document.querySelector(tt_selectors['videoObject']) ) {
            document.querySelector('video').addEventListener('ended',tikTokClickHandler,false);
    }
});

tikTokVideoObserver.observe(tikTokBodyElementToObserve, {subtree: true, childList: true});
