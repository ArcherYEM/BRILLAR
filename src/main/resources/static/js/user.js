// 리뷰 더미데이터
const reviewList = [{
    id: 1,
    product: "반지1",
    image: "/img/products/ring/r1.png",
    score: 5,
    date: "2025-01-01",
    link: "/shop/ring/r1",
    name: "김머왕",
    content: "무난하게 일상에서 끼고 다닐 만 합니다.",
    photos: [
        "/img/products/ring/r1.png",
        "/img/products/ring/r2.png"
    ],
}, {
    id: 2,
    product: "반지2",
    image: "/img/products/ring/r2.png",
    score: 4,
    date: "2025-01-01",
    link: "/shop/ring/r2",
    name: "김머왕",
    content: "색상이 사진보다 조금 밝아요.",
    photos: [
        "/img/products/ring/r2.png"
    ],
}, {
    id: 3,
    product: "목걸이3",
    image: "/img/products/necklace/n3.png",
    score: 5,
    date: "2025-01-01",
    link: "/shop/necklace/n3",
    name: "김머왕",
    content: "그냥 무난합니다."
}, {
    id: 4,
    product: "반지4",
    image: "/img/products/ring/r4.png",
    score: 4,
    date: "2025-01-01",
    link: "/shop/ring/r4",
    name: "김머왕",
    content: "색상이 사진보다 조금 밝아요."
}, {
    id: 5,
    product: "반지5",
    image: "/img/products/ring/r5.png",
    score: 5,
    date: "2025-01-01",
    link: "/shop/ring/r5",
    name: "김머왕",
    content: "커플링으로 맞췄습니다."
}]

