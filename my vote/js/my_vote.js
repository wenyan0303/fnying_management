//获取屏幕高度
var height=$(window).height();
//设置每个区域的高度
$('.body-pri').css({height:height*0.85});
$('.body-sub').css({height:height*0.85});
$('.single').css({height:height*0.4});
$('.multiple').css({height:height*0.4});
$('.footer').css({height:height*0.12});
//控制当前显示内容
$('.new_vote').children('p').css('color','green');
$('.new_vote>img').attr("src","img/new.png");
$('#new').click(function(){
  $('.new_vote').children('p').css('color','green');
  $('.new_vote>img').attr("src","img/new.png");
  $('.my_vote').children('p').css('color','#afafaf');
  $('.my_vote>img').attr("src","img/my-default.png");
  $('.body-pri').css('display','block');
  $('.body-sub').css('display','none');
})
$('#my').click(function(){
  $('.my_vote').children('p').css('color','green');
  $('.my_vote>img').attr("src","img/my.png");
  $('.new_vote').children('p').css('color','#afafaf');
  $('.new_vote>img').attr("src","img/new-default.png");
  $('.body-pri').css('display','none');
  $('.body-sub').css('display','block');
})