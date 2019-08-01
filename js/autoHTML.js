/**
 * Created by 廖某某 on 2019/1/26 0026.
 * 功能:自动功能
 */
/**
 * 未登录状态时显示的内容
 */
function autoLogout(relativeUrl) {
    var linkUrl="content/";
    if(relativeUrl=="content"){
        linkUrl="";
    }
    var _style = "<div class='nav_right'>"
        + "<a href='"+linkUrl+"register.html' class='nava'>注册</a>"
        + "<a href='"+linkUrl+"login.html'>登录</a>"
        + "</div>";
    $(".nav_menu").before(_style);
}
/**
 * 导航栏头部
 * @relativeUrl 相对路径
 * @relativeUrl2 父相对路径
 * @activeParameter 活跃参数
 */
function autoNav(relativeUrl, relativeUrl2, activeParameter) {
    var indexUrl = relativeUrl + "index.html";
    var shopUrl = relativeUrl2 + "templatesShop.html";
    var aboutUsUrl = relativeUrl2 + "netOcean.html";
    var logoUrl = relativeUrl + "img/logo2.PNG";
    var personalUrl = relativeUrl2 + "personalCenter.html";
    var scoreUrl = relativeUrl2 + "setting.html";
    var personalUrl=relativeUrl2+"personalCenter.html";
    var targetName = "_self";
    var _style = "<div class='nav nav_border'>"
        + "<div class='nav_left'>"
        + "<a href='" + indexUrl + "'>"
        + "<img src='" + logoUrl + "' class='nav_logo'>"
        + "</a>"
        + "</div>"
        + "<div class='nav_right relative'>"
        + "<div class='nav_menu' style='display: none'>"
        + "<div class='hover_cover clear_fix'></div>"
        + "<div class='triangle'></div>"
        + "<ul>"
        + "<li>"
        + "<a href='" + personalUrl + "'>个人主页</a>"
        + "</li>"
        + "<li style='border-top: 1px solid #ededed; padding-top: 20px;'>"
        + "<a href='" + scoreUrl + "'>"
        + "<svg class='icon' aria-hidden='true'>"
        + "<use xlink:href='#icon-ziyuan'></use>"
        + "</svg>"
        + "我的积分"
        + "</a>"
        + "</li>"
        + "<li>"
        + "<a href='" + scoreUrl + "'>"
        + "<svg class='icon' aria-hidden='true'>"
        + "<use xlink:href='#icon-shezhi'></use>"
        + "</svg>"
        + "设置"
        + "</a>"
        + "</li>"
        + "<li>"
        + "<a href='" + personalUrl + "'>"
        + "<svg class='icon' aria-hidden='true'>"
        + "<use xlink:href='#icon-shoucang2'></use>"
        + "</svg>"
        + "我的收藏"
        + "</a>"
        + "</li>"
        + "<li>"
        + "<a href='" + personalUrl + "'>"
        + "<svg class='icon' aria-hidden='true'>"
        + "<use xlink:href='#icon-kuanchuangyidianzishangwutubiaoshiliangsucai--'></use>"
        + "</svg>"
        + "愿望清单"
        + "</a>"
        + "</li>"
        + "<li style='border-top: 1px solid #ededed; padding-top: 20px;'>"
        + "<a href='javascript:Logout();' id='action-logout'>"
        + "退出"
        + "</a>"
        + "</li>"
        + "</ul>"
        + "</div>"
        + "</div>"
        + "<div class='nav_list clear_fix'>"
        + "<ul class='navs'>"
        + "<li>"
        + "<a href='" + indexUrl + "' id='index'>"
        + "动态"
        + "</a>"
        + "<div class='child_navs'></div>"
        + "</li>"
        + "<li>"
        + "<a href='" + shopUrl + "' id='shop'>"
        + "商城"
        + "</a>"
        + "<div class='child_navs'></div>"
        + "</li>"
        + "<li>"
        + "<a href='" + aboutUsUrl + "' id='aboutUs'>"
        + "关于我们"
        + "</a>"
        + "<div class='child_navs'></div>"
        + "</li>"
        + "<li>"
        + "<a href='" + personalUrl + "' id='personalUrl'>"
        + "个人中心"
        + "</a>"
        + "<div class='child_navs'></div>"
        + "</li>"
        + "</ul>"
        + "</div>";
    $(".noticebox").before(_style);
    switch (activeParameter) {
        case 1:
            $("#index").attr("target", "_self");
            $("#aboutUs,#shop,#personalUrl").attr("target", "_blank");
            $("#index").addClass("selected");
            break;
        case 2:
            $("#shop").attr("target", "_self");
            $("#index,#aboutUs,#personalUrl").attr("target", "_blank");
            $("#shop").addClass("selected");
            break;
        case 3:
            $("#aboutUs").attr("target", "_self");
            $("#index,#shop,#personalUrl").attr("target", "_blank");
            $("#aboutUs").addClass("selected");
            break;
        case 4:
            $("#personalUrl").attr("target","_self");
            $("#index,#shop,#shop").attr("target", "_blank");
            $("#personalUrl").addClass("selected");
    }
}
/**
 * 已登录显示的内容部分
 * @param userInfo
 */
