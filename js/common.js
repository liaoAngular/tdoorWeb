/**
 * Created by 廖某某 on 2019/1/9 0009.
 */

//提示
var noticebox=function(msg,status,tourl){
    tourl=tourl || '';
    var _this=$(".noticebox");
    if($(document).scrollTop()>5562){
        _this.css("top","0px");
    }else{
        if(_this.hasClass("authnoticebox")){
            _this.css("top","82px");
        }else{
            _this.css('top', '62px');
        }
    }
    if (status == 0) {
        var html = '<div class="notice"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-shibai"></use></svg> ' + msg + '</div>';
    } else {
        var html = '<div class="notice"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-chenggong"></use></svg> ' + msg + '</div>';
    }
    _this.html(html);
    _this.slideDown(200);
    if (tourl == '') {
        setTimeout(function() {
            $('.noticebox').slideUp(200);
        }, 1500);
    } else {
        setTimeout(function() {
            noticebox_cb(tourl);
        }, 1500);
    }
}
// 提示盒子
var noticebox_cb = function(tourl) {
    window.location.href = tourl;
}
// 检测邮箱是否合法
var checkEmail = function(string) {
    if (string.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1){
        return true;
    }
    return false;
}
//
var strLen = function (str){
    return str.replace(/[\u0391-\uFFE5]/g,"aa").length / 2;
};
//返回顶部
function goTop() {
    $(window).scrollTop(0);
};
//提示
var options = function(obj) {
    if ($(obj).next('.options_div').css('display') == 'none') {
        $('.options_div').hide();
        $(obj).next('.options_div').show();
    } else {
        $(obj).next('.options_div').hide();
    }
}
// 显示下拉内容
$('body').click(function(e) {
    var target = $(e.target);
    // 隐藏
    if(!target.is('#menu_toggle') && target.parents('.nav_menu').length == 0) {
        $('.nav_menu').hide();
    }
    // 隐藏
    if(!target.is('.options') && target.parents('.options_div').length == 0) {
        $('.options_div').hide();
    }
    //隐藏
    if(!target.is('.top-btn') && target.parents('.dialog-topic-select').length == 0) {
        $('.dialog-topic-select').hide();
    }
});
// 鼠标触发显示
$(document).on("mouseover mouseout",".comment_con, .reply_body",function(event){
    if(event.type == "mouseover"){
        $(this).find("a.mouse").show();
    }else if(event.type == "mouseout"){
        $(this).find("a.mouse").hide();
    }
});
/**
 * 显示小提示
 * @param obj
 */
function showTopics(obj){
    var i=$(".selected-topic .selected-topic-item").length;
    if(i<1){
        if ($(obj).next('.dialog-topic-select').css('display') == 'none') {
            $('.dialog-topic-select').hide();
            $(obj).next('.dialog-topic-select').show();
        } else {
            $(obj).next('.dialog-topic-select').hide();
        }
    }else{
        noticebox('不能选择多个，请先删除', 0);
    }
}

function deleteTopics(obj){
    $(obj).parents(".ev-selected-topic-item").remove();
}

// ǩ签到
var checkIn = function(is_check) {
    if (is_check==-1) {
        userSignIn("signIn");
    }
}
/**
 * 签到后的颜色
 */
function signStyle(){
    $('#checkIn').addClass('checked_div');
    var html = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-qiandao"></use></svg><span>今天已签到</span>';
    $('#checkIn').html(html);
    $('#checkIn').removeAttr('onclick');
}
//发布帖子
var getInsertData=function(){
    var introduce=$("#urlAddress").val();
    var urlAddress=$("#feed_content").val();
    var topics=$(".selected-topic-item").data("topic-id");
    if(introduce=="" || urlAddress=="" || topics==undefined){
        noticebox("请填写完整信息",0);
    }else{
        loading("");
        postDynamic(introduce,urlAddress,topics);
    }
}
/*评论动态*/
var replyPost=function(){
    var content=$("#J-editor-feeds8417").val();

}

