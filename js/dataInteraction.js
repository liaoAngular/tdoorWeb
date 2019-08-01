/**
 * Created by 廖玉斌 on 2019/1/19 0019.
 * 数据交互文件
 */
//地址链接前缀
/*var  tdoorurl="http://localhost:8087/";*/
var  tdoorurl="http://39.108.228.72:8087/";
var token=localStorage.getItem("token");

function passwordOperation(interface,email,code,nickName,password){
    $.ajax({
        async:false,
        url:tdoorurl+interface,
        type:"POST",
        contentType:"application/json",
        dataType:"json",
        /*数据传输*/
        data:JSON.stringify({
            email:email,
            nickName:nickName,
            password:password,
            code:code
        }),
        success:function(dataMsg){
            switch (interface){
                case "register":
                    if(dataMsg.code==100){
                        noticebox('注册成功，跳转中...', 1, 'login.html');
                    }else{
                        $('input[name="verifiable_code"]').focus();
                        noticebox('验证码错误', 0);
                    }
                    break;
                case "findPassword":
                    if(dataMsg.code==0){
                        noticebox('密码以成功找回，跳转中...', 1, 'login.html');
                    }else{
                        $('input[name="verifiable_code"]').focus();
                        noticebox('验证码错误', 0);
                    }
                    break;
            }

        },
        error:function(){
            noticebox("网络异常",0);
        }
    })
}
/**
 * 验证码操作
 * @param interface
 */
function codeOperation(interface,email){
    $.ajax({
        async:false,
        url:tdoorurl+interface,
        type:"POST",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({
            email:email
        }),
        success:function(msg){
            switch (interface){
                case "sendCode":
                    if(msg.code==102){
                        timeDown(60);
                        noticebox('发送验证码成功', 1);
                    }else{
                        noticebox('该邮箱已被注册', 0);
                    }
                    break;
                case "findpwdCode":
                    if(msg.code==0){
                        noticebox("发送验证码成功",1);
                    }else{
                        noticebox("没有找到该账号",0);
                    }
                    break;
            }
        },
        error:function(){
            noticebox('发送验证码失败', 0);
        }
    })
}


//登录接口
function login(email,password){
    $.ajax({
        async:false,
        url:tdoorurl+"login",
        type:"POST",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({
            email:email,
            password:password
        }),
        success:function(msg){
            console.log(JSON.stringify(msg));
            if(msg.code==200){
                userINFO(msg,email);
            }else{
                noticebox('登录信息错误', 1);
            }
        },
        error:function(){
            noticebox('登录失败', 0);
        }
    })
}
/**
 * 签到--获取基本信息
 */
function userSignIn(interface){
    $.ajax({
        async:false,
        url:tdoorurl+interface,
        dataType:"json",
        tiemOut:5000,
        headers:{
            "Authorization":localStorage.getItem("token")
        },
        success:function(data){
            switch (interface){
                case "getUserInfo":
                    autoSettingUserInfo(data);
                    break;
                case "signIn":
                    noticebox("签到成功，积分+20");
                    signStyle();
                    var nowTime=new Date();
                    localStorage.setItem("signTime",nowTime);
                    break;
            }
        },
        error:function(msg){
            noticebox('签到失败', 0);
            console.log(msg.responseJSON.message);
        }
    })
}
/**
 * 自动向后台查询用户信息
 */
function getUserInfo(){
    var token=localStorage.getItem("token");
    var userInfo=localStorage.getItem("userInfo");
    if(token==null || userInfo==null){
        autoLogout();
    }else{
        //用户操作中心
        $('.nav_right').hover(function(e) {
            if (e.type == 'mouseleave' && $('.nav_menu').css('display') == 'block') {
                $('.nav_menu').hide();
            }
            if (e.type == 'mouseenter' && $('.nav_menu').css('display') == 'none') {
                $('.nav_menu').show();
            }
        });
        console.log("token为:"+token);
        autoFillLogin(JSON.parse(userInfo));
        /*userSignIn("getUserInfo");*/
        autoEditor();
        autoTopicsContent("123");
    }
}
/*
获取模板商品列表
*/
function getTemplateList(){
    allGetDataRewrite("shop/sendShopData");
    allGetDataRewrite("shop/sendSelectedData")
}
/**
 * 获取首页动态列表
 */
