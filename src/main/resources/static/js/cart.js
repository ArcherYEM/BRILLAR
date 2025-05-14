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
            let html = '';
            $.each(data, (index, dto) => {
                html += `
                    <div class="product-wrap">
                        <div class="product-item">
                            <img src="${dto.imageURL}" alt="제품사진" />
                            <div class="option-wrap">
                                <p class="product-name">${dto.productName}</p>
                                <p class="product-option">${dto.materialName}, ${dto.sizeName}, 요청사항: ${dto.orderMemo != null ? dto.orderMemo : '없음'}</p>
                            </div>
                            <div class="product-quantity">
                                <span class="quantity-dec">-</span>
                                <input type="number" class="quantity" max="99" value="${dto.quantity}" />
                                <span class="quantity-inc">+</span>
                            </div>
                            <div class="product-price">

                `

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

            $productInfo.html(html);


            $.get('/cart/result', (result)=>{
                html = `
                    <p class="title-sm order-title">주문 내역</p>
                    <div class="order-calc">
                        <div class="order-wrap">
                            <p class="info-title title-sum">합계&nbsp;(<span>${result.totalQuantity}</span>개):</p>
                            <p class="info-value">₩${result.totalPrice}</p>
                        </div>
                        <div class="order-wrap order-discount">
                            <p class="info-title">할인:</p>
                            <p class="info-value">-₩${result.totalDiscountPrice}</p>
                        </div>
                    </div>
                    <div class="order-wrap total-wrap">
                        <p class="info-title title-total">결제금액:</p>
                        <p class="info-value value-total">₩${result.totalCost}</p>
                    </div>
                    <button id="PayContinue" class="btn-secondary">결제하기</button>
                `
                $orderInfo.html(html)
            })
        },
        error: (xhr, status, error)=>{
            console.error(status, error, "아이템 불러오기 실패");
        }
    })
        
    // 수량 증감
    $(document).on('click','.quantity-inc', function () {
        const $input = $(this).siblings('.quantity');
        let val = parseInt($input.val(), 10);
        if (val < 99) {
            $input.val(val + 1);
        }
    });

    $(document).on('click','.quantity-dec', function () {
        const $input = $(this).siblings('.quantity');
        let val = parseInt($input.val(), 10);
        if (val > 1) {
            $input.val(val - 1);
        }
    });

    // 최대 99까지만 입력되도록
    $('.quantity').on('input', function () {
        let val = parseInt($(this).val(), 10);
        if (isNaN(val) || val < 1) {
            $(this).val(1);
        } else if (val > 99) {
            $(this).val(99);
        }
    });

    // 받는 사람과 동일 체크박스
    $('#InputSameName').on('change', function () {
        const isChecked = $(this).is(':checked');
        const $receiverName = $('#ReceiverName');
        const $senderName = $('#SenderName');

        if (isChecked && $receiverName.val().trim() !== '') {
            $senderName.val($receiverName.val().trim());
        }
    });

    // 결제 확인 모달
    $('#PayContinue').on('click', function (e) {
        e.preventDefault();
        $('#PayModal').fadeIn(200);
    });
    $('#PayModalClose, .modal-close, #PayModal').on('click', function (e) {
        if ($(e.target).hasClass('modal') || $(e.target).hasClass('modal-close') || $(e.target).hasClass('btn-warning')) {
            $('#PayModal').fadeOut(200);
        }
    });
});