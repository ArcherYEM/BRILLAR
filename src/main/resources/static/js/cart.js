$(document).ready(function () {
    $.ajax({
        url: '/cart/list',
        method: 'GET',
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: (data)=>{
            const $productInfo = $('#ProductInfo')
            const $orderInfo = $('#OrderInfo')
            
            let html = `<p class="title-md title-left">
                            장바구니
                        </p>
            `;
            if (data && data.length > 0) {
                $.each(data, (index, dto) => {
                    html += `
                        <div class="product-wrap">
                            <div class="product-item">
                                <input type="hidden" name="cartSeq" value="${dto.cartSeq}">
                                <input type="hidden" name="productSeq" value="${dto.productSeq}">
                                <img src="${dto.imageURL}" alt="제품사진" />
                                <div class="option-wrap">
                                    <p class="product-name">${dto.productName}</p>
                                    <p class="product-option">${dto.materialName}, ${dto.sizeName != null ? dto.sizeName+', ' : ''}요청사항: ${dto.orderMemo != null ? dto.orderMemo : '없음'}</p>
                                </div>
                                <div class="product-quantity">
                                    <span class="quantity-dec" id="QuantityDec">-</span>
                                    <input type="number" class="quantity" name="quantity" max="99" value="${dto.quantity}" />
                                    <span class="quantity-inc" id="QuantityInc">+</span>
                                </div>
                                <div class="product-price">
    
                    `;
    
                    // 할인 품목 일 경우
                    if (dto.discountRate != null) {
                        html += `
                            <span style="color: red;">${dto.discountRate} off</span>
                            <p class="before-sale" style="text-decoration-line: line-through;">₩<span>${dto.price}</span></p>
                            <p>₩<span>${dto.reducedPrice}</span></p>
                        `
                    } else {
                        html += `<p class="before-sale">₩<span>${dto.price}</span></p>`
                    }
    
                    html += `
                                </div>
                            </div>
                        </div>
                    `;
                });

                cartResult();
            } else {
                html += `
                    <div class="product-wrap">
                        <p style="color: rgba(128, 128, 128, 0.438); font-family: 'Inter'; text-align: center; font-size: larger; margin-top: 50px;">장바구니가 비어있습니다</p>
                    </div>
                `;
            }

            $productInfo.html(html);

            // 제품 결제가격 집계
            function cartResult (){
                $.get('/cart/result', (result)=>{
                    html = `
                        <p class="title-sm order-title">주문 내역</p>
                        <div class="order-calc">
                            <div class="order-wrap">
                                <p class="info-title title-sum">합계&nbsp;(<span>${result.totalQuantity != null ? result.totalQuantity : 0}</span>개):</p>
                                <p class="info-value">₩${result.totalPrice != null ? result.totalPrice : 0}</p>
                            </div>
                            <div class="order-wrap order-discount">
                                <p class="info-title">할인:</p>
                                <p class="info-value">-₩${result.totalDiscountPrice != null ? result.totalDiscountPrice : 0}</p>
                            </div>
                        </div>
                        <div class="order-wrap total-wrap">
                            <p class="info-title title-total">결제금액:</p>
                            <p class="info-value value-total">₩${result.totalCost != null ? result.totalCost : 0}</p>
                        </div>
                        <button id="PayContinue" class="btn-secondary">결제하기</button>
                    `;
                    
                    $orderInfo.html(html)
                })
            }

            // 수량 증감 (+ , -)
            $(document).on('click', '.product-wrap #QuantityInc', function () {
                const $input = $(this).siblings('.quantity');
                const $cartSeq = $(this).closest('.product-item').find('input[name="cartSeq"]');
                const $productSeq = $(this).closest('.product-item').find('input[name="productSeq"]');

                let val = parseInt($input.val(), 10);

                $.post("/cart/quantityInc", {cartSeq : $cartSeq.val(), productSeq : $productSeq.val()}, (data)=>{
                    if (data != true) {
                        alert("재고 수량보다 많을 순 없습니다")
                        return
                    }
                    $input.val(val + 1);
                    cartResult();
                })
            });

            $(document).on('click', '.product-wrap #QuantityDec', function () {
                const $input = $(this).siblings('.quantity');
                const $cartSeq = $(this).closest('.product-item').find('input[name="cartSeq"]');
                const $productSeq = $(this).closest('.product-item').find('input[name="productSeq"]');
                const $productWrap = $(this).closest('.product-wrap');

                let val = parseInt($input.val(), 10);

                if (val === 1) {
                    if (confirm("해당 제품을 장바구니에서 제외하시겠습니까?")) {
                        $.post('/cart/delete', {cartSeq : $cartSeq.val(), productSeq : $productSeq.val()}, (result)=>{
                            if (result) {
                                $productWrap.remove();
                                cartResult();
                            } else {
                                alert("삭제에 실패했습니다. 운영팀에 문의해 주세요");
                            }
                        })
                    }
                } else {
                    $.post('/cart/quantityDec', {cartSeq : $cartSeq.val(), productSeq : $productSeq.val()}, (data)=>{
                        if (data != true) {
                            alert("수량이 1보다 작을 순 없습니다")
                            return
                        }
                        $input.val(val - 1);
                        cartResult();
                    })
                }
            });

            // 직접 변경 전 이전 값 저장
            $(document).on('focusin', '.product-wrap .quantity', function () {
                $(this).data('prev', $(this).val());
            })
            
            // 직접 숫자 입력하여 개수 조절
            $(document).on('change', '.product-wrap .quantity', function () {
                const $quantity = $(this);
                const quantityVal = parseInt($quantity.val(), 10)
                const prevVal = $quantity.data('prev')
                const $cartSeq = $(this).closest('.product-item').find('input[name="cartSeq"]');
                const $productSeq = $(this).closest('.product-item').find('input[name="productSeq"]');

                if (isNaN(quantityVal) || quantityVal < 1 || quantityVal > 99) {
                    alert("수량은 1 이상 99 이하로 입력해 주세요.");
                    $quantity.val(prevVal); // 혹은 이전 값 복원
                    return;
                }

                $.post('/cart/quantityChange', {cartSeq : $cartSeq.val(), 
                                                productSeq : $productSeq.val(),
                                                quantity : quantityVal
                }, (data)=>{
                    if (data != true) {
                        alert("입력한 수량이 잘못되었습니다. 재고를 확인해 주세요.")
                        $quantity.val(prevVal)
                        return
                    }
                    
                    $quantity.val(quantityVal)
                    cartResult();
                })
            })
        },
        error: (xhr, status, error)=>{
            console.error(status, error, "아이템 불러오기 실패");
        }
    })

    // 최대 99까지만 입력되도록
    $(document).on('input','.quantity', function () {
        let val = parseInt($(this).val(), 10);
        if (val > 99) {
            $(this).val(99);
        }
    });

    // 받는 사람과 동일 체크박스
    $(document).on('change','#InputSameName', function () {
        const isChecked = $(this).is(':checked');
        const $receiverName = $('#ReceiverName');
        const $senderName = $('#SenderName');

        if (isChecked && $receiverName.val().trim() !== '') {
            $senderName.val($receiverName.val().trim());
        }
    });

    // 결제 확인 모달
    $(document).on('click','#PayContinue', function (e) {
        e.preventDefault();
        $('#PayModal').fadeIn(200);
    });
    $('#PayModalClose, .modal-close, #PayModal').on('click', function (e) {
        if ($(e.target).hasClass('modal') || $(e.target).hasClass('modal-close') || $(e.target).hasClass('btn-warning')) {
            $('#PayModal').fadeOut(200);
        }
    });
});