// 전역변수

// 페이지로드
$(document).ready(function () {
    // 비밀번호 보기 토글
    $('.btn-eye').on('click', function () {
        const $input = $(this).siblings('input');
        const $icon = $(this).find('img');
        const isPassword = $input.attr('type') === 'password';

        $input.attr('type', isPassword ? 'text' : 'password');
        $icon.attr('src', isPassword ? '/img/icons/icon-visible.svg' : '/img/icons/icon-invisible.svg');
    });
})

/*********************************/
// 유저 로그인
$("#LoginSubmit").on("click", function(){
    const userId = $("#LoginUserid").val();
    const userPassword = $("#LoginPwd").val();

    $.ajax({
        url: '/login/login',
        type: 'GET',
        data: {
            userId: userId,
            userPassword: userPassword
        },
        success: function(user){

            if (!user || !user.userId) {
                alert("아이디 또는 비밀번호가 올바르지 않습니다.");
                return;
            }

            window.location.href = "/";
        },
        error: function(xhr, status, error){
            console.warn('로그인 에러발생 : ', error);
        }
    })
})