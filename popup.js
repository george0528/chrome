// 拡張機能ポップアップの要素
const $btn = document.querySelector('#content_script_submit_btn');
const $message = document.querySelector('#content_script_message');
const $times = document.querySelector('#content_script_times');
const $delay = document.querySelector('#content_script_delay');
const $alert = document.querySelector('.component_alert');

// clickイベント
$btn.addEventListener('click', (e) => {
  e.preventDefault();
  var times = Number($times.value);
  data = {
    times: times,
    message: $message.value,
    delay: false
  };
  if($delay.checked) {
    data.delay = true;
  }
  $alert.classList.add('close');
  // 範囲外の時
  if(!(0 < times && times < 100)) {
    var warn_message = '数字は1~99以内にしてください。';
    $alert.textContent = warn_message;
    $alert.classList.remove('close');
    return;
  }
  // 空文字か文字数制限外の時
  if(data.message == null || data.message == '' || data.message.length > 200) {
    var warn_message = '文字を入力してください';
    $alert.textContent = warn_message;
    $alert.classList.remove('close');
    return;
  }
  // dataを飛ばす処理
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, data, function(response) {
      console.log(response);//メッセージの受け手がレスを返したときキャッチできる
    });
  });
});