function autoFillLogin(userInfo) {
    var headUrl = userInfo.data.headUrl;
    var name = userInfo.data.nickname;
    var signTime=localStorage.getItem("signTime");
    var sign = "";
    if (signTimeJudge(signTime)) {
        sign = "今日已签到";
    } else {
        sign = "每日签到    ";
    }
    var _style = "<img src='" + headUrl + "' id='menu_toggle'/>"
        + "<span class='font16 nav_name'>"
        + name
        + "</span>";
    $(".nav_menu").before(_style);
    var _style2 = "<div class='checkin_cont'>"
        + "<div class='checkin_user'>"
        + "<span>" + name + "</span>"
        + "<a href='#' class='avatar'>"
        + "<img src='" + headUrl + "' class='round' style='height:100px;width:100px;'/>"
        + "</a>"
        + "</div>"
        + "<div class='checkin_div' id='checkIn' onclick='checkIn(" + userInfo.sign + ")'>"
        + "<svg class='icon' aria-hidden='true'>"
        + "<use xlink:href='#icon-qiandao'></use>"
        + "</svg>"
        + sign
        + "</div>"
        + "</div>";
    $(".recusers").before(_style2);
    if (signTimeJudge(signTime)) {
        signStyle();
    }
}
function autoUserInfo() {
    var userInfo = localStorage.getItem("userInfo");
    var dataInfo = JSON.parse(userInfo);
    if(userInfo==null){
        autoLogout("content");
    }else{
        var name = dataInfo.data.nickname;
        var headUrl = dataInfo.data.headUrl;
        var _style = "<img src='" + headUrl + "' id='menu_toggle'/>"
            + "<span class='font16 nav_name'>"
            + name
            + "</span>";
        $(".nav_menu").before(_style);
    }
}
/**
 * 填充模板商城首页数据
 * @param dataList
 */
function autoTemplateHtml(dataList) {
    $.each(dataList, function (index, value) {
        var _style="<li>"
                        +"<a href='javascript:void(0);' data-id='"+value.template_id+"' onclick='linkTemplateDetail(this)'>"
                            +"<img src='"+value.template_img_url+"'>"
                        +"</a>"
                        +"<h5>"
                            +"名称："+value.template_name
                        +"</h5>"
                        +"<span>"
                            +"简介："+value.template_introduce
                        +"</span>"
                        +"<p>"
                            +"<a href='javascript:void(0);' data-id='"+value.template_id+"' onclick='linkTemplateDetail(this)'>"
                                +"查看具体详情"
                            +"</a>"
                        +"</p>"
                    +"</li>";
        $(".recommend").append(_style);
    })
}
/**
 * 展示商城精选商品数据
 * @param data
 */
function autoTemplateSelected(dataList){
    console.log(JSON.stringify(dataList));
    var _styleMax="<a href='javascript:void(0);' data-id='"+dataList[0].template_id+"' onclick='linkTemplateDetail(this)'>"
                        +"<img src='"+dataList[0].template_img_url+"'>"
                    +"</a>";
    $(".tdoor-selected").append(_styleMax);
   for(var i=1;i<5;i++){
       var _styleRight="<li>"
                            +"<a href='javascript:void(0);' data-id='"+dataList[i].template_id+"' onclick='linkTemplateDetail(this)'>"
                                 +"<img style='width: 271px;height: 124px;' src='"+dataList[i].template_img_url+"'>"
                            +"</a>"
                        +"</li>"
       $(".selectedRight").append(_styleRight);
   }

}
/**
 * 填充首页动态数据
 * @param postList
 */
