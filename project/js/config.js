var baseURL = 'http://vac.zfatcchina.com:8002'
var userid = sessionStorage.getItem('userid') || '43' //'yum3';
var affairsUserId = '43'

// 获取url参数的公共方法
function getUrlParam(name) {//封装方法
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
$(function(){
    var code = getUrlParam('code');
    var state = getUrlParam('state');
    if(!userid) {
        $.ajax({
            type: 'GET',
            url: baseURL + '/login/with/company/mini',
            async: false,
            data: {
                code: code,
                state: state
            },
            success: function(res){
                if(typeof res == 'string') {
                    res = JSON.parse(res);
                }
                if(res.success){
                    userid = (res.data || '').trim();
                    if(userid) {
                        sessionStorage.setItem('userid', userid);
                    }
                } else {
                    mui.alert(res.msg || 'cannot get userid', 'warning', 'Yes');
                    sessionStorage.setItem('userid', '');
                }
            },
            error: function(){
                userid = '';
                mui.alert('get userid failed', 'warning', 'Yes');
                sessionStorage.setItem('userid', '');
            }
        });
    }
    $.ajaxSetup({
        beforeSend: function(xhr, obj){
            if(obj.url.indexOf('/login/with/company/mini') == -1){
                if(!userid){
                    xhr.abort();
                }
            }
        }
    })

})