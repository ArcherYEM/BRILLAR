// 배너 슬라이드
const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 1000,
    initialSlide: 0,
    autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

$(document).ready(function () {
    // 신상품
    $.ajax({
        url: '/api/main/getProducts',
        method: 'GET',
        dataType: 'json',
        success: async (data)=>{
            const $newList = $('#NewList')
            let html = '';
            for (const dto of data) {
                let stock = 0;
                stock = await $.get('/api/main/chkStock', {productSeq : dto.productSeq})
                
                html += `
                    <div class="new-item">
                        <input id="PSeq" type="hidden" name="productSeq" value="${dto.productSeq}">
                        <div class="new-image">
                            <a href="/detail/${dto.productSeq}"><img src="${dto.imageUrl}" alt="new-item" /></a>
                        </div>
                        <div class="new-name">${dto.productName}</div>
                `
                
                if (stock == 3) {
                    html += `
                        <div>
                            <span class="new-price" style="text-decoration-line: line-through; color: rgba(114, 114, 114, 0.55);">${dto.price} 원</span>
                            <span style="font-weight: 600;"> 품절</span>
                        </div>
                    `
                } else {
                    html += `
                        <div class="new-price">${dto.price} 원</div>
                    `
                };

                html +=`
                        <div class="new-desc">${dto.productDesc}</div>
                    </div>
                `;
    
                $newList.html(html);
            }
        },
        error: (xhr, status, error)=>{
            console.error(status, error);
        }
    })

    // 할인 상품
    const $saleItemList = $('#SaleList');

    $.get('/api/main/getSale', function (saleList) {
        let itemHtml = ''
        $.each(saleList, function (idx, data) {
            itemHtml += `
                <div class="sale-item" style="background-image: url('${data.imageUrl}')">
                    <div class="sale-info-wrap">
                        <div class="sale-info">
                            <div class="sale-discount">${data.discountRate} OFF</div>
                            <div class="sale-name">${data.productName}</div>
                            <div class="sale-price">${data.reducedPrice}원</div>
                        </div>
                        <a href="/detail/${data.productSeq}" class="sale-link">바로가기</a>
                    </div>
                </div>
            `
        })

        $saleItemList.append(itemHtml);
    })
})