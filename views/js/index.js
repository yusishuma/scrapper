//计算有多少页（初始化页码按钮）
var personsList = null;
var matchList = null;
var matchCount = 0;
var totalCount = 0;
// 一页显示几条数据
var pageSize = 20;
var urlPage = getUrlParam("page");
var currentPageNo = urlPage ? urlPage : 1;
$(function(){
    matchBtn();
    initBtn();
})
$('#selectedId').live('change',function(){
    matchBtn();
    initBtn();
})
// 根据赌局筛选
function initBtn () {
    var url = "http://47.93.44.14:3090/api/gambles?limit=1000000&gameType="+$("#selectedId").val()+"&page="+currentPageNo;
    if($("#matchId").val() !== null){
        url = url + "&matchName="+$("#matchId").val();
    }
    // alert(currentPageNo)
    // console.log($("#matchId").val())
    $.ajax({
        url: url,
        type:"GET",
        dataType:"json",
        success:function (res) {
            console.log(res);
            //缓存到本地
            personsList = res.data.gambles;
            totalCount = res.data.count;
            // 分页处理
            $("#page").initPage(totalCount,currentPageNo,function(currentPageNo){
                resetUrl({page:currentPageNo});
                var currentArr = personsList.slice((currentPageNo - 1) * pageSize, currentPageNo * pageSize);
                var $str = [];
                for (var i = 0; i < currentArr.length; i++) {
                    var data = currentArr[i]
                    var time = new Date(data.endTime);
                    Y = time.getFullYear() + '-';
                    M = (time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1) + '-';
                    D = time.getDate() + ' ';
                    h = time.getHours() + ':';
                    m = time.getMinutes() + ':';
                    s = time.getSeconds();
                    var endTime = Y+M+D+h+m+s;
                    // console.log(Y+M+D+h+m+s);
                    $str.push("<tr>"+
                        "<td rowspan='2'>序号</td>"+
                        "<td rowspan='2'>赌局名称</td>"+
                        "<td rowspan='2'>所属赛事</td>"+
                        "<td rowspan='2'>所属比赛</td>"+
                        "<td rowspan='2'>截止时间</td>"+
                        "<td>下注项1名称</td>"+
                        "<td>下注项1赔率</td>"+
                        "<td>单注赔付上限</td>"+
                        "<td>风险金</td>"+
                        "<td rowspan='4' class='add_td'><a href='javascript:;' data-id='"+ data.gambleId +"' class='add_a'>添加赌局</a></td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td>" + data.optionA.name + "</td>"+
                        "<td>" + data.optionA.odds + "</td>"+
                        "<td><input type='text' value='" + data.optionA.payCeiling + "' onchange=\"upData('"+data.gambleId+"')\" class='optionA_payCeiling' data-a='' data-gama=''></input></td>"+
                        "<td><input type='text' value='" + data.optionA.riskFund + "' onchange=\"upData('"+data.gambleId+"')\" class='optionA_riskFund' data-b='' data-gamb=''></input></td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td rowspan='2' class='td'>" + (i+1) + "</td>"+
                        "<td rowspan='2' class='td'>" + data.gambleName + "</td>"+
                        "<td rowspan='2' class='td'><a href='leagues.html'>" + data.league.leagueName + "</a></td>"+
                        "<td rowspan='2' class='td'>" + data.match + "</td>"+
                        "<td rowspan='2' class='td'>" + endTime + "</td>"+
                        "<td>下注项2名称</td>"+
                        "<td>下注项2赔率</td>"+
                        "<td>单注赔付上限</td>"+
                        "<td>风险金</td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td>" + data.optionB.name + "</td>"+
                        "<td>" + data.optionB.odds + "</td>"+
                        "<td><input type='text' value='" + data.optionB.payCeiling + "' onchange=\"upData('"+data.gambleId+"')\" class='ptionB_payCeiling' data-c='' data-gamc=''></input></td>"+
                        "<td><input type='text' value='" + data.optionB.riskFund + "' onchange=\"upData('"+data.gambleId+"')\" class='optionB_riskFund' data-d='' data-gamd=''></input></td>"+
                    "</tr>");
            }
            $('#tbodyid').html($str);
            });
        },
        error: function(e) {
        }
    })
}
// 根据赛程筛选
function matchBtn () {
    $.ajax({
        url:"http://47.93.44.14:3090/api/matches?limit=128&gameType="+$("#selectedId").val()+"&page="+currentPageNo,
        type:"GET",
        dataType:"json",
        success:function (res) {
            console.log(res);
            console.log($("#selectedId").val());
            // console.log($("#matchId").val());
            //缓存到本地
            matchList = res.data.matches;
            var $str = [];
            $str.push("<option value='all'>显示全部</option>");
            for (var i = 0; i < matchList.length; i++) {
                var data = matchList[i]
                // console.log(data.matchName);
                $str.push("<option value='"+ data.matchName +"'>" + data.matchName + "</option>");
            }
            $('#matchId').html($str.join(","));
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
// 添加赌局事件
$('.add_a').live('click',function(){
    $(".message").css("display","block");
    // 获取“添加赌局”的父级的统计
        // 1.所属赛事
        var data1 = $(this).parent().parent().next().next().children().next().next().children().html();
        // 2.所属比赛
        var data2 = $(this).parent().parent().next().next().children().next().next().next().html();
        // 3.截止时间
        var data3 = $(this).parent().parent().next().next().children().next().next().next().next().html();
        // 4.赌局名称
        var data4 = $(this).parent().parent().next().next().children().next().html();
        // 5.下注项1名称
        var data5 = $(this).parent().parent().next().children().first().html();
        // 6.下注项2名称
        var data6 = $(this).parent().parent().next().next().next().children().first().html();
        // 7.下注项1赔率
        var data7 = $(this).parent().parent().next().children().next().html();
        // 8.下注项2赔率
        var data8 = $(this).parent().parent().next().next().next().children().next().html();
        // 9.下注项1单注赔付上限
        var data9 = $(this).parent().parent().next().children().next().next().children().val();
        // 10.下注项1风险金
        var data10 = $(this).parent().parent().next().next().next().children().next().next().children().val();
        // 11.下注项2单注赔付上限
        var data11 = $(this).parent().parent().next().children().next().next().next().children().val();
        // 12.下注项2风险金
        var data12 = $(this).parent().parent().next().next().next().children().next().next().next().children().val();
    // 获取信息展示的各个标签
        // 1.所属赛事
        $('.message_leagueName').html(data1);
        // 2.所属比赛
        $('.message_match').html(data2);
        // 3.截止时间
        $('.message_endtime').html(data3);
        // 4.赌局名称
        $('.message_gambleName').html(data4);
        // 5.下注项1名称
        $('.message_oA_win').html(data5);
        // 6.下注项2名称
        $('.message_oB_win').html(data6);
        // 7.下注项1赔率
        $('.message_oA_odds').html(data7);
        // 8.下注项2赔率
        $('.message_oB_odds').html(data8);
        // 9.下注项1单注赔付上限
        $('.message_oA_payCeiling').html(data9);
        // 10.下注项1风险金
        $('.message_oB_payCeiling').html(data10);
        // 11.下注项2单注赔付上限
        $('.message_oA_riskFund').html(data11);
        // 12.下注项2风险金
        $('.message_oB_riskFund').html(data12);
        $('.savaBtn').attr("data-gambleId",$(this).attr('data-id'));
        // alert($('.message_tr').find('.savaBtn').attr('data-gambleId'));
})
// 更新赌局
function upData (gambleId) {
    console.log(gambleId)
    $.ajax({
        url:"http://47.93.44.14:3090/api/gambles/" + gambleId,
        type:"PUT",
        dataType:"json",
        data:{
            optionB: {
                riskFund: $('.optionB_riskFund').val(),
                payCeiling: $('.ptionB_payCeiling').val()
            },
            optionA: {
                riskFund: $('.optionA_riskFund').val(),
                payCeiling: $('.optionA_payCeiling').val()
            }
        },
        success:function (res) {
            console.log(res);
            if(res.status == 1){
                // window.location.reload();
                // alert(res.msg);
            }
        },
        error: function(e) {
        }
    })
}

// 同步创建赌局
function createGame () {
    // alert($('.savaBtn').attr('data-gambleId'));
    // alert("添加赌局成功！");
    $(".message").hide();
    $.ajax({
        url:"http://47.93.44.14:3090/api/gambles",
        type:"POST",
        dataType:"json",
        data:{
            gambleId:$('.savaBtn').attr('data-gambleId')
        },
        success:function (res) {
            console.log(res);
            if(res.status == 1){
                alert(res.msg);
            }
        },
        error: function(e) {
            alert('同步赌局失败');

        }
    })
}

// 取消按钮函数
function cancel () {
    $(".message").hide();
}



