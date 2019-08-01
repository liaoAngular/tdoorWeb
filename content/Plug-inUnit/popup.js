/**
 * Created by 廖某某 on 2019/1/12 0012.
 */
$(document).ready(function(){
    var details = chrome.app.getDetails();

    var html = "<p><img src='"+details.browser_action.default_icon+"'></p>"+
        "<h2>"+details.name+"</h2>"+
        "<p>版本号"+details.version+"</p>"+
        "<p>author:廖某某</p>"+
        "<p>@copyright 2019, tdoor;</p>";
    $("#about-box").html(html);
    chrome.bookmarks.getTree(function(bookmarkArray){
        console.log(bookmarkArray)
    });
});