$(document).ready(function () {
    $.ajax({
        url: '/user/dtoUser',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: (user)=>{
            const $myPageInfo = $('#MyPageInfo')

            const html = `
                    <p class="title-md title-left">
                        계정 정보
                    </p>
                    <div class="info-item account-info">
                        <p class="mypage-title">내 정보</p>
                        <div id="AccountForm" class="account-wrapper">
                            <div class="account-item">
                                <label>아이디</label>
                                <input id="AccountId" class="info-userid" type="text" value="${user.userId}" readonly />
                            </div>
                            <div class="account-item">
                                <label>이름</label>
                                <input id="AccountName" type="text" value="${user.userName}" />
                            </div>
                            <div class="account-item">
                                <label>이메일 주소</label>
                                <div class="input-group">
                                    <input id="AccountEmail" type="email" name="email" value="${user.userEmail}"
                                           placeholder="이메일 주소" required />
                                    <button id="AccountEmailChk" type="button" class="btn-duplicate">중복확인</button>
                                </div>
                            </div>
                            <div class="account-item">
                                <label>핸드폰 번호</label>
                                <div class="input-group">
                                    <input id="AccountPhone" type="text" name="phone" inputmode="numeric"
                                           value="${user.userPhone}" placeholder="휴대폰 번호" required />
                                    <button id="AccountPhoneChk" type="button" class="btn-duplicate">중복확인</button>
                                </div>
                            </div>
                            <div class="submit-btn">
                                <button id="AccountSubmit" type="button" class="btn-secondary btn-submit disabled"
                                        disabled>변경사항
                                    저장</button>
                            </div>
                        </div>
                    </div>
                    <div class="info-item pwd-info">
                        <p class="mypage-title">비밀번호 변경</p>
                        <span id="OpenPwdModal" class="change-pwd">변경하기</span>
                    </div>
                    <div class="info-item address-info">
                        <div class="address-title">
                            <p class="mypage-title">주소</p>
                            <span id="ChangeAddress" class="change-address">편집</span>
                        </div>
                        <div id="AddressContent" class="address-content view-mode">
                            <div class="adderess-group">
                                <input id="EditAddrOne" type="text" value="${user.userAddr1}" readonly />
                                <button id="SerachPostcode" class="search-postcode btn-secondary"
                                        type="button">주소검색</button>
                            </div>
                            <input id="EditAddrTwo" type="text" value="${user.userAddr2}" readonly />
                        </div>
                    </div>
                    <div class="info-item delete-account">
                        <p class="mypage-title">탈퇴하기</p>
                        <p>탈퇴 시에는 회원 정보(계정 정보, 주문 내역, 리뷰)가 삭제되며, 복구가 불가능합니다. 탈퇴 후에는 서비스의 이용이 불가합니다.</p>
                        <div>
                            <button id="OpenDelModal" class="btn-warning">탈퇴하기</button>
                        </div>
                    </div>
                `;

            $myPageInfo.html(html);

            const $submitBtn = $('#AccountSubmit');
            const $accountName = $('#AccountName');
            const $accountEmail = $('#AccountEmail');
            const $accountPhone = $('#AccountPhone');
            const $EditAddrOne = $('#EditAddrOne');
            const $EditAddrTwo = $('#EditAddrTwo');
            
            // 내 정보 변경 감지 (버튼 활성화)
            $(document).on('input','#AccountForm input', function () {
                if (!$(this).is('#AccountId') && !isChanged) {
                    $submitBtn.removeClass('disabled').addClass('active').prop('disabled', false);
                    isChanged = true;
                }
            });

            // 주소 변경 감지 (버튼 활성화)
            $(document).on('input','#AddressContent input', function () {
                if (!isChanged) {
                    $submitBtn.removeClass('disabled').addClass('active').prop('disabled', false);
                    isChanged = true;
                }
            });

            // 주소검색
            $('#SerachPostcode').on('click', function () {
                new daum.Postcode({
                    oncomplete: function(data) {
                        $EditAddrOne.val(data.address);
                        $EditAddrTwo.focus();
                    }
                }).open();
            });

            // 폼 제출
            $submitBtn.on('click', function (e) {
                if (isEmailChanged && !isEmailChecked) {
                    alert('이메일 중복확인을 완료해주세요.');
                    e.preventDefault();
                    return;
                }
                if (isPhoneChanged && !isPhoneChecked) {
                    alert('휴대폰 번호 중복확인을 완료해주세요.');
                    e.preventDefault();
                    return;
                }

                if (confirm('변경사항을 저장하시겠습니까?')) {
                    isChanged = false;
                    $.post("/user/update", {userId:user.userId,
                                            userName:$accountName.val(),
                                            userEmail:$accountEmail.val(),
                                            userPhone:$accountPhone.val(),
                                            userAddr1:$EditAddrOne.val(),
                                            userAddr2:$EditAddrTwo.val()},
                        function () {
                                $submitBtn
                                    .removeClass('active')
                                    .addClass('disabled')
                                    .prop('disabled', true);
                                location.reload()
                        })
                }
            });
        },
        error: (xhr, status, error)=>{
            console.error(status, error);
        }
    })
    
    // 페이지 변경 감지용
    let isChanged = false;
    
    // 내 정보 변경 감지 후 페이지로드 시 확인
    $(window).on('beforeunload', function () {
        if (isChanged) {
            return '변경사항이 저장되지 않았습니다. 이 페이지를 벗어나시겠습니까?';
        }
    });

    // 중복확인 여부
    let isEmailChanged = false;
    let isEmailChecked = false;
    let isPhoneChanged = false;
    let isPhoneChecked = false;
    let emailDuple = false; // 이메일 중복여부
    let phoneDuple = false; // 휴대폰 중복여부

    // 값 수정 시 중복확인 여부 초기화
    $(document).on('input','#AccountEmail', function () {
        isEmailChanged = true;
        isEmailChecked = false;
    });

    // 휴대폰 번호 포맷
    $(document).on('input','#AccountPhone', function () {
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
        isPhoneChanged = true
        isPhoneChecked = false;
        $(this).get(0).setCustomValidity('');
    });

    // 중복확인
    function isDuplicate(type, callback) {
        let data = '';
        let flag = 0;

        if (type === 'email') {
            if (!$('#AccountEmail').get(0).checkValidity()) {
                $('#AccountEmail').get(0).reportValidity();
                return;
            }

            data = $('#AccountEmail').val().trim();
            flag = 2;
        } else if (type === 'phone') {
            data = $('#AccountPhone').val().trim();

            if(data.length < 11){
                $('#AccountPhone').get(0).setCustomValidity('전화번호 형식이 올바르지 않습니다.');
                $('#AccountPhone').get(0).reportValidity();
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
                        case 2 :
                            emailDuple = isAvailable;
                            if (emailDuple){
                                alert('사용 가능한 이메일 주소입니다.');
                                isEmailChecked = true; // 이메일 중복 확인 통과 시
                            } 
                            if(callback) callback(isAvailable); // 이메일 중복 확인 실패 시 현재 정보와 비교
                            break;
                        case 3 :
                            phoneDuple = isAvailable;
                            if (phoneDuple){
                                alert('사용 가능한 휴대폰 번호입니다.');
                                isPhoneChecked = true; // 휴대폰 중복 확인 통과 시
                            }
                            if(callback) callback(isAvailable); // 휴대폰 중복 확인 실패 시 현재 정보와 비교
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

    // 이메일 중복확인
    $(document).on('click', '#AccountEmailChk', function () {
        const $inputEmail = $('#AccountEmail');
        const value = $inputEmail.val().trim();

        if (!value) {
            alert('이메일 주소를 입력해주세요.');
            return;
        }

        if (!$inputEmail.get(0).checkValidity()) {
            $inputEmail.get(0).reportValidity();
            return;
        }

        isDuplicate('email', function (isAvailable) {
            // 현재 이메일과 비교 후 변경점 확인
            if (!isAvailable) {
                $.ajax({
                    url: '/user/checkMyEmail',
                    method: 'GET',
                    xhrFields: {
                        withCredentials: true
                    },
                    data:{
                        userEmail : value
                    },
                    success: function (result) {
                        if (result == true) {
                            alert('현재 사용중인 이메일 주소입니다.');
                            isEmailChecked = true;
                            return
                        } else {
                            alert('이미 사용중인 이메일 주소입니다.');
                            return
                        }
                    }
                })
            }
        })
    });

    // 휴대폰 번호 중복확인
    $(document).on('click', '#AccountPhoneChk', function () {
        const $inputPhone = $('#AccountPhone');
        const value = $inputPhone.val().replace(/-/g, '');

        if (!value) {
            alert('휴대폰 번호를 입력해주세요.');
            return;
        }

        if (value.length < 11) {
            $inputPhone.get(0).setCustomValidity('휴대폰 번호를 올바른 형식으로 입력해주세요.');
            $inputPhone.get(0).reportValidity();
            return;
        }

        isDuplicate('phone', function (isAvailable) {
            // 현재 휴대폰 번호와 비교 후 변경점 확인
            if (!isAvailable) {
                $.ajax({
                    url: '/user/checkMyPhone',
                    method: 'GET',
                    xhrFields: {
                        withCredentials: true
                    },
                    data:{
                        userPhone : $inputPhone.val()
                    },
                    success: function (result) {
                        if (result == true) {
                            alert('현재 사용중인 휴대폰 번호입니다.');
                            isPhoneChecked = true;
                            return
                        } else {
                            alert('이미 사용중인 휴대폰 번호입니다.');
                            return
                        }
                    }
                })
            }
        })
    });

    // 비밀번호 변경
    // 모달 열기
    $(document).on('click', '#OpenPwdModal', function (e) {
        e.preventDefault();
        $('#ChangePwdModal').fadeIn(200);
    });

    // 모달 닫기
    $('#PwdModalClose, #ChangePwdClose, #ChangePwdModal').on('click', function (e) {
        if ($(e.target).hasClass('modal') || $(e.target).hasClass('modal-close') || $(e.target).hasClass('btn-warning')) {
            $('#ChangePwdModal').fadeOut(200);
        }
    });

    // 비밀번호 보기 토글
    $(document).on('click','.btn-eye', function () {
        const $input = $(this).siblings('input');
        const $icon = $(this).find('img');
        const isPassword = $input.attr('type') === 'password';

        $input.attr('type', isPassword ? 'text' : 'password');
        $icon.attr('src', isPassword ? '/img/icons/icon-visible.svg' : '/img/icons/icon-invisible.svg');
    });

    const $OldPwd = $('#OldPwd');
    const $NewPwd = $('#NewPwd');
    const $NewPwdChk = $('#NewPwdChk');
    const $passwordConfirm = $('#NewPwdChk');

    // 비밀번호 유효성 검사
    $NewPwd.on('input', function () {
        if ($NewPwd.val().length < 8) {
            $NewPwd.get(0).setCustomValidity('비밀번호는 8자 이상이어야 합니다.');
        } else {
            $NewPwd.get(0).setCustomValidity('');
        }
        $NewPwd.get(0).reportValidity();
    })

    // 비밀번호 확인 일치 체크
    $passwordConfirm.on('input', function () {
        if ($passwordConfirm.val() !== $NewPwd.val()) {
            $passwordConfirm.get(0).setCustomValidity('비밀번호가 일치하지 않습니다.');
        } else {
            $passwordConfirm.get(0).setCustomValidity('');
        }
        $passwordConfirm.get(0).reportValidity();
    });

    // 비밀번호 변경 적용
    $(document).on('click', '#ChangePwd', function (e) {
        e.preventDefault()

        if (confirm("비밀번호를 변경하시겠습니까?")) {
            $.ajax({
                url: '/user/updatePassword',
                method: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                data:{
                    newPassword : $NewPwdChk.val(),
                    oldPassword : $OldPwd.val(),
                },
                success: function (result) {
                    switch (result) {
                        case 0:
                            alert("error : 해당 비밀번호가 존재하지 않습니다")
                            return
                        case 2:
                            alert("새 비밀번호는 기존 비밀번호와 다르게 작성해야합니다")
                            return
                        case -1:
                            alert("기존 비밀번호를 확인해 주세요")
                            return
                        case 1:
                            alert("변경이 완료되었습니다")
                            location.reload()
                            break;
                    }
                },
                error: (xhr, status, error)=>{
                    console.error(status, error);
                }
            })
        }
    })

    // 주소 변경
    $(document).on('click','#ChangeAddress', function () {
        const $container = $('#AddressContent');
        const isViewMode = $container.hasClass('view-mode');

        if (isViewMode) {
            // 편집 모드로 전환
            $container.removeClass('view-mode').addClass('edit-mode');
            $('#ChangeAddress').text('완료');

            $container.find('input').prop('readonly', false);
            $('#SerachPostcode').show();
        } else {
            // 보기 모드로 전환
            $container.removeClass('edit-mode').addClass('view-mode');
            $('#ChangeAddress').text('편집');

            $container.find('input').prop('readonly', true);
            $('#SerachPostcode').hide();
        }
    });


    // 탈퇴
    // 모달 열기
    $(document).on('click', '#OpenDelModal', function (e) {
        e.preventDefault();
        $('#DelAcctModal').fadeIn(200);
    });

    // 회원탈퇴 확인
    $(document).on('click', '#DelAcctModal #DelAcct', function (e){
        e.preventDefault();

        $.ajax({
            url: '/user/sessionUser',
            type: 'GET',
            success: function (user) {
                const $DelAcctModal = $('#DelAcctModal')
                let html = `
                        <div class="modal-wrapper">
                            <span id="PwdModalClose" class="modal-close">&times;</span>
                            <p class="modal-title">회원 탈퇴</p>
                            <p class="modal-subtitle" style="color: red;">※회원탈퇴를 완료하시려면 비밀번호를 입력해주세요</p>
                            <div class="modal-content">
                                탈퇴 시에는 회원 정보(계정 정보, 주문 내역, 리뷰)가 삭제되며, 복구가 불가능합니다. 탈퇴 후에는 서비스의 이용이 불가합니다. 정말로 탈퇴하시겠습니까?
                                <br>
                                <input type="password" name="userPassword" id="UserPassword" placeholder="비밀번호" required>
                            </div>
                            <div class="modal-buttons">
                                <button type="button" id="CurrentDelAcct" class="btn-primary">확인</button>
                                <button type="button" id="DelAcctClose" class="btn-warning">취소</button>
                            </div>
                        </div>
                    `

                $DelAcctModal.html(html);

                const $UserPassword = $('#UserPassword')
                const $CurrentDelAcct = $('#DelAcctModal #CurrentDelAcct')

                // 비밀번호 입력 후 최종결정
                $CurrentDelAcct.on('click', function (e){
                    e.preventDefault();

                    $.post("/user/delete", {userId : user.userId, userPassword : $UserPassword.val()}, function (data) {
                        if (data != 1) {
                            alert("비밀번호가 틀렸습니다 확인해주세요")
                            return
                        }
                        alert("회원 탈퇴가 완료되었습니다 이용해주셔서 감사합니다")
                        $.post("/login/logout")
                        window.location.href = "/";
                    })
                })
            }
        })
    })

    // 모달 닫기
    $('#DelAcctClose, .modal-close, #DelAcctModal').on('click', function (e) {
        if ($(e.target).hasClass('modal') || $(e.target).hasClass('modal-close') || $(e.target).hasClass('btn-warning')) {
            $('#DelAcctModal').fadeOut(200);
        }
    });


    // 작성 리뷰 리스트
    const $container = $('#ReviewContainer');

    reviewList.forEach((review, index) => {
        let photoHtml = '';

        if (Array.isArray(review.photos) && review.photos.length > 0) {
            photoHtml = `
				<div class="review-photos">
					${review.photos.map(src => `<img src="${src}" class="review-photo" alt="상품 이미지">`).join('')}
				</div>`;
        }

        const reviewHtml = `
				<div id="ReviewItem" class="review-item">
					<div class="review-summary">
						<img src="${review.image}" alt="${review.product}" class="review-image">
						<span class="review-title">${review.product}</span>
						<div class="review-stars">${'★'.repeat(review.score)}${'☆'.repeat(5 - review.score)}</div>
						<img src="/img/icons/icon-arrow.svg" class="review-arrow" data-index="${index}">
					</div>
					<div id="ReviewDetail" class="review-detail" style="display: none;">
						<div class="detail-content">
							<div class="detail-summary">
								<div class="detail-stars">${'★'.repeat(review.score)}${'☆'.repeat(5 - review.score)}</div>
								<p class="detail-name">${review.name}</p>
								<p class="detail-date">${review.date}</p>
								</div>
							<div class="detail-review">
								<p class="detail-product"><a href="${review.link}" target="_blank">${review.product}</a></p>
								<p>${review.content}</p>
								${photoHtml}
							</div>
						</div>
						<div class="delete-review">
							<button class="btn-warning">삭제하기</button>
						</div>
					</div>
				</div>
			`;
        $container.append(reviewHtml);
    });

    // 리뷰 상세 아코디언
    $container.on('click', '.review-arrow', function () {
        const $arrow = $(this);
        const $detail = $arrow.closest('.review-item').find('.review-detail');

        $detail.stop(true, true).slideToggle(200);
        $arrow.toggleClass('rotated');
    });


});