function getIndexList(){
    allGetDataRewrite("sendIndexList");
}
/**
 * 获取活跃用户
 */
function getActiveUser(){
    allGetDataRewrite("sendActiveUser");
}
/**
 * 重写从后台获取数据主体--公共类
 * @param interface 接口名称
 */
function allGetDataRewrite(interface,value){
    $.ajax({
        async:false,
        dataType:"json",
        url:tdoorurl+interface,
        type:"POST",
        contentType:"application/json",
        data:JSON.stringify({
           value:value
        }),
        success:function(dataList){
            /**
             * 接口判断补充
             */
            switch(interface){
                case "shop/sendShopData":
                    /*自动填充商城首页数据*/
                   autoTemplateHtml(dataList);
                    break;
                case "post/sendIndexList":
                    autoIndexPost(dataList);
                    break;
                case "sendActiveUser":
                    break;
                case "shop/sendSelectedData":
                    autoTemplateSelected(dataList);
                    break;
            }
        },
        error:function(){
            noticebox('获取数据失败', 0);
        }
    })
}

//修改密码
function changePassword(usedPassword,newPassword){
    $.ajax({
        async:false,
        url:tdoorurl+"changePassword",
        type:"POST",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify({
            newPassword:newPassword,
            usedPassword:usedPassword
        }),
        headers:{
            "Authorization":localStorage.getItem("token")
        },
        success:function(Msg){
            if(Msg.code==0){
                console.log("修改密码成功");
            }else{
                console.log("原密码错误");
            }
        },
        error:function(Msg){

        }
    })
}
/**
 * 用户发布动态
 * @param introduce
 * @param urlAddress
 * @param topics
 */
function postDynamic(introduce,urlAddress,topics){
   /* alert("简介为:"+introduce+"链接为:"+urlAddress+"主题:"+topics);*/
    var dataInfo={"introduce":introduce,"urlAddress":urlAddress,"topics":topics};
    submitByUser("post/postDynamic",dataInfo);
}
/**
 * 收藏模板
 * @param userId
 * @param templateId
 */
function collectTemplate(templateId){
    var dataInfo={"template_id":templateId};
    submitByUser("shop/collectT",dataInfo);
}
/**
 * 购买商品
 * @param templateId
 * @param price
 */
function purchaseTemplate(templateId,price){
    var dataInfo={"template_id":templateId,"template_price":price};
    submitByUser("shop/purchaseT",dataInfo);
}
/**
 * 对商品发布评价
 * @param templateId
 * @param evaluateContent
 * @param score
 */
function evaluateTemplate(templateId,evaluateContent,score){
    var dataInfo={"template_id":templateId,"evaluate_content":evaluateContent,"evaluate_score":score};
    submitByUser("shop/evaluateT",dataInfo);
}
/**
 * 对动态发布评价
 * @param post_id
 * @param evaluateContent
 */
function evaluatePost(post_id,evaluateContent){
    var dataInfo={"post_id":post_id,"evaluate_content":evaluateContent};
    submitByUser("post/commentPost",dataInfo);
}
/**
 * 用户提交操作--公共类
 * @param interface
 * @param info
 */
