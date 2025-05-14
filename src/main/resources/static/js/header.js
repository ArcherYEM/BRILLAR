// 로그인시 header 문구변경
$(document).ready(function(){
    $.ajax({
        url: '/login/header',
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
            if (xhr.status === 200 || 401) {
                return;
            }
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
            if (confirm("로그아웃 하시겠습니까?")) {
                window.location.href = "/login";
            }
        },
        error: function (err) {
            console.error("로그아웃 실패: ", err);
            alert("로그아웃 중 오류가 발생했습니다.");
        }
    });
});