function autoIndexPost(postList, selfCode) {
    $.each(postList, function (index, value) {
        var time=timeFormat(value.evaluate.post_date);
        var post_style = "<div class='feed_item'>"
            + "<div class='feed_title'>"
            + "<a target='_blank' href='javascript:;' onclick='userDetail(\"" + value.user_id + "\");' class='avatar_box'>"
            + "<img src='" + value.user_headUrl + "' class='avatar' width='50'>"
            + "</a>"
            + "<a target='_blank' href='javascript:;' onclick='userDetail(\"" + value.user_id + "\");'>"
            + "<span class='feed_uname font14'>"
            + value.user_name
            + "</span>"
            + "</a>"
            + "<a class='date'>"
            + "<span class='feed_time font14'>"
            + time
            + "</span>"
            + "</a>"
            + "<a class='pinned'>"
            + "<span class='font14'>"
            + "时间"
            + "</span>"
            + "</a>"
            + "</div>"
            + "<div class='feed_body'>"
            + "<a target='_blank' class='feed_repostable news' href='" + value.evaluate.post_content + "'>"
            + "<div class='news-left'>"
            + "<div class='cover'>"
            + "<img src='"+ value.evaluate.post_thumbnail+"'>"
            + "</div>"
            + "</div>"
            + "<div class='news_right'>"
            + "<p class='title'>"
            + value.evaluate.post_web_title
            + "</p>"
            + "</div>"
            + "</a>"
            + "<div class='detail_body'>"
            + value.evaluate.post_title
            + "</div>"
            + "</div>"
            + "<div class='feed_bottom'>"
            + "<div class='selected_topics'></div>"
            + "<div class='feed_datas'>"
            + "<span class='like'>"
            + "<a href='javascript:;' data-id='"+value.evaluate.post_id+"' onclick='postDetail(this)'>"
            + "<svg class='icon' aria-hidden='true'>"
            + "<use xlink:href='#icon-guanzhu'></use>"
            + "</svg>"
            + "喜欢&nbsp;&nbsp;"
            + "<font id='p_+" + value.evaluate.post_id + "'>"
            + value.evaluate.post_by_like
            + "</font>"
            + "</a>"
            + "</span>"
            + "<a href='content/dynamicDetails.html?post_id=" + value.evaluate.post_id + "' class='comment j-comment-show'>"
            + "<svg class='icon' aria-hidden='true'>"
            + "<use xlink:href='#icon-pinglun'></use>"
            + "</svg>"
            + "评论&nbsp;&nbsp;"
            + "<span>"
            + value.evaluate.post_by_evaluate
            + "</span>"
            + "</a>"
            + "<span class='view'>"
            + "<a href='javascript:;' data-id='"+value.evaluate.post_id+"' onclick='postDetail(this)'>"
            + "<svg class='icon' aria-hidden='true'>"
            + "<use xlink:href='#icon-chakan'></use>"
            + "</svg>"
            + "查看&nbsp;&nbsp;"
            + value.evaluate.post_click_number
            + "</a>"
            + "</span>"
            + "<span class='options' onclick='options(this)'>"
            + "更多"
            + "</span>"
            + "<div class='options_div' style='display: none;'>"
            + "<div class='triangle'></div>"
            + "<ul class='submenu'>"
            + "<li>"
            + "<a href='javascript:;' onclick='collected(this)'>"
            + "<svg class='icon' aria-hidden='true'>"
            + "<use xlink:href='#icon-shoucang'></use>"
            + "</svg>"
            + "<span>收藏</span>"
            + "</a>"
            + "</li>"
            + "<li>"
            + "<a href='javascript:;' onclick='reported(this)'>"
            + "<svg class='icon' aria-hidden='true'>"
            + "<use xlink:href='#icon-jubao'></use>"
            + "</svg>"
            + "<span>举报</span>"
            + "</a>"
            + "</li>"
            + "</ul>"
            + "</div>"
            + "</div>"
            + "<div class='feed_line'></div>"
            + "</div>"
            + "</div>";
        $("#content_list").append(post_style);
        var _delStyle = "<li>"
            + "<a href='javascript:;' onclick=''>"
            + "<svg  class='icon' aria-hidden='true'>"
            + "<use xlink:href='#icon-shangchu'>"
            + "</use>"
            + "删除"
            + "</svg>"
            + "</a>"
            + "<li>";
        if (selfCode == 1) {
            $(".submenu").append(_delStyle);
        }
    })
}
/**
 * 遍历活跃用户
 * @param dataList
 */