function submitByUser(interface,info){
    $.ajax({
        async:false,
        url:tdoorurl+interface,
        type:"POST",
        contentType:"application/json",
        dataType:"json",
        timeOut:10000,
        data:JSON.stringify({
            introduce:info.introduce,
            urlAddress:info.urlAddress,
            topics:info.topics,
            template_id:info.template_id,
            template_price:Number(info.template_price),
            post_id:info.post_id,
            nickName:info.nickName,
            profiles:info.profiles,
            sex:Number(info.sex),
            address:info.address,
            score:info.evaluate_score+"",
            content:info.evaluate_content
        }),
        headers:{
            "Authorization":localStorage.getItem("token")
        },
        complete:function(XHR,textStatus){
            var token=XHR.getResponseHeader("Authorization");
            if(token!=null){
                console.log("返回头部信息:"+XHR.getResponseHeader("Authorization"));
                storageToken(XHR.getResponseHeader("Authorization"));
            }
        },
        success:function(dataList){
            switch (interface){
                case "post/postDynamic":
                    if(dataList.code==0){
                        //停止加载按钮
                        $('.noticebox').slideUp(200);
                        //清空数据
                        $("#urlAddress").val("");
                        $("#feed_content").val("");
                        $(".selected-topic").empty();
                        noticebox("发布成功,积分+20",1);
                        showNewPost();
                    }else{
                        noticebox(dataList.msg,0);
                    }
                    break;
                case "shop/collectT":
                    if(dataList.code==0){
                        var manyAllChoseAlert2 = simpleAlert({
                            "content":"收藏成功",
                            "closeAll":true,
                            "buttons":{
                                "确定":function () {
                                    manyAllChoseAlert2.close();
                                    $("#collectT").text("已收藏");
                                    $("#collectT").attr("data-code","1");
                                }
                            }
                        })
                    }else{
                        var onlyChoseAlert = simpleAlert({
                            "content":"取消收藏成功",
                            "buttons":{
                                "确定":function () {
                                    onlyChoseAlert.close();
                                    $(".simpleAlert").remove();
                                    $("#collectT").text("收藏");
                                    $("#collectT").attr("data-code","0");
                                }
                            }
                        });
                    }
                    break;
                case "shop/purchaseT":
                    if(dataList.code==0){
                        noticebox("购买成功",1);
                        $("#buyT").text("已购买");
                        $("#buyT").attr("data-code","1");
                    }else if(dataList.code==111){
                        noticebox(dataList.msg,0);
                    }
                    break;
                case "shop/evaluateT":
                    if(dataList.code==0){
                        noticebox("评论成功",1);
                        $("#evaluateContent").val("");
                        $("#commentArea").empty();
                        getInfoById("shop/evaluateList",template_id,localStorage.getItem("userId"));
                    }else{
                        noticebox("你还没购买，请先购买",0);
                    }
                    break;
                case "post/likeP":
                    liked();
                    break;
                case "updateUser":
                    noticebox("修改信息成功",1);
                    break;
                case "post/commentPost":
                    if(dataList.code==0){
                        $("#post_evaluate_content").val("");
                        noticebox("提交评论成功",1);
                        loadPostEvaluate(info.post_id);
                    }else{
                        noticebox("评论失败",0);
                    }
                    break;
            }
        },
        error:function(errorMsg){
            //停止加载按钮
            $('.noticebox').slideUp(200);
            noticebox("请从新登录",1,"content/login.html");
        }
    })
}
/**
 * 加载商城模板具体信息
 * @param template_id
 */
function getTemplateDetail(template_id){
    var userId=window.localStorage.getItem("userId");
    getInfoById("shop/sendDetail",template_id,userId);
    getInfoById("shop/evaluateList",template_id,userId);

}
/**
 * 获取具体数据操作--公共类
 * @param interface
 * @param object_id
 * @param user_id
 */
