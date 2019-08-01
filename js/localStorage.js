/**
 * Created by 廖某某 on 2019/1/26 0026.
 */
/**
 * 账号信息存储
 * @param userInfo
 * @param email
 */
function userINFO(userInfo,email){
    console.log(JSON.stringify(userInfo));
    storageToken(userInfo.token);
    localStorage.setItem("signTime",userInfo.signTime);
    localStorage.setItem("userId",userInfo.data.id);
    delete userInfo.token;
    delete userInfo.code;
    delete userInfo.msg;
    delete userInfo.signTime;
    localStorage.setItem("userInfo",JSON.stringify(userInfo));
    noticebox('登录成功，跳转中...', 1, '../index.html');
}
/**
 * token的本地存储
 * @param token
 */
function storageToken(token){
    localStorage.setItem("token",token);
}
/**
 * userId本地存储
 * @param userId
 */
function storageUserId(userId){
    localStorage.setItem("userId",userId);
}