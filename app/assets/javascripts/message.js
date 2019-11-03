$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    var content = message.content ? `${message.content}` : "";
    var img = message.image ? `<img src= ${message.image }>` : "";
    var html = `<div class="message" data-message-id="${message.id}">
    <div class="top-message">
      <div class="top-message__user-name">
        ${message.user_name}
      </div>
      <div class="top-message__date">
        ${message.date}
      </div>
    </div>
    <div class="bottom-message">
      <div class="bottom-message__content">
        ${content}
      </div>
      <div class='lower-message__image'>
        ${img}
      </div>
    </div>`
    return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, 1200);
    })
    .fail(function(data){
      alert('エラー');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  });

  var reloadMessages = function(){
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message:last').data("message-id");
    var href = 'api/messages'
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: href,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'GET',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert("自動更新に失敗しました");
    });
  }
}
setInterval(reloadMessages, 5000);
});