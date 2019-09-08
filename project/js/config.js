var baseURL = 'http://139.217.97.220:80'
var userid = 'yum3';
var affairsUserId = '43'

// 获取url参数的公共方法
function getUrlParam(name) {//封装方法
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}