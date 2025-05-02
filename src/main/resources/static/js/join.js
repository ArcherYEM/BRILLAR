$(document).ready(function () {
    // 중복확인 여부
    let isUserIdChecked = false;
    let isEmailChecked = false;
    let isPhoneChecked = false;

    // 값 수정 시 중복확인 여부 초기화
    $('#join-userid').on('input', function () {
        isUserIdChecked = false;
    });
    $('#join-email').on('input', function () {
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

    // 휴대폰 번호 포맷
    $('#join-phone').on('input', function () {
        let phoneNoValue = $(this).val().replace(/[^0-9]/g, '');
        phoneNoValue = phoneNoValue.slice(0, 11);

        if (phoneNoValue.length <= 3) {
            $(this).val(phoneNoValue);
        } else if (phoneNoValue.length <= 7) {
            $(this).val(phoneNoValue.replace(/(\d{3})(\d+)/, '$1-$2'));
        } else {
            $(this).val(phoneNoValue.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3'));
        }

        // 번호 수정시 중복확인 상태 초기화
        isPhoneChecked = false;
        $(this).get(0).setCustomValidity('');
    });


    // 아이디 중복확인
    $('#duplicate-userid').on('click', function () {
        const $input = $('#join-userid');
        const value = $input.val().trim();

        if (!value) {
            alert('아이디를 입력해주세요.');
            return;
        }

        setTimeout(() => {
            if (value.toLowerCase() === 'test') {
                alert('이미 사용중인 아이디입니다.');
            } else {
                alert('사용 가능한 아이디입니다.');
                isUserIdChecked = true;
            }
        }, 300);
    });

    // 이메일 중복확인
    $('#duplicate-email').on('click', function () {
        const $input = $('#join-email');
        const value = $input.val().trim();

        if (!value) {
            alert('이메일 주소를 입력해주세요.');
            return;
        }

        if (!$input.get(0).checkValidity()) {
            $input.get(0).reportValidity();
            return;
        }

        setTimeout(() => {
            if (value.toLowerCase() === 'test@test.com') {
                alert('이미 사용중인 이메일 주소입니다.');
            } else {
                alert('사용 가능한 이메일 주소입니다.');
                isEmailChecked = true;
            }
        }, 300);
    });

    // 휴대폰 번호 중복확인
    $('#duplicate-phone').on('click', function () {
        const $input = $('#join-phone');
        const value = $input.val().replace(/-/g, '');

        if (!value) {
            alert('휴대폰 번호를 입력해주세요.');
            return;
        }

        if (value.length < 11) {
            $input.get(0).setCustomValidity('휴대폰 번호를 올바른 형식으로 입력해주세요.');
            $input.get(0).reportValidity();
            return;
        }

        setTimeout(() => {
            if (value === '00000000000') {
                alert('이미 사용중인 휴대폰 번호입니다.');
            } else {
                alert('사용 가능한 휴대폰 번호입니다.');
                isPhoneChecked = true;
            }
        }, 300);
    });


    // 비밀번호
    const $password = $('#join-pwd');
    const $passwordConfirm = $('#join-pwd-chk');

    // 비밀번호 유효성 검사
    $password.on('input', function () {
        if ($password.val().length < 8) {
            $password.get(0).setCustomValidity('비밀번호는 8자 이상이어야 합니다.');
        } else {
            $password.get(0).setCustomValidity('');
        }
        $password.get(0).reportValidity();
    })

    // 비밀번호 확인 일치 체크
    $passwordConfirm.on('input', function () {
        if ($passwordConfirm.val() !== $password.val()) {
            $passwordConfirm.get(0).setCustomValidity('비밀번호가 일치하지 않습니다.');
        } else {
            $passwordConfirm.get(0).setCustomValidity('');
        }
        $passwordConfirm.get(0).reportValidity();
    });

    // 폼 제출
    $('#JoinSubmit').on('click', function (e) {
        const $form = $('#JoinForm');
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
        const isChecked = $form.find('#join-check').is(':checked');
        if (!isChecked) {
            alert('개인정보 수집 및 이용약관에 동의해주세요.');
            e.preventDefault();
            return;
        }

        // 휴대폰 번호 하이픈 제거
        const $phoneInput = $('#join-phone');
        const purePhone = $phoneInput.val().replace(/-/g, '');
    });

    // 약관 모달 열기
    $('#term-text').on('click', function (e) {
        e.preventDefault();
        $('#join-terms-modal').fadeIn(200);
    });

    // 약관 모달 닫기
    $('#join-modal-close, #join-term-close, #join-terms-modal').on('click', function (e) {
        if ($(e.target).hasClass('modal') || $(e.target).hasClass('modal-close') || $(e.target).hasClass('btn-warning')) {
            $('#join-terms-modal').fadeOut(200);
        }
    });

    // 모달 확인 버튼 클릭
    $('#join-term-confirm').on('click', function () {
        $('#join-check').prop('checked', true);
        $('#join-terms-modal').fadeOut(200);
    });
});