var server_url = 'http://47.93.44.14:3090';

var login = function(){
        $.ajax({
        url:server_url + "/api/register",
        type:"POST",
        dataType:"json",
        data:{
            username : $('.user_name input').val(),
            password : $('.user_password input').val(),
            nickname : $('.user_nickname input').val()
        },
        success:function (res) {
            if(res.status == 1){
                alert("注册成功！");
                window.location.href = "login.html";
            }
        },
        error: function(e) {
        }
    })
}
