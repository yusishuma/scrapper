var login = function(){
        $.ajax({
        url:"http://47.93.44.14:3090/api/register",
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