function autoIndexActiveUser(dataList,value) {
    var list = [
        {"id": "6f60926a1d8811e98181408d5c765162", "headUrl": "C:\\work\\T-door\\webIMG\\head/pic_default_woman.png", "nickname": "廖某某"},
        {"id": "6f60926a1d8811e98181408d5c765162", "headUrl": "C:\\work\\T-door\\webIMG\\head/pic_default_woman.png", "nickname": "廖某某"}
    ]
    var imgUrl="img/er.png";
    if(value==1){
        imgUrl="../img/er.png";
    }
    $.each(list, function (index, value) {
        var user_style = "<li>"
            + "<a href='#'>"
            + "<img src='"+imgUrl+"' class='role-icon'>"
            + "<img src='" + value.headUrl + "'>"
            + "</a>"
            + "<span>"
            + "<a href='#'>"
            + value.nickname
            + "</a>"
            + "</span>"
            + "</li>";
        $(".activeUser").append(user_style);
    })
}
/**
 * 收入达人
 * @param dataList
 */
function autoIndexTMax(dataList) {
    var list = [
        {
            "id": "6f60926a1d8811e98181408d5c765162",
            "headUrl": "C:\\work\\T-door\\webIMG\\head/pic_default_woman.png",
            "nickname": "廖某某",
            "tcoin": 900
        },
        {
            "id": "6f60926a1d8811e984566548fdd65162",
            "headUrl": "C:\\work\\T-door\\webIMG\\head/pic_default_woman.png",
            "nickname": "廖213",
            "tcoin": 600
        },
        {
            "id": "6f60926a1d8811e9818asdfd5c765162",
            "headUrl": "C:\\work\\T-door\\webIMG\\head/pic_default_woman.png",
            "nickname": "廖123",
            "tcoin": 550
        },
        {
            "id": "6f60926a1d8811e98181qerr5c765162",
            "headUrl": "C:\\work\\T-door\\webIMG\\head/pic_default_woman.png",
            "nickname": "liao123",
            "tcoin": 520
        },
        {
            "id": "e05344cd1d5111e98181408d5c765162",
            "headUrl": "C:\\work\\T-door\\webIMG\\head/pic_default_woman.png",
            "nickname": "廖88",
            "tcoin": 500
        }
    ]
    $.each(list, function (index, value) {
        var i = index + 1;
        var userUrl = "content/personalCenter.html?id=" + value.id;
        var max_style = "<li>"
            + "<div class='fans-span'>"
            + i
            + "</div>"
            + "<div class='income-avatar'>"
            + "<a href='#'>"
            + "<img src='" + value.headUrl + "'>"
            + "</a>"
            + "</div>"
            + "<div class='income-name'>"
            + "<a href='" + userUrl + "'>"
            + value.nickname
            + "</a>"
            + "<div class='answers-count'>"
            + "总收入:"
            + value.tcoin
            + "T币"
            + "</div>"
            + "</div>"
            + "</li>";
        $(".income-list").append(max_style);
    })
}
/**
 * 显示发布帖子框
 */
