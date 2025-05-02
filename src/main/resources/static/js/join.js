// 전역변수
let idDuple = false;    // id 중복여부
let emailDuple = false; // 이메일 중복여부
let phoneDuple = false; // 휴대폰 중복여부
let isAgree = false;    // 약관 동의 여부

const $password = $('#JoinPwd');
const $passwordConfirm = $('#JoinPwdChk');

// 페이지로드
$(document).ready(function () {
    $password.on('input', function () {
        if ($password.val().length < 8) {
            $password.get(0).setCustomValidity('비밀번호는 8자 이상이어야 합니다.');
        } else {
            $password.get(0).setCustomValidity('');
        }
        $password.get(0).reportValidity();
    });

    // 비밀번호 확인 일치
    $passwordConfirm.on('input', function () {
        if ($passwordConfirm.val() !== $password.val()) {
            $passwordConfirm.get(0).setCustomValidity('비밀번호가 일치하지 않습니다.');
        } else {
            $passwordConfirm.get(0).setCustomValidity('');
        }
        $passwordConfirm.get(0).reportValidity();
    });

    // 비밀번호 보기 토글
    $('.btn-eye').on('click', function () {
        const $input = $(this).siblings('input');
        const $icon  = $(this).find('img');
        const isPassword = $input.attr('type') === 'password';

        $input.attr('type', isPassword ? 'text' : 'password');
        $icon.attr('src', isPassword ? '/img/icons/icon-visible.svg' : '/img/icons/icon-invisible.svg');
    });

    // 값 수정 체크
    $('#JoinUserId').on('input', function () {
        idDuple = false;
    });
    $('#JoinEmail').on('input', function () {
        emailDuple = false;
    });

    // 휴대폰 유효성
    $('#JoinPhone').on('input', function () {
        let phoneNoValue = $(this).val().replace(/[^0-9]/g, '').slice(0, 11);

        if (phoneNoValue.length <= 3) {
            $(this).val(phoneNoValue);
        } else if (phoneNoValue.length <= 7) {
            $(this).val(phoneNoValue.replace(/(\d{3})(\d+)/, '$1-$2'));
        } else {
            $(this).val(phoneNoValue.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3'));
        }

        phoneDuple = false;
        $(this).get(0).setCustomValidity('');
    });

    // 생년월일 유효성
    $('#JoinBirth').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 8);
    });

    // 약관 체크
    $('#JoinCheck').on('change', function () {
        isAgree = $(this).is(':checked');
    });

    // 약관 동의
    $('#JoinTermConfirm').on('click', function () {
        $('#JoinCheck').prop('checked', true);
        isAgree = true;
        $('#JoinTermModal').fadeOut(200);
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

    // 주소검색
    $('#SearchAddrAPI').on('click', function () {
        new daum.Postcode({
            oncomplete: function(data) {
                $('#JoinAddr1').val(data.address);
                $('#JoinAddr2').focus();
            }
        }).open();
    });

});

/*********************************/

// 중복확인
function isDuplicate(type) {
    let data = '';
    let flag = 0;

    if (type === 'id') {
        data = $('#JoinUserId').val().trim();
        flag = 1;
    } else if (type === 'email') {
        if (!$('#JoinEmail').get(0).checkValidity()) {
            $('#JoinEmail').get(0).reportValidity();
            return;
        }

        data = $('#JoinEmail').val().trim();
        flag = 2;
    } else if (type === 'phone') {
        data = $('#JoinPhone').val().trim();

        if(data.length < 11){
            $('#JoinPhone').get(0).setCustomValidity('전화번호 형식이 올바르지 않습니다.');
            $('#JoinPhone').get(0).reportValidity();
            return;
        }
        flag =3;
    }

    if (flag !== 0 && data !== ''){
        $.ajax({
            url     : `/api/join/duplicate?data=${data}&flag=${flag}`,
            method  : 'GET',
            success : function(result){
                const isAvailable = result === 0;

                switch (flag){
                    case 1 :
                        idDuple     = isAvailable;
                        if (idDuple){
                            alert('사용 가능');    
                        } else {
                            alert('중복 아이디');
                        }
                        break;
                    case 2 :
                        emailDuple  = isAvailable;
                        if (emailDuple){
                            alert('사용 가능');
                        } else {
                            alert('중복 이메일');
                        }
                        break;
                    case 3 :
                        phoneDuple  = isAvailable;
                        if (phoneDuple){
                            alert('사용 가능');
                        } else {
                            alert('중복 휴대폰');
                        }
                        break;
                }
            },
            error   : function (xhr, status, error){
                console.warn('중복확인 로직 에러 발생 : ', error);
            }
        });
    } else {
        console.warn('flag 값 이상 : ', flag);
        return;
    }
}

// 회원가입
function register(){
    if (!idDuple || !emailDuple || !phoneDuple || !isAgree){
        console.warn('확인사항 누락');
        return;
    }

    let userId       = $('#JoinUserId'   ).val().trim();
    let userPassword = $('#JoinPwd'      ).val().trim();
    let userName     = $('#JoinUserName' ).val().trim();
    let userGender   = $(":input:radio[name=gender]:checked").val();
    let userBirth    = $('#JoinUserBirth').val().trim();
    let userEmail    = $('#JoinEmail'    ).val().trim();
    let userPhone    = $('#JoinPhone'    ).val().trim();
    let userAddr1    = $('#JoinAddr1'    ).val().trim();
    let userAddr2    = $('#JoinAddr2'    ).val().trim();

    const data = {
        userId       : userId,
        userPassword : userPassword,
        userName     : userName,
        userGender   : userGender,
        userBirth    : userBirth,
        userEmail    : userEmail,
        userPhone    : userPhone,
        userAddr1    : userAddr1,
        userAddr2    : userAddr2
    };

    $.ajax({
        url : '/api/join/register',
        method : 'POST',
        data : data,

        success : function (result){
            if (result === 'SUCCESS'){
                alert('회원가입 성공');
                window.location.href = '/login';
            } else {
                alert('회원가입 실패');
                console.warn('회원가입 실패 : ', result)
            }
        },
        error : function (xhr, status, error){
            console.warn('회원가입중 에러발생 : ', error);
        }
    });
}