function getInfoById(interface,object_id,user_id){
    $.ajax({
        async:false,
        url:tdoorurl+interface,
        type:"POST",
        contentType:"application/json",
        dataType:"json",
        timeOut:5000,
        data:JSON.stringify({
            user_id:user_id,
            template_id:object_id,
            post_id:object_id
        }),
        headers:{
            "Authorization":localStorage.getItem("token")
        },
        success:function(dataList){
            /*console.log(JSON.stringify(dataList));*/
            switch(interface){
                case "shop/sendDetail":
                    autoTemplateDetail(dataList);
                    break;
                case "checkUser":
                    console.log("用户数据为："+JSON.stringify(dataList));
                    autoUserDetail(dataList);
                    break;
                case "post/sendPostEvaluate":
                    /*console.log(JSON.stringify(dataList));*/
                    autoEvaluateList(dataList);
                    break;
                case "post/sendPostDetail":
                    console.log(JSON.stringify(dataList));
                    autoPostDetail(dataList);
                    break;
                case "post/checkMyPost":
                    autoMyPost(dataList,1,object_id);
                    break;
                case "shop/evaluateList":
                    autoTemplateEvaluate(dataList);
                    break;

            }
        },
        error:function(errorMsg){

        }
    })
}
/**
 * 更改用户头像
 */
function changeUserHead(headImg){
    /*console.log(headImg.get("file"));*/
    $.ajax({
        url: tdoorurl+"updateHeadImg",
        data: headImg,
        type: "Post",
        dataType: "json",
        /*cache: false,//上传文件无需缓存*/
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        headers:{
            "Authorization":localStorage.getItem("token")
        },
        success: function (result) {
            if(result.code==0){
                noticebox("上传成功",1);
            }else{
                noticebox("上传失败",0);
            }
        },
        error:function(errorMsg){
            console.log("错误信息:"+JSON.stringify(errorMsg));
        }
    })
}
/**
 * 获取用户数据详情
 * @param interface
 */
function myAllData(interface,dataId){
    $.ajax({
        url:tdoorurl+interface,
        type:"Post",
        timeout:3000,
        contentType:"application/json",
        headers:{
            "Authorization":localStorage.getItem("token")
        },
        data:JSON.stringify({
            dataId:dataId
        }),
        success:function(msgData){
            console.log(JSON.stringify(msgData));
            switch (interface){
                case "shop/showOrders":
                    autoMyOrders(msgData);
                    break;
                case "post/sendFavorites":
                    autoMyPost(msgData,0);
                    break;
                case "shop/sendTFavorites":
                    autoMyTFavorites(msgData);
                    break;
                case "post/isCollect":
                    if(msgData.code==0){
                        //已经收藏
                        $(".likePost").attr("style","color:red;");
                        $("#J-likes8417").attr("data-id",1);
                    }else{
                        //还没有收藏
                        $("#J-likes8417").attr("data-id",0);
                    }
                    break;
            }
        }
    })
}
/**
 * 用户倾向性操作
 * @param operationId 操作id
 * @param interface 操作接口
 * @param dataId 操作数据id
 */
function clickPost(operationId,interface,dataId){
    $.ajax({
        async:false,
        url:tdoorurl+interface,
        type:"POST",
        contentType:"application/json",
        dataType:"json",
        timeOut:5000,
        data:JSON.stringify({
           dataId:dataId
        }),
        headers:{
            "Authorization":localStorage.getItem("token")
        },
        success:function(dataCode){
            switch (interface){
                case "post/collectPost":
                    collectPost();
                    break;
                case "post/deleteCollect":
                    noticebox("删除成功",1);
                    $(".profile_list").empty();
                    myAllData("post/sendFavorites");
                    break;
                case "post/deletePosting":
                    noticebox("删除成功",1);
                    $(".profile_list").empty();
                    getInfoById("post/checkMyPost","",localStorage.getItem("userId"));
                    break;
                case "shop/deleteTCollect":
                    noticebox("删除成功",1);
                    $(".profile_list").empty();
                    myAllData("shop/sendTFavorites");
                    break;
                case "sponsorUser":
                    sponsorAuthor(dataCode);
            }
        },
        error:function(){
            console.log("操作失败");
        }
    })
}


