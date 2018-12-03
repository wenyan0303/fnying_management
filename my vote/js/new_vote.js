//获取屏幕高度
var height=$(window).height();
$('.page-pri').css({height:height});

$(function(){
    /*if (window.history && window.history.pushState){
        /*window.location.href='new_vote.html';
    }*/

    //new_vote.html
    //增加选项框
    $('#add-item').click(function(){
        var new_item=$('<div class="vote-item">\
                            <input type="text" class="weui-input options" name="" placeholder="选项" style="width: 80%;">\
                            <span><img src="img/del-item.png" class="del-item"></span>\
                        </div>');
        $('.total-item').append(new_item);
    })

    //删除选项框
    $('.total-item').on('click','.del-item',function(){
        console.log('delect');
        $(this).parent().parent().remove();
    })
  
    //选择日期（默认为2小时后）
    var date_detail=deadline(2);
    $('#deadline').val(date_detail);
    $('#lately').change(function(){
        var select_val = $(this).children('option:selected').val();
        //console.log(select_val);
        if(select_val==1){
            date_detail=deadline(2);
        }
        if(select_val==2){
            date_detail=deadline(6);
        }
        if(select_val==3){
            date_detail=deadline(24);
        }
        if(select_val==4){
            date_detail=deadline(48);
        }    
        $('#deadline').val(date_detail);
    })
    
    //是否匿名投票
    $('#anonymous').bind('click',function(){
        if($('#btn1').val()=='off'){
            $('#btn1').val('on');
            console.log('anonymous='+$('#btn1').val());
        }else{
            $('#btn1').val('off');
            console.log('anonymous='+$('#btn1').val());
        }
    })

    //是否多选投票
    $('#multi-select').bind('click',function(){
        if($('#btn2').val()=='off'){
            $('#btn2').val('on');
            console.log('multi='+$('#btn2').val());
        }else{
            $('#btn2').val('off');
            console.log('multi='+$('#btn2').val());
        }
    })

    //发起投票按钮
    $('#create-vote').click(function(){
        var title=$('#vote_title').val(),
            desc=$('#vote_desc').val(),
            options = $('.options'),
            opt_str=[],
            time=$('#deadline').val(),
            anonymous=$('#btn1').val();
            multi=$('#btn2').val();
        for(var i=0;i<options.length;i++){
            opt_str.push(options[i].value);
        }
        var required=$('.required');
            required_0=required.eq(0).val();
            required_1=required.eq(1).val();

        if ($('#vote_title').val().length>0&&required_0.length>0&&required_1.length) {
            if($('#btn2').val()=='off'){
                window.location.href='singleSelect.html?title='+title+'&desc='+desc+'&option='+opt_str+'&time='+time+'&anonymous='+anonymous+'&multi='+multi;
                }else{
                window.location.href='multiSelect.html?title='+title+'&desc='+desc+'&option='+opt_str+'&time='+time+'&anonymous='+anonymous+'&multi='+multi;
                }
            }else{
                if($('#vote_title').val().length<=0){
                    alert('标题不能为空');
                }else{
                    alert('至少填写两个选项');
                }            
            }
    })

    //singleSelect.html
    //单选界面投票确认
    $('#single_choice').change(function(){
        $(this).children('input:selected');
        $('#single_determine').removeAttr('hidden');
        $('#reelect').click(function(){
            //重选操作...
            $('#single_determine').attr('hidden','hidden');
        })
        $('#determine').click(function(){
            //确定操作...
            $('#single_determine').attr('hidden','hidden');
            $('.vote_result').removeAttr('hidden');
            $('#single_choice').find('input').attr('disabled','disabled');
        })
    })

    //multiSelect.html
    //多选界面投票确认
    $('#showTooltips').click(function(){
        $('#multi_determine').removeAttr('hidden');
        $('#reelect').click(function(){
            //重选操作...
            $('#multi_determine').attr('hidden','hidden');
        })
        $('#determine').click(function(){
            //确定操作...
            $('#multi_determine').attr('hidden','hidden');
            $('.vote_result').removeAttr('hidden');
            $('#multi_select').find('input').attr('disabled','disabled');
            $('.btn_pad').attr('hidden','hidden');
        })
    })
})

//投票结果按钮
$('#vote_result').click(function(){
    var title=$('#vote_title').val(),
        desc=$('#vote_desc').val(),
        options = $('.options'),
        opt_str=[],
        time=$('#deadline').val(),
        anonymous=$('#btn1').val();
        multi=$('#btn2').val();
    for(var i=0;i<options.length;i++){
        opt_str.push(options[i].value);
    }

    window.location.href='vote_result.html?title='+title+'&desc='+desc+'&option='+opt_str+'&time='+time+'&anonymous='+anonymous+'&multi='+multi;
})

//截止日期选择
function deadline(late){
    var mydate=new Date(),
        year=mydate.getFullYear(),
        month=mydate.getMonth()+1,
        day=mydate.getDate(),
        hours=mydate.getHours()+late,
        minutes=mydate.getMinutes(),
        date_detail='';
    if(48>=hours&&hours>=24){
        hours=hours-24;
        day=parseInt(day)+1;
    }
    if(hours>=48){
        hours=hours-48;
        day=parseInt(day)+2;
    }
    if(day>31){
        //判断有问题   要修改
        day=day-31;
        month=parseInt(month)+1;
    }
    if(month>12){
        month=month-12;
        year=parseInt(year)+1;
    }
    //检查日期格式
    month=checkTime(month);
    day=checkTime(day);
    hours=checkTime(hours);
    minutes=checkTime(minutes);
    date_detail=year+'-'+month+'-'+day+'T'+hours+':'+minutes;
    return date_detail;
}

//剩余时间倒计时
function LeftTime(year,month,day,hour,minute,second){
    var timer=setInterval(function leftTimer(){
    leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date());//计算剩余的毫秒数
    if (leftTime>=0){
        //如果剩余时间大于等于0时，显示截止时间倒计时
        var days = parseInt(leftTime/1000/60/60/24,10),//计算剩余的天数
            hours = parseInt(leftTime/1000/60/60%24,10),//计算剩余的小时
            minutes = parseInt(leftTime/1000/60%60,10),//计算剩余的分钟
            seconds = parseInt(leftTime/1000%60,10);//计算剩余的秒数
        //检查时间是否合规
        days = checkTime(days);
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        //显示截止日期
        $('#limit-time').html('距结束:<span>'+days+'</span>天<span>'+hours+'</span>时<span>'+minutes+'</span>分<span>'+seconds+'</span>');
        }else{
        //如果剩余时间小于0时，显示投票已结束，只能查看投票结果
        $('#limit-time').html('投票已结束');
        $('#iosDialog2').removeAttr('hidden');
        clearTimeout(timer);
        }
    },1000)
}

//检查时间格式
function checkTime(i){ //在0-9的数字前面加上0，例1变为01 
    if(i<10){
        i = "0" + i;
    }
    return i;
}
