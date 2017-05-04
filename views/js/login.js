var server_url = 'http://47.93.44.14:3090';

var login = function(){
        $.ajax({
        url:server_url + "/api/login",
        type:"POST",
        dataType:"json",
        data:{
            username : $('.user_name input').val(),
            password : $('.user_password input').val()
        },
        success:function (res) {
            if(res.status == 1){
                window.location.href = "index.html";
            }
        },
        error: function(e) {
            alert("登录失败！");
        }
    })
}
function register () {
    window.location.href = "register.html";
}
