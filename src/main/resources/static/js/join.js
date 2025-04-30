$(document).ready(function () {
    // 중복확인 여부
    let isUserIdChecked = false;
    let isEmailChecked = false;
    let isPhoneChecked = false;

    // 값 수정 시 중복확인 여부 초기화
    $('#JoinUserId').on('input', function () {
        isUserIdChecked = false;
    });
    $('#JoinEmail').on('input', function () {
        isEmailChecked = false;
    });

    // 비밀번호 보기 토글
    $('.btn-eye').on('click', function () {
        const $input = $(this).siblings('input');
        const $icon = $(this).find('img');
        const isPassword = $input.attr('type') === 'password';

        $input.attr('type', isPassword ? 'text' : 'password');
        $icon.attr('src', isPassword ? '/img/icons/icon-visible.svg' : '/img/icons/icon-invisible.svg');
    });


    // <!--   중복체크 + 번호 포맷 처리-->
    $('#JoinPhone').on('input', function () {
        let phoneNoValue = $(this).val().replace(/[^0-9]/g, '').slice(0, 11);

        if (phoneNoValue.length <= 3) {
            $(this).val(phoneNoValue);
        } else if (phoneNoValue.length <= 7) {
            $(this).val(phoneNoValue.replace(/(\d{3})(\d+)/, '$1-$2'));
        } else {
            $(this).val(phoneNoValue.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3'));
        }

        isPhoneChecked = false; // 중복확인 초기화
        $(this).get(0).setCustomValidity('');
    });



    // 아이디 중복확인
    $('#DuplicateUserId').on('click', function () {
        // const $input = $('#join-userid');
        // const value = $input.val().trim();
        const value = $('#JoinUserId').val().trim();
        if (!value)return alert('아이디를 입력해주세요.');

            $.ajax({
                url: '/check/userId',
                method: 'GET',
                data: {value},
                success: function (exists){
                    if(exists) alert("이미 사용중인 아이디입니다.");
                    else{
                        alert("사용 가능한 아이디입니다.");
                        isUserIdChecked = true;
                    }
                },
                error: () => alert('중복확인 요청 실패')
            })
    });


    // 이메일 중복확인
    $('#DuplicateEmail').on('click', function () {
        const value = $('#JoinEmail').val().trim();

        if (!value) {
            alert('이메일 주소를 입력해주세요.');
            return;
        }

        if (!$('#JoinEmail').get(0).checkValidity()) {
            $('#JoinEmail').get(0).reportValidity();
            return;
        }

        $.ajax({
            url: '/check/email',
            method: 'GET',
            data: { value },
            success: function (exists) {
                if (exists) {
                    alert('이미 사용중인 메일입니다.');
                } else {
                    alert('사용 가능한 메일입니다.');
                    isEmailChecked = true;
                }
            },
            error: () => alert('중복확인 요청 실패')
        });
    });
    // $('#DuplicateEmail').on('click', function () {
    //
    //     const value = $('#JoinEmail').val().trim();
    //     if(!value) return;alert('이메일 주소를  입력해주세요 ')
    //     if(!$('#JoinEmail').get(0).checkValidity()){
    //     $('#JoinEmail').get(0).reportValidity();
    //     return;
    //     }
    //     $.ajax({
    //         url: '/check/email',
    //         method: 'GET',
    //         data: {value},
    //         success: function (exists){
    //             if(exists) alert('이미 사용중인 메일입니다.');
    //             else {
    //                 alert('사용 가능한 메일입니다.');
    //                 isEmailChecked = true;
    //             }
    //         },
    //         error: ()=> alert('중복확인 요청 실패')
    //     })
    //
    // });

    // 휴대폰 번호 중복확인
    $('#DuplicatePhone').on('click', function (){
    const value = $('#JoinPhone').val().replace(/-/g,'');
    if(!value) return alert('전화번호를 입력해주세요');
    if(value.length < 11){
        $('#JoinPhone').get(0).setCustomValidity('전화번호 형식이 올바르지 않습니다.');
        $('#JoinPhone').get(0).reportValidity();
        return;
    }
    $.ajax({
        url: '/check/phone',
        method: 'GET',
        data: {value},
        success: function (exists){
            if(exists) alert('이미 사용중인 전화번호입니다.');
            else{
                alert('사용 가능한 전화번호입니다.');
                isPhoneChecked = true;
            }
        },
        error: () => alert('중복확인 요청 실패')
    });
    });


    // 비밀번호
    // const $password = $('#join-pwd');
    // const $passwordConfirm = $('#join-pwd-chk');

    // // 비밀번호 유효성 검사
    // $password.on('input', function () {
    //     if ($password.val().length < 8) {
    //         $password.get(0).setCustomValidity('비밀번호는 8자 이상이어야 합니다.');
    //     } else {
    //         $password.get(0).setCustomValidity('');
    //     }
    //     $password.get(0).reportValidity();
    // })
    //     //비밀번호 일치 확인
    //     function checkPasswordMatch(){
    //         const pwd = $('input[name="userPassword"]').val();
    //         const confirmPwd = $('input[name="userPasswordConfirm"]').val();
    //
    //         if (pwd !== confirmPwd){
    //             alert("비밀번호가 일치하지 않습니다.");
    //         }else{
    //             alert("비밀번호가 일치합니다.");
    //         }
    //     }

        // 비밀번호 확인 일치 검사
    // $passwordConfirm.on('input', function () {
    //     if ($passwordConfirm.val() !== $password.val()) {
    //         $passwordConfirm.get(0).setCustomValidity('비밀번호가 일치하지 않습니다.');
    //     } else {
    //         $passwordConfirm.get(0).setCustomValidity('');
    //     }
    //     $passwordConfirm.get(0).reportValidity();
    // });
    // 비밀번호 확인 일치 체크
    // $passwordConfirm.on('input', function () {
    //     if ($passwordConfirm.val() !== $password.val()) {
    //         $passwordConfirm.get(0).setCustomValidity('비밀번호가 일치하지 않습니다.');
    //     } else {
    //         $passwordConfirm.get(0).setCustomValidity('');
    //     }
    //     $passwordConfirm.get(0).reportValidity();
    // });

    //     //회원가입 버튼 클릭
    //     $('#duplicate-userid').on('click', function (){
    //         alert("회원가입 요청");
    //
    //         //이 안에서 비밀번호 일치 검사도 같이 호출
    //         checkPasswordMatch();
    //     })
    // })

    // 비밀번호 유효성 검사
    const $password = $('#JoinPwd');
    const $passwordConfirm = $('#JoinPwdChk');

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



    // 폼 제출
    $('#JoinForm').on('submit', function (e) {
        const $form = $(this);
        let isValid = true;

        if (!isUserIdChecked) {
            alert('아이디 중복확인을 완료해주세요.');
            e.preventDefault();
            return;
        }
        if (!isEmailChecked) {
            alert('이메일 중복확인을 완료해주세요.');
            e.preventDefault();
            return;
        }
        if (!isPhoneChecked) {
            alert('휴대폰 번호 중복확인을 완료해주세요.');
            e.preventDefault();
            return;
        }

        // 약관 동의 체크
        const isChecked = $form.find('#JoinCheck').is(':checked');
        if (!isChecked) {
            alert('개인정보 수집 및 이용약관에 동의해주세요.');
            e.preventDefault();
            return;
        }

        // 휴대폰 번호 하이픈 제거
        // const $phoneInput = $('#JoinPhone');
        // const purePhone = $phoneInput.val().replace(/-/g, '');
        const phone = $('#JoinPhone').val().replace(/-/g, '');
        $('#JoinPhone').val(phone);
        return true;
    });

    // 약관 모달 열기
    $('#TermText').on('click', function (e) {
        e.preventDefault();
        $('#JoinTermModal').fadeIn(200);
    });
});