/*给模板商品打分*/
$(document).ready(function(){
    var stepW = 30;
    var description = new Array("1分","2分","3分","4分","5分");
    var stars = $(".stars > li");
    var descriptionTemp;
    var option = $(".option");
    $(".showb").css("width",0);
    stars.each(function(i){
        $(stars[i]).click(function(e){
            var n = i+1;
            $(".showb").css({"width":stepW*n});
            descriptionTemp = description[i];
            $(this).find('a').blur();
            return stopDefault(e);
            return descriptionTemp;
        });
    });
    stars.each(function(i){
        $(stars[i]).hover(
            function(){
                $(".description").text(description[i]);
                option.find(".option-con:eq(" + $(this).index() + ")").show().siblings().hide();
                $(".prompt").hide();
            },
            function(){
                if(descriptionTemp != null){
                    $(".description").text(descriptionTemp);
                }else{
                    $(".description").text(" ");
                    option.find(".option-con").hide();
                    $(".prompt").show();
                }
            }
        );
    });
});
function stopDefault(e){
    if(e && e.preventDefault)
        e.preventDefault();
    else
        window.event.returnValue = false;
    return false;
};
//注销登录
var Logout=function(){
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userId");
    /*noticebox("退出登录成功",1,"content/login.html");*/
    history.go(0);
}
//修改密码
$("#J-user-security").click(function(){
    var usedPassword=$("#old_password").val();
    var newPassword=$("#password").val();
    var password=$("#password_confirmation").val();
    if(newPassword!=password){
        noticebox("两个密码不一致",1);
    }else{
        changePassword(usedPassword,newPassword);
        noticebox("修改密码成功",0);
        //注销用户信息
    }
})
/**
 * 更改收藏后的style
 */
function collectTStyle(code){
    if(code==0){
        $("#collectT").addClass("");
        $("#collectT").text("已收藏");
    }
}
/**
 * 查看用户详情
 * @param user_id
 */
function userDetail(user_id){
    /*先跳转查看用户是否在线*/
    window.location.href="content/personalCenter.html?data="+user_id;
}
/**
 * 查看动态详情
 * @param post_id
 */
function postDetail(obj,value){
    var post_id=$(obj).attr("data-id");
    if(value==1){
        window.location.href="../content/dynamicDetails.html?post_id="+post_id;
    }else{
        window.location.href="content/dynamicDetails.html?post_id="+post_id;
    }
    //用户倾向性操作
    clickPost(1,"post/clickPost",post_id);
}
/**
 * 收藏或取消收藏操作
 */
function liked(){

}
/**
 * 获取文件路径
 * @param sourceId
 * @returns {*}
 */
function getFileUrl(sourceId) {
    var url;
    url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    return url;
}
/**
 * 更改头像
 */
function sc(){
    var animateimg = $("#task_id").val(); //获取上传的图片名 带//
    var imgarr=animateimg.split('\\'); //分割
    var myimg=imgarr[imgarr.length-1]; //去掉 // 获取图片名
    var suffix = myimg.lastIndexOf('.'); //获取 . 出现的位置
    var ext = myimg.substring(suffix, myimg.length).toUpperCase();  //切割 . 获取文件后缀

    var file = $('#task_id').get(0).files[0]; //获取上传的文件
    var reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=function(e){
        $("#J-image-preview").attr("src",e.target.result);
    }

    var fileSize = file.size;           //获取上传的文件大小
    var maxSize = 10485760;              //最大10MB
    if(ext !='.PNG' && ext !='.GIF' && ext !='.JPG' && ext !='.JPEG' && ext !='.BMP'){
        console.log('文件类型错误,请上传图片类型');
        return false;
    }else if(parseInt(fileSize) >= parseInt(maxSize)){
        console.log('上传的文件不能超过1MB');
        return false;
    }else{
        var formData=new FormData();

        formData.append("file",file);
        console.log(formData);
       changeUserHead(formData);
        return false;
    }
}
/**
 * 更改用戶信息
 * @param obj
 */
