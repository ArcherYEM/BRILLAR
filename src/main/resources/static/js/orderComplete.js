$(document).ready(function() {
    const orderSeq = window.location.pathname.split('/')[2];
    
    (async function renderOrder() {
        const order = await $.get('/orderComplete/myOrder', {orderSeq : orderSeq})
        const detail = await $.get('/orderComplete/myItem', {orderSeq : orderSeq})

        const $completeContent = $('#CompleteContent')

        $('#OrderNumber').html(`Order&nbsp;<span>#${orderSeq}</span>`)

        let html = `
            <div class="complete-item complete-product">
                <div class="complete-title">품목</div>
        `;

        console.log(detail);
        
        
        $.each(detail, (idx, item) => {
            html += `
                <div class="product-wrap">
                    <div class="product-item">
                        <img src=${item.imageURL} alt="제품사진" />
                        <div class="option-wrap">
                            <p class="product-name">${item.productName}</p>
                            <p class="product-option">${item.materialName}, ${item.sizeName != null ? item.sizeName+', ' : ''}요청사항: ${item.orderMemo != null ? item.orderMemo : '없음'}</p>
                        </div>
                        <p class="product-quantity">x&nbsp;<span>${item.count}</span></p>
                    </div>
                </div>
            `;
        })
        
        html += `
            </div>
            <div class="complete-item complete-address">
                <div class="complete-title">배송 주소</div>
                <div class="complete-desc">
                    <p>${order.addr1}</p>
                    <p>${order.addr2}</p>
                </div>
            </div>
            <div class="complete-item complete-shipping">
                <div class="complete-title">받는 분 성함</div>
                <div class="complete-desc">
                    <p>${order.receiveName}</p>
                </div>
            </div>
            <div class="complete-item complete-total">
                <div class="complete-title">결제금액</div>
                <div class="complete-desc">
                    <p>₩${order.amount}</p>
                </div>
            </div>
        `;

        $completeContent.html(html)
    })();
})