function autoEditor() {
    var editor_style = "<div class='feed_post'>"
        + "<div class='release_title'>"
        + "<input type='hidden' id='introduce' name='id' value='0'>"
        + "<input type='text' id='urlAddress' name='url' placeholder='请用一句话介绍你的内容' maxlength='45'>"
        + "</div>"
        + "<div class='input-wrap'>"
        + "<textarea placeholder='请输入/粘贴链接' class='post_textarea' id='feed_content'>"
        + "</textarea>"
        + "<div class='post_textarea' contenteditable='true'>"
        + "</div>"
        + "</div>"
        + "<div class='post_extra'>"
        + "<span class='font14 m120 topic-btn'>"
        + "<div class='top-btn' onclick='showTopics(this)'>"
        + "<svg class='icon' aria-hidden='true'>"
        + "<use xlink:href='#icon-sixinhuifuyongshi'></use>"
        + "</svg>"
        + "话题"
        + "</div>"
        + "<div class='dialog-topic-select ev-view-topic-select' style='display: none;'>"
        + "<span class='hot ev-view-topic-hot'>"
        + "热门话题"
        + "</span>"
        + "<ul class='topic-list ev-view-topic-list'>"
        + "</ul>"
        + "</div>"
        + "</span>"
        + "<a href='javascript:getInsertData();' class='post_button'>"
        + "分享"
        + "</a>"
        + "<ul class='selected-topic ev-select-topics'>"
        + "</ul>"
        + "</div>"
        + "</div>";
    $(".feed-content").before(editor_style);
}
/**
 *填充后台话题数据
 * @param dataList
 */
function autoTopicsContent(dataList) {
    var topics = [
        {"id": "1", "name": "音乐"},
        {"id": "2", "name": "电影"},
        {"id": "3", "name": "知识"},
        {"id": "4", "name": "搞笑"},
        {"id": "5", "name": "轻松"},
        {"id": "6", "name": "探索"},
        {"id": "7", "name": "游戏"},
        {"id": "8", "name": "风景"}
    ];
    $.each(topics, function (index, value) {
        var topics_style = "<li data-topic-id='" + value.id + "' data-topic-name='" + value.name + "'onclick='addTopics(this)'>"
            + value.name
            + "</li>";
        $(".topic-list").append(topics_style);
    })
}
function addTopics(obj) {
    var id = $(obj).data('topic-id');
    var name = $(obj).data('topic-name')
    var html = '<li class="selected-topic-item ev-selected-topic-item" data-topic-id="' + id + '">' + name +
        '<span class="close ev-delete-repostable-topic" onclick="deleteTopics(this)">' +
        'x' +
        '</span></li>';
    $('.selected-topic').append(html);
    $('.dialog-topic-select').hide();
}
/**
 * 动态评论详情
 * @param dataList
 */
