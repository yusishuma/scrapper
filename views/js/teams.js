//计算有多少页（初始化页码按钮）
var personsList = null;
var totalCount = 0;
// 一页显示几条数据
var pageSize = 20
var urlPage = getUrlParam("page");
var currentPageNo = urlPage ? urlPage : 1;
var server_url = 'http://47.94.3.18:3090';

$(function(){
    initBtn();
})
function initBtn () {
    $.ajax({
        url:server_url + "/api/teams?limit=1000000&gameType="+$("#selectedId").val()+"&page="+currentPageNo,
        type:"GET",
        dataType:"json",
        success:function (res) {
            console.log(res);
            //缓存到本地
            personsList = res.data.teams;
            totalCount = res.data.count;
            // 分页处理
            $("#page").initPage(totalCount,currentPageNo,function(currentPageNo){
                resetUrl({page:currentPageNo});
                var currentArr = personsList.slice((currentPageNo - 1) * pageSize, currentPageNo * pageSize);
                var $str = [];
                $str.push("<tr class='detail_table_tr1'><td>序号</td><td>队伍</td><td>游戏类型</td><td>操作</td></tr>");
                for (var i = 0; i < currentArr.length; i++) {
                    var data = currentArr[i]
                    $str.push("<tr id='"+data.teamId+"'><td>" + (i+1) + "</td>"+
                        "<td>" + data.teamName + "</td>"+
                        "<td>" + data.gameType + "</td>"+
                        "<td><a data-leaveId='"+data.teamId+"' class='addBtn' onclick=\"synchroDataTeam('"+data.teamId+"')\">队伍已添加</a></td>"+
                    "</tr>");
            }
            $('#tbodyid').html($str.join(","));
            });
        },
        error: function(e) {
            alert('同步战队失败');
        }
    })
}
// 刷新页面留在当前页的处理
function resetUrl(data){
    if (typeof history != 'undefined') {
        var url = window.location.href.split('?')[0];
        history.pushState(null, null, url+'?'+parseParam(data));
    }
}
function parseParam(param, key){
    var paramStr="";
    if(param instanceof String||param instanceof Number||param instanceof Boolean){
        paramStr+="&"+key+"="+encodeURIComponent(param);
    } else {
        $.each(param,function(i){
        var k = key==null ? i : key+"["+i+"]";
        paramStr += '&' + parseParam(this, k);
      });
    }
    return paramStr.substr(1);
};
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
// 同步创建战队
function synchroDataTeam (teamId) {
    $.ajax({
        url: server_url + "/api/teams",
        type:"POST",
        dataType:"json",
        data:{
            // 获取标签放在引号里
            teamId:teamId
        },
        success:function (res) {
            if(res.status == 1){
                alert(res.msg);
                $('#' + teamId).hide();
            }
        },
        error: function(e) {
        }
    })
}








