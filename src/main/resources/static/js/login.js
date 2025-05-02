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