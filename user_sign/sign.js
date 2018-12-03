$(function () {
  
  // 分享标题
  var ShareTitle = '用户微信注册';
  // 分享描述
  var ShareDesc = '上海风赢网络科技有限公司用户微信账号注册页面';
  // 分享链接
  var ShareLink = window.location.href;
  // 分享图标
  var ShareimgUrl = 'http://www.fnying.com/staff/wx/img/share.jpg';
  
  // 微信配置启动
  wx_config();

  wx.ready(function() {

      wx.onMenuShareTimeline({
          title: ShareTitle,
          desc: ShareDesc,
          link: ShareLink,
          imgUrl: ShareimgUrl
      });

      wx.onMenuShareAppMessage({
          title: ShareTitle,
          desc: ShareDesc,
          link: ShareLink,
          imgUrl: ShareimgUrl
      });
  });
  
  // 注册按钮处理
  $('#sign_btn').click(function () {
    // 用户注册处理
    user_sign();
  });


});

// 用户注册处理
function user_sign() {
  var user_name = $('#user_name').val();
  var user_phone = $('#user_phone').val();
  // 检查输入合法性
  if (user_name.length <= 0) {
    AlertDialog('请输入你的姓名');
    return;
  }
  if (user_phone.length <= 0) {
    AlertDialog('请输入你的手机号码');
    return;
  }

  var $this = $(this);
  var api_url = 'sign.php';
  var post_data = {user_name: user_name, user_phone: user_phone};
  BtnOnClick($this, '正在提交...');
  // 用户注册处理
  CallApi(api_url, post_data, function (response) {
    BtnEnable($("#sign_btn"), 'javascript:;', '注册');
    AlertDialog(response.errmsg);
    window.location.href = "wait.php";
  }, function (response) {
    BtnEnable($("#sign_btn"), 'javascript:user_sign();', '注册');
    AlertDialog(response.errmsg);
  });
}

