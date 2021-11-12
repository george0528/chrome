// chromeイベントリッスン
chrome.runtime.onMessage.addListener(
  async (request, sender, sendResponse) => {
    // バリデーション
    if(0 < request.times && request.times < 100 && request.message != '') {
      // 処理
      await btn_function(request);
    }
    sendResponse();
    return;
  }
);



// 処理関数
const btn_click = (input, btn, message) => {
  input.textContent = message;
  // event強制発生
  let event = new Event('input', {bubbles: true});
  input.dispatchEvent(event);
  btn.click();
}


const btn_function = async (data) => {
  // youtubeの要素取得
  const $iframe = document.querySelector('iframe');
  const $iframeDocument = $iframe.contentDocument;
  const $youtube_input = $iframeDocument.querySelector('div#input.yt-live-chat-text-input-field-renderer');
  const $youtube_btn = $iframeDocument.querySelector("yt-icon-button#button.yt-button-renderer");
  if($youtube_input == null || $youtube_btn == null) {
    alert('チャットの入力欄がありません');
    return;
  }
  // 連投処理
  for (let index = 0; index < data.times; index++) {
    btn_click($youtube_input, $youtube_btn, index);
    if(data.delay) {
      await sleep(2000);
    }
  }
}

const sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay));