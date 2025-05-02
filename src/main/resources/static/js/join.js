$(document).ready(function () {
    // 비밀번호 보기 토글
    $('.btn-eye').on('click', function () {
        const $input = $(this).siblings('input');
        const $icon = $(this).find('img');
        const isPassword = $input.attr('type') === 'password';

        $input.attr('type', isPassword ? 'text' : 'password');
        $icon.attr('src', isPassword ? '/img/icons/icon-visible.svg' : '/img/icons/icon-invisible.svg');
    });

    // 약관 모달 열기
    $('#TermText').on('click', function (e) {
        e.preventDefault();
        $('#JoinTermModal').fadeIn(200);
    });
    
    // 약관 모달 닫기
    $('#JoinTermClose, #JoinModalClose').on('click', function () {
        $('#JoinTermModal').fadeOut(200);
    });
    $(window).on('click', function (e) {
        const $modal = $('#JoinTermModal .modal-wrapper');
        if (!$(e.target).closest($modal).length && $(e.target).is('#JoinTermModal')) {
            $('#JoinTermModal').fadeOut(200);
        }
    });
});