function autoEvaluateList(dataList) {
    if (dataList == "") {
        var _style = "<div class='no_data_div'>"
            + "<div class='no_data'>"
            + "<img src='../img/pic_default_people.png'>"
            + "<p>暂无相关内容</p>"
            + "</div>"
            + "</div>";
        $(".comment_list").append(_style);
    } else {
        $.each(dataList, function (index, value) {
            var evaluateList = value.evaluate;
            var time=timeFormat(evaluateList.evaluate_time);
            var evaluate_style = "<div class='comment_item'>"
                + "<dl class='clearfix'>"
                + "<dt>"
                + "<a href='javascript:;'>"
                + "<img src='" + value.user_headUrl + "' width='50'>"
                + "</a>"
                + "</dt>"
                + "<dd>"
                + "<a href='javascript:;'>"
                + "<span class='reply_name'>"
                + value.user_name
                + "</span>"
                + "</a>"
                + "<div class='reply_tool feed_datas'>"
                + "<span class='reply_time'>"
                + time
                + "</span>"
                + "</div>"
                + "<div class='reply_body'>"
                + evaluateList.evaluate_content
                + "</div>"
                + "</dd>"
                + "</dl>"
                + "</div>";
            $(".comment_list").append(evaluate_style);
        })
    }
}
/*添加网海书签*/
function autoNetOceanList() {
    var list = [{"urlContent": "http://www.baidu.com", "titleContent": "百度网"},
        {"urlContent": "http://www.taobao.com", "titleContent": "淘宝网"},
        {"urlContent": "http://fanyi.baidu.com", "titleContent": "百度翻译"},
        {"urlContent": "http://www.map.baidu.com", "titleContent": "百度地图"},
        {"urlContent": "http://www.google.cn/maps", "titleContent": "谷歌地图"},
        {"urlContent": "https://www.amap.com/", "titleContent": "高德地图"},
        {"urlContent": "http://map.sogou.com/", "titleContent": "搜狗地图"},
        {"urlContent": "https://map.qq.com/", "titleContent": "腾讯地图"},
        {"urlContent": "http://www.baidu.com", "titleContent": "百度网"},
        {"urlContent": "http://www.baidu.com", "titleContent": "百度网"},
        {"urlContent": "http://www.baidu.com", "titleContent": "百度网"},
        {"urlContent": "http://www.baidu.com", "titleContent": "百度网"},
        {"urlContent": "http://www.baidu.com", "titleContent": "百度网"},
        {"urlContent": "http://www.baidu.com", "titleContent": "百度网"},
        {"urlContent": "http://www.baidu.com", "titleContent": "百度网"}
    ];
    $.each(list, function (index, value) {
        var _style = "<a href='" + value.urlContent + "' target='_blank'>"
            + value.titleContent
            + "</a>";
        $("#div1").append(_style);
    });
}
/*加载模板评论区*/
function autoTemplateEvaluate(dataList) {
    var _style = "<div class='no_data_div'>"
        + "<img src='../img/pic_default_people.png'>"
        + "<p style='margin-left: 100px;'>暂无相关内容</p>"
        + "</div>"
    if(dataList==""){
        $("#commentArea").append(_style);
    }else{
        $.each(dataList, function (index, value) {
            var time=timeFormat(value.evaluate.evaluate_time);
            var _style = "<li>"
                + "<div class='comment_container'>"
                + "<div class='title_box'>"
                + "<p class='title'>"
                + value.user_name
                + "</p>"
                + "<div class='star_box rate_5.0' id='" + value.evaluate.id + "'>"
                + "</div>"
                + "</div>"
                + "<p class='content'>"
                + value.evaluate.evaluate_content
                + "</p>"
                + "<div class='time'>"
                + time
                + "</div>"
                + "</div>"
                + "</li>";

            $("#commentArea").append(_style);
            autoStarByScore(value.evaluate.score, value.evaluate.id);
        })
    }
}
/*根据评分描绘星星*/
function autoStarByScore(score, id) {
    var _style = "<div class='vector-icon' style='width:20px;height: 20px;line-height: 0;vertical-align: middle;overflow: hidden;'>"
        + "<svg class='icon' aria-hidden='true'>"
        + "<use xlink:href='#icon-shoucang2'>"
        + "</svg>"
        + "</div>";
    console.log("评分为:" + score);
    for (var i = 0; i < Number(score); i++) {
        $("#" + id).append(_style);
    }
}
/*展示目标详细图片*/
function autoTemplateImage(dataList) {
    $.each(dataList, function (index, value) {
        var _style = "<div class='swiper-slide'>"
            + "<img src='" + value.img_url + "'>"
            + "</div>";
        $("#detailSwiper").append(_style);
    })
    var mySwiper = new Swiper('.swiper-container', {
        pagination: '.pagination',
        paginationClickable: true,
        autoplay: 5000,
        speed: 1,
        loop: true,
        onInit: function (swiper) {
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }
    });
}
/**
 * 商品详情块
 * @param dataList
 */
function autoTemplateDetail(dataList) {
    console.log(JSON.stringify(dataList))
    $("#template_title").text(dataList.template_detail.template_name);
    $("#template_price").text(dataList.template_detail.template_price);
    $("#template_introduce").text(dataList.template_detail.template_introduce);
    $("#author_name").text("作者：" + dataList.user_name);
    if (dataList.isCollect == 1) {
        $("#collectT").text("已收藏");
        $("#collectT").attr("data-code", "1");
    }
    if (dataList.isPurchase == 1) {
        $("#buyT").text("已购买");
        $("#buyT").attr("data-code", "1");
    }
    autoTemplateImage(dataList.template_detail_img);
}
/**
 * 用户详情
 * @param info
 */
function autoUserDetail(info) {
    $("#p-nickName").text(info.nickname);
    $("#p-tcoin").text(info.tcoin);
    if (info.profiles == null) {
        $("#p-profiles").text("这家伙真懒，什么也没留下");
    }
    $("#p-profiles").text(info.profiles);
    $("#p-headUrl").attr("src",info.headUrl);
}
/**
 * 展示用户发布过的动态
 * @param data
 */
