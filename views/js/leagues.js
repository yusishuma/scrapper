//计算有多少页（初始化页码按钮）
var personsList = null;
var totalCount = 0;
// 一页显示几条数据
var pageSize = 20;
var urlPage = getUrlParam("page");
var currentPageNo = urlPage ? urlPage : 1;
$(function(){
    initBtn();
    // upData();
})
// var server_url = 'http://47.93.44.14:3090';
var server_url = 'http://localhost:3090';

function initBtn () {
    // 刷新当前页面
    // window.location.reload()
    $.ajax({
        url:server_url + "/api/leagues?limit=1000000&gameType="+$("#selectedId").val()+"&page="+currentPageNo,
        type:"GET",
        dataType:"json",
        success:function (res) {
            console.log(res);
            //缓存到本地
            personsList = res.data.leagues;
            totalCount = res.data.count;
            // 分页处理
            $("#page").initPage(totalCount,currentPageNo,function(currentPageNo){
                resetUrl({page:currentPageNo});
                var currentArr = personsList.slice((currentPageNo - 1) * pageSize, currentPageNo * pageSize);
                var $str = [];
                $str.push("<tr class='detail_table_tr1'><td>序号</td><td>赛事</td><td>赛事等级</td><td>风险金</td><td>单注赔付上限</td><td>操作</td></tr>");
                for (var i = 0; i < currentArr.length; i++) {
                    var data = currentArr[i]
                    $str.push("<tr class='"+data.leagueId+"'><td>" + (i+1) + "</td>"+
                        "<td style='display: none;'>" + data.leagueId + "</td>"+
                        "<td>" + data.leagueName + "</td>"+
                        "<td>"+
                        // "<select id='" + data.leagueId + "' class='leaveId' onchange=\'javascript:upData('" + data.leagueId + "')\'>"+
                            "<select class='leaveId' id='"+data.leagueId+"' onchange=\"upData('"+data.leagueId+"')\">"+
                                "<option value ='1'>1</option>"+
                                "<option value ='2'>2</option>"+
                                "<option value ='3'>3</option>"+
                            "</select>"+
                        "</td>"+
                        "<td>" + data.riskFund + "</td>"+
                        "<td>" + data.payCeiling + "</td>"+
                        "<td><a data-leaveId='"+data.leagueId+"' class='save' onclick=\"synchroData('"+data.leagueId+"')\">保存</a></td>"+
                    "</tr>");
            }
            $('#tbodyid').html($str.join(","));
            for(var item in currentArr){
                $("#" + currentArr[item].leagueId).val(currentArr[item].level);
             }
            });
        },
        error: function(e) {
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
// 更新赛事
function upData (leagueId) {
    // alert(leagueId);
    $.ajax({
        url:server_url + "/api/leagues/" + leagueId,
        type:"PUT",
        dataType:"json",
        data:{
            level : $("#"+ leagueId).val()
        },
        success:function (res) {
            if(res.status == 1){
                alert(res.msg);
            }
        },
        error: function(e) {
        }
    })

}

// 同步赛事赌局
function synchroData (leagueId) {
    $.ajax({
        url:"http://47.93.44.14:3090/api/leagues",
        type:"POST",
        dataType:"json",
        data:{
            // 获取标签放在引号里
            leagueId:leagueId
        },
        success:function (res) {
            if(res.status == 1){
                alert(res.msg);
                $("." + leagueId).hide();
            }
        },
        error: function(e) {
        }
    })
}