// 전역변수
let idDuple = false;
let emailDuple = false;
let phoneDuple = false;

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

    // 비밀번호 일치여부
    $('#JoinPwd, #JoinPwdChk').on('input', function () {
        const pwd = $('#JoinPwd').val().trim();
        const pwdChk = $('#JoinPwdChk').val().trim();
        const $msg = $('#pwdMatchMsg');

        if (pwd === '' || pwdChk === '') {
            $msg.text('두 비밀번호가 일치하지 않습니다').css('color', 'red');
        } else if (pwd === pwdChk) {
            $msg.text('두 비밀번호가 일치합니다').css('color', 'green');
        } else {
            $msg.text('두 비밀번호가 일치하지 않습니다').css('color', 'red');
        }
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

/*********************************/

// 중복확인
function isDuplicate(type) {
    let flag = 0;
    let data = '';
    if (type === 'id') {
        data = $('#JoinUserId').val().trim();
        flag = 1;
    } else if (type === 'email') {
        data = $('#JoinEmail').val().trim();
        flag = 2;
    } else if (type === 'phone') {
        data = $('#JoinPhone').val().trim();
        flag =3;
    }

    if (flag !== 0 && data !== ''){
        $.ajax({
            url : `/api/join/duplicate?data=${data}&flag=${flag}`,
            method : 'GET',
            success : function(result){
                const isAvailable = result === 0;

                switch (flag){
                    case 1 :
                        idDuple = isAvailable;
                        break;
                    case 2 :
                        emailDuple = isAvailable;
                        break;
                    case 3 :
                        phoneDuple = isAvailable;
                        break;
                }
                console.log('아이디 사용 가능 여부:', idDuple);
                console.log('이메일 사용 가능 여부:', emailDuple);
                console.log('전화번호 사용 가능 여부:', phoneDuple);
            },
            error : function (xhr, status, error){
                console.warn('중복확인 로직 에러 발생 : ', error);
            }
        });
    } else {
        console.warn('flag 값 이상 : ', flag);
        return;
    }
}