function setting(obj){
    var nickName=$("#nickName").val();
    var address=$("#address").val();
    var profiles=$("#profiles").val();
    var sex=$("input[name='sex']:checked").val();
    /*console.log("nickName:"+nickName+",address:"+address+",profiles:"+profiles+",sex:"+sex);*/
    var dataInfo={"nickName":nickName,"address":address,"profiles":profiles,"sex":sex};
    submitByUser("updateUser",dataInfo);
}
/**
 * 格式化Date日期時間
 * @param time
 * @returns {string}
 */
function timeStamp2String(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}
/**
 * 獲取地址欄ID
 * @param name
 * @returns {*}
 */
function getUrlParam(name){
    //a标签跳转获取参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}
/**
 * 商品評價
 */
function evaluate(template_id){
    var content=$("#evaluateContent").val();
    var text=$(".description").text();
    var score=parseInt(text);
    //默认评分
    if(text==""){
        score=3;
    }
    if(content==""){
        noticebox("评论内容不能为空",0);
    }else{
        evaluateTemplate(template_id,content,score);
    }
    console.log(score+content);
}
/*弹窗提示*/
var simpleAlert = function (opts) {
    //设置默认参数
    var opt = {
        "closeAll": false,
        "content": "",
        "buttons": {}
    }
    //合并参数
    var option = $.extend(opt, opts);
    //事件
    var dialog = {}
    var $simpleAlert = $('<div class="simpleAlert">');
    var $shelter = $('<div class="simpleAlertShelter">');
    var $simpleAlertBody = $('<div class="simpleAlertBody">');
    var $simpleAlertBodyClose = $('<img class="simpleAlertBodyClose" src="../img/close_icon.png" height="14" width="14"/>');
    var $simpleAlertBodyContent = $('<p class="simpleAlertBodyContent">' + option.content + '</p>');
    dialog.init = function () {
        $simpleAlertBody.append($simpleAlertBodyClose).append($simpleAlertBodyContent);
        var num = 0;
        var only = false;
        var onlyArr = [];
        for (var i = 0; i < 2; i++) {
            for (var key in option.buttons) {
                switch (i) {
                    case 0:
                        onlyArr.push(key);
                        break;
                    case 1:
                        if (onlyArr.length <= 1) {
                            only = true;
                        } else {
                            only = false;
                        }
                        num++;
                        var $btn = $('<button class="simpleAlertBtn simpleAlertBtn' + num + '">' + key + '</button>')
                        $btn.bind("click", option.buttons[key]);
                        if (only) {
                            $btn.addClass("onlyOne")
                        }
                        $simpleAlertBody.append($btn);
                        break;
                }

            }
        }
        $simpleAlert.append($shelter).append($simpleAlertBody);
        $("body").append($simpleAlert);
        $simpleAlertBody.show().animate({"marginTop":"-128px","opacity":"1"},300);
    }
    //右上角关闭按键事件
    $simpleAlertBodyClose.bind("click", function () {
        option.closeAll=false;
        dialog.close();
    })
    dialog.close = function () {
        if(option.closeAll){
            $(".simpleAlert").remove()
        }else {
            $simpleAlertBody.animate({"marginTop": "-188px", "opacity": "0"}, 200, function () {
                $(".simpleAlert").last().remove()
            });
        }
    }
    dialog.init();
    return dialog;
}
function collectTBtn(){
    var code=$("#collectT").attr("data-code");
    if(code=="1"){
        var manyAllChoseAlert = simpleAlert({
            "content":"你确定要取消收藏吗?",
            "buttons":{
                "确定":function () {
                    /*dblChoseAlert.close();*/
                    collectTemplate(template_id);
                },
                "取消":function () {
                    manyAllChoseAlert.close();
                }
            }
        })
    }else{
        collectTemplate(template_id);
    }

}
/*加载动态评论数据*/
function loadPostEvaluate(postId){
    //数据列表清空处理
    if($(".comment_list").children().length!=0){
        $(".comment_list").empty();
        var loadHtml = "<div class='loading'><img src='../img/three-dots.svg' class='load'></div>";
        //2s加载时间
        $(".comment_list").append(loadHtml);
        setTimeout(function(){
            $(".loading").hide();
        },2000);
    }
    getInfoById("post/sendPostEvaluate",postId);
}
/**
 * 加载动态详情数据
 * @param postId
 */
function loadPostDetail(postId){
    getInfoById("post/sendPostDetail",postId);
}
/**
 * 签到时间判断函数
 * @param signTime
 */
function signTimeJudge(signTime){
    var myDate=new Date();
    //获取当前年
    var year=myDate.getFullYear();
    //获取当前月
    var month=myDate.getMonth()+1;
    //获取当前日
    var date=myDate.getDate();
    //日期拼接
    var strDate=year+"-"+month+"-"+date;
    //开始时间
    var beginTime=strDate+" 00:00:00";
    //结束时间
    var endTime=strDate+" 23:59:59";
    var parseBeginTime=new Date(beginTime);
    var parseEndTime=new Date(endTime);
    var num=24*60*60*1000 ; //一天的毫秒数
    signTime=new Date(signTime);
    var different=myDate.getTime()-signTime.getTime(); //两个时间的毫秒差
    if(different>0){
        if(different>num){
            console.log("签到时间不是今天");
            return false;
        }else if(signTime.getDate()!=myDate.getDate()){
            console.log("签到时间不是今天");
            return false;
        }else{
            console.log("签到时间今天");
            return true;
        }
    }else{
        console.log("签到时间今天");
        return true;
    }
}
/**
 * 加载样式
 * @param tdoorUrl 相对路径
 */
function loading(tdoorUrl){
    var loadHtml = "<div class='loading'><img src='img/three-dots.svg' class='load'></div>";
    var _this=$(".noticebox");
    _this .append(loadHtml);
    _this.slideDown(200);
}
/**
 * 时间格式化函数
 */
function timeFormat(date){
    var d=new Date(date);
    var months=d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
    var days=d.getDate() + 1 < 10 ? "0" + d.getDate() : d.getDate() + 1;
    var dates=d.getFullYear() + '-' + months + '-' + d.getDate() + ' ' ;
    var hours= d.getHours()+1<10? "0"+ d.getHours(): d.getHours();
    var minutes=d.getMinutes()+1<10?"0"+ d.getMinutes(): d.getMinutes();
    var seconds= d.getSeconds()+1<10?"0"+ d.getSeconds(): d.getSeconds();
    var times=dates+hours+":"+minutes+":"+seconds;
   /* console.log(times);*/
    return times;
}
/**
 * 个人中心操作
 */
$("#dynamicCollect").click(function(){
    $(this).parents().addClass("active");
    $("#mine").parents().removeClass("active");
    $("#wishList").parents().removeClass("active");
    $(".profile_list").empty();
    myAllData("post/sendFavorites")

})
$("#mine").click(function(){
    $(this).parents().addClass("active");
    $("#dynamicCollect").parents().removeClass("active");
    $("#wishList").parents().removeClass("active");
    $(".profile_list").empty();
    getInfoById("post/checkMyPost","",localStorage.getItem("userId"));
})
$("#wishList").click(function(){
    $(this).parents().addClass("active");
    $("#dynamicCollect").parents().removeClass("active");
    $("#mine").parents().removeClass("active")
    $(".profile_list").empty();
    myAllData("shop/sendTFavorites");
})
/**
 * 进入商品详情
 * @param obj
 */
function linkTemplateDetail(obj){
    var templateId=$(obj).attr("data-id");
    window.location.href="templateDetails.html?template_id="+templateId;
}
//验证码倒计时
var downTimeHandler=null;
var timeDown=function(timeLeft){
    clearInterval(downTimeHandler);
    if(timeLeft<=0){
        return ;
    }
    $('#smscode').addClass('get_code_disable');
    $('#passsec').html(timeLeft);
    downTimeHandler = setInterval(function() {
        timeLeft--;
        $('#smscode').html(timeLeft);
        if (timeLeft <= -1) {
            clearInterval(downTimeHandler);
            $('#smscode').html('获取验证码').removeClass('get_code_disable');
        }
    }, 1000);
}
//发送验证码
function sendVCode(obj,state){
    var _this=$(obj);
    var email=$("input[name='email']").val();
    console.log("邮箱为："+email);
    if($(obj).hasClass("get_code_disable")){
        return false;
    }else if(email==''){
        $("input[name='email']").focus();
        noticebox('请输入邮箱号', 0);
        return false;
    }else if(!checkEmail(email)) {
        noticebox('请输入正确的邮箱号', 0);
        $("input[name='email']").focus();
        return false;
    }else{
        if(state==1){
            codeOperation("sendCode",email);
        }else{
            codeOperation("findpwdCode",email);
        }
    }
}
//注册提交
function registerSubmit(email,code,nick,password,state){
    var smscode = $('input[name="verifiable_code"]').val();
    var name=$('input[name="name"]').val();
    var password=$('input[name="password"]').val();
    var repassword=$('input[name="repassword"]').val();
    var email = $('input[name="email"]').val();
    if (email == '') {
        $('input[name="email"]').focus();
        return false;
    }else if (!checkEmail(email)) {
        noticebox('请输入正确的邮箱', 0);
        $('input[name="email"]').focus();
        return false;
    }else if (smscode == '') {
        $('input[name="verifiable_code"]').focus();
        return false;
    }else if (name == '') {
        name="一个小白猪";
    }else if (strLen(name) < 2) {
        noticebox('用户名不能低于2个中文或4个英文', 0);
        $('input[name="name"]').focus();
        return false;
    } else if (password.length < 6 || password.length > 15) {
        noticebox('密码长度必须在6-15个字符', 0);
        $('input[name="repassword"]').focus();
        return false;
    } else if (password != repassword) {
        noticebox('两次密码输入不一致', 0);
        $('input[name="repassword"]').focus();
        return false;
    }else{
        if(state==1){
            passwordOperation("register",email,code,nick,password);
        }else{
            passwordOperation("findPassword",email,code,nick,password);
        }
    }
}
/**
 * 显示热门动态
 */
function showHotPost(){
    $("#content_list").empty();
    allGetDataRewrite("post/sendIndexList",2);
    $("#hotPost").addClass("selected");
    $("#newPost").removeClass("selected");
}
/**
 * 显示最新动态
 * @param obj
 */
function showNewPost(){
    $("#content_list").empty();
    allGetDataRewrite("post/sendIndexList",1);
    $("#newPost").addClass("selected");
    $("#hotPost").removeClass("selected");
}
/**
 * 收藏动态
 * @param postId
 */
function collectPost(){
    var likeNum=$("#like_num").text();
    likeNum=Number(likeNum);
    var code=$("#J-likes8417").attr("data-id");
    if(code==1){
        $(".likePost").attr("style","color:#666;");
        $("#like_num").text(likeNum-1);
        noticebox("取消收藏成功",1);
        $("#J-likes8417").attr("data-id",0);
    }else{
        $(".likePost").attr("style","color:red;");
        $("#like_num").text(likeNum+1);
        noticebox("收藏成功",1);
        $("#J-likes8417").attr("data-id",1);
    }
}
/**
 * 删除动态
 * @param obj
 */
function deletePost(obj){
    var id=$(obj).attr("data-id");
    var code=$(obj).attr("data-code");
    if(code==1){
        clickPost("","post/deletePosting",id);
    }else{
        clickPost("","post/deleteCollect",id);
    }
}
/**
 * 删除愿望清单
 * @param obj
 */
function deleteWish(obj){
    var id=$(obj).attr("data-id");
    clickPost("","shop/deleteTCollect",id);
}
/**
 * 支持作者
 * @param postId
 */
function sponsorAuthor(dataCode){
    if(dataCode.code==0){
        noticebox("支持成功",1);
    }else{
        noticebox(dataCode.msg,0);
    }
}