function autoMyPost(data,code,objId){
    var _style = "<div class='no_data_div'>"
        + "<img src='../img/pic_default_people.png'>"
        + "<p style='margin-left: 95px;'>暂无相关内容</p>"
        + "</div>"
    if (data == "") {
        $("#content_list").append(_style);
    } else {
        var styleC="block";
        if(objId=="003"){
            styleC="none";
        }
        $.each(data,function(index,value){
            if(value!=null){
                var time=timeFormat(value.post_date);
                var _style2="<div class='evnt-grid p-sm-5 p-4'>"
                    +"<div class='row'>"
                    +"<div class='col-lg-2 col-sm-3 text-center mt-2'>"
                    + "<a target='_blank' href='" + value.post_content + "'>"
                    +"<img class='img-fluid' src='"+value.post_thumbnail+"'>"
                    +"</a>"
                    +"</div>"
                    +"<div class='col-lg-7 col-sm-9 abt-block pr-lg-5 mt-sm-0 mt-4'>"
                    +"<h5 class='mb-2 zxx_text_overflow' data-id='"+value.post_id+"' onclick='postDetail(this,1)'>"
                    +"标题："+value.post_web_title
                    +"</h5>"
                    +"<p class='zxx_text_overflow'>"
                    +"简介："+value.post_title
                    +"</p>"
                    +"<ul class='list-unstyled mt-3'>"
                    +"<li>"
                    +"时间："+time
                    +"</li>"
                    +"</ul>"
                    +"</div>"
                    +"<div style='display: "+styleC+";' class='col-lg-3 abt-block text-center'>"
                    +"<a href='javascript:void(0);' data-id='"+value.post_id+"' data-code='"+code+"' onclick='deletePost(this)' class='btn button-style mt-sm-5 mt-4'>"
                    +"删除"
                    +"</a>"
                    +"</div>"
                    +"</div>"
                    +"</div>";
                $("#content_list").append(_style2);
            }
        })
    }
}
/**
 * 我的订单
 * @param info
 */
function autoMyOrders(info) {
    var _style = "<div class='no_data_div'>"
        + "<img src='../img/pic_default_people.png'>"
        + "<p style='margin-left: 95px;'>暂无相关内容</p>"
        + "</div>"
    if (info == "") {
        $("#topic_list").append(_style);
    }else {
        $.each(info, function (index, value) {
            var time = timeFormat(value.trade_time);
            var _style = "<div class='evnt-grid p-sm-5 p-4'>"
                + "<div class='row'>"
                + "<div class='col-lg-2 col-sm-3 text-center mt-2'>"
                + "<img class='img-fluid' src='" + value.template_img + "'>"
                + "</div>"
                + "<div class='col-lg-7 col-sm-9 abt-block pr-lg-5 mt-sm-0 mt-4'>"
                + "<h3 class='mb-2' data-id='"+value.template_id+"' onclick='linkTemplateDetail(this)'>标题:" + value.template_title
                + "</h3>"
                + "<p>簡介:" + value.template_introduce
                + "</p>"
                + "<ul class='list-unstyled mt-3'>"
                + "<li>"
                + "<span class='fa fa-user-o mr-2'>作者：</span>"
                + value.author_name
                + "</li>"
                + "<li class='mx-md-4 mx-2'>"
                + "<span class='fa fa-clock-o mr-2'>時間</span>"
                + time
                + "</li>"
                + "<li>"
                + "<span class='fa fa-map-marker mr-2'>積分：</span>"
                + value.template_price
                + "</li>"
                + "</ul>"
                + "</div>"
                + "<div class='col-lg-3 abt-block text-center'>"
                + "<a href='"+value.down_file_url+"' download='tdoor' style='max-width: 150px;' class='btn button-style mt-sm-5 mt-4'>"
                + "下载"
                + "</a>"
                + "</div>"
                + "</div>"
                + "</dvi>";
            $("#topic_list").append(_style);
        })
    }
}
/**
 * 我的模板收藏
 * @param info
 */
function autoMyTFavorites(info){
    var _style = "<div class='no_data_div'>"
        + "<img src='../img/pic_default_people.png'>"
        + "<p style='margin-left: 95px;'>暂无相关内容</p>"
        + "</div>"
    if (info == "") {
        $("#content_list").append(_style);
    }else{
        $.each(info, function (index, value) {
            var time = timeFormat(value.trade_time);
            var _style2 = "<div class='evnt-grid p-sm-5 p-4'>"
                + "<div class='row'>"
                + "<div class='col-lg-2 col-sm-3 text-center mt-2'>"
                + "<img class='img-fluid' src='" + value.template_img_url + "'>"
                + "</div>"
                + "<div class='col-lg-7 col-sm-9 abt-block pr-lg-5 mt-sm-0 mt-4'>"
                + "<h3 class='mb-2' data-id='"+value.template_id+"' onclick='linkTemplateDetail(this)'>标题:" + value.template_name
                + "</h3>"
                + "<p>简介:" + value.template_introduce
                + "</p>"
                + "<ul class='list-unstyled mt-3'>"
                + "<li>"
                + "<span class='fa fa-map-marker mr-2'>积分：</span>"
                + value.template_price
                + "</li>"
                + "</ul>"
                + "</div>"
                + "<div class='col-lg-3 abt-block text-center'>"
                + "<a href='javascript:void(0);' data-id='"+value.template_id+"' onclick='deleteWish(this)' style='max-width: 150px;' class='btn button-style mt-sm-5 mt-4'>"
                + "删除"
                + "</a>"
                + "</div>"
                + "</div>"
                + "</dvi>";
            $("#content_list").append(_style2);
        })
    }
}
/*动态详情数据*/
function autoPostDetail(postDetail) {
    $("#author_id").attr("href", postDetail.user_id);
    $("#author_avatar").attr("src", postDetail.user_headUrl);
    $("#author_name").text(postDetail.user_name);
    $("#post_time").text(timeFormat(postDetail.evaluate.post_date));
    $("#detail_web_title").text(postDetail.evaluate.post_web_title);
    $("#detail_title").text(postDetail.evaluate.post_title);
    $("#post_img").attr("src",postDetail.evaluate.post_thumbnail)
    var categoryName = "学习";
    switch (postDetail.evaluate.category_id) {
        case 1:
            categoryName = "音乐";
            break;
        case 2:
            categoryName = "电影";
            break;
        case 3:
            categoryName = "知识";
            break;
        case 4:
            categoryName="搞笑";
            break;
        case 5:
            categoryName="轻松";
            break;
        case 6:
            categoryName="探索";
            break;
        case 7:
            categoryName="游戏";
            break;
        case 8:
            categoryName="风景";
            break;
    }
    $("#category_name").text(categoryName);
    $("#like_num").text(postDetail.evaluate.post_by_like);
    $("#collect_num").text(postDetail.evaluate.post_click_number);
    $("#evaluate_num").text(postDetail.evaluate.post_by_evaluate);
    $("#post_link").attr("href", postDetail.evaluate.post_content);
}
/**
 * 显示底部统一数据
 */
function autoTdoorInfo(){
    var _style="<div class='footer'>"
                    +"<div class='footer_cont'>"
                        +"<div class='rights font12'> Copyright © 2019-Present Liao Yubin TDoor Co., Ltd. All rights reserved.</div>"
                        +"<div class='rights font12'>贺州学院-数学与计算机学院-廖某某</div>"
                        +"<div class='developer'>"
                            +"本站技术由"
                            +"<span>T-door</span>"
                            +"提供技术和业务实现"
                        +"</div>"
                    +"</div>"
                +"</div>";
    $(".wrap").after(_style);
}
/**
 * 显示返回顶部按钮
 */
function autoGoTop(){
    var _style="<div class='right_extras'>"
                    +"<a href='javascript:goTop();' class='goTop'>"
                        +"<svg class='icon' aria-hidden='true'>"
                            +"<use xlink:href='#icon-icon-test'></use>"
                        +"</svg>"
                    +"</a>"
                +"</div>"
    $(".main").after(_style);
}
/**
 * 设置页面个人数据显示
 * @param userInfo
 */
function autoSettingUserInfo(userInfo){
    var data=userInfo.data;
   /* console.log(JSON.stringify(userInfo));*/
    $("#nickName").val(data.nickname);
    $("#address").val(data.address);
    $("#profiles").val(data.profiles);
    $("#J-image-preview").attr("src",data.headUrl);
    $("input:radio[name=sex][value='"+data.sex+"']").attr("checked",true);
}
