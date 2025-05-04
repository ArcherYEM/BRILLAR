// 로그인시 header 문구변경
$(document).ready(function(){
    $.ajax({
        url: '/login/userInfo',
        type: 'GET',
        success: function(user){
            if (user) {
                const $userButton = $('#UserButton');
                $userButton.empty()

                const html = `
                    <a href="/user">${user.userName}(등급: ${user.userRoleCode})</a>
                    <a href="#" id="LogoutButton">로그아웃</a>
                `;

                $userButton.html(html);
            }
        },
        error: function(xhr){
            console.error("로그인 과정 에러 발생 : ", xhr);
        }
    })
})

// logout
$(document).on("click", "#LogoutButton", function (e) {
    e.preventDefault();

    $.ajax({
        url: "/login/logout",
        type: "POST",
        success: function () {
            window.location.href = "/login";
        },
        error: function (err) {
            console.error("로그아웃 실패: ", err);
            alert("로그아웃 중 오류가 발생했습니다.");
        }
    });
});