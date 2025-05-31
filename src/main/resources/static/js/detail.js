$(document).ready(function () {
    const productSeq = window.location.pathname.split('/')[2];
    
    // 제품상세
    (async function renderDetail() {
        const detailDto = await $.get('/detail/info', { productSeq: productSeq }) // 제품정보
        const material = await $.get('/detail/material', { productSeq: productSeq }) // 제품소재
        const productSize = await $.get('/detail/size', { groupId: detailDto.groupId }) // 제품사이즈

        const $productWrapper = $('#ProductWrapper')

        console.log("detail 정보 : ",detailDto);

        let html = `
            <div class="image-wrapper">
                <img src="${detailDto.imageURL}" alt="제품이미지" />
            </div>
            <div class="info-wrapper">
                <div class="title-wrapper">
                    <p class="title-sm title-left">${detailDto.productName}</p>
                    <p class="subtitle">${detailDto.productDesc}</p>
                </div>
                <div class="price-wrapper"> 
        `;

        // 할인 유무
        if (detailDto.discountRate != null) {
            html += `
                    <span class="before-sale" style="text-decoration-line: line-through;">${detailDto.price}원</span>
                    <span style="color: red;"> ${detailDto.discountRate} off</span>
                    <p><span class="after-sale">${detailDto.reducedPrice}</span>원</p>
            `;
        } else {
            html += `<p><span class="no-sale">${detailDto.price}</span>원</p>`;
        };
    
        html += `
                </div>
                <div class="option-wrapper">
                    <div class="option-item" id="MaterialOption">
                        <label class="option-title">소재</label>
        `;
                
        // 소재 가져오기
        if (material.length > 1) {
            html += `
                        <div class="material-box">
                            <select class="shop-select option-select" style="font-weight: 600;">
            `;
            $.each(material, (index, dto) => {
                html += `
                            <option value="${dto.materialSeq}">${dto.materialName}</option>
                `;
            });
            html += `
                            </select>
                        </div>
                    </div>
            `;
        } else {
            const onlyOneMaterial = material[0]
            html += `   <p><span style="font-weight: 600;" value="${onlyOneMaterial.materialSeq}">${onlyOneMaterial.materialName}</span></p>
                    </div>
            `;
        };
                
        // 사이즈 가져오기
        if (productSize.length >= 1) {
            html += `
                    <div class="option-item" id="SizeOption">
                        <label class="option-title">사이즈 선택</label>
                        <div class="size-box">
            `;
            $.each(productSize, (index, dto) => {
                if (index == 0) {
                    html += `
                            <input type="radio" name="size" id="size${dto.productSizeSeq}" value="${dto.productSizeSeq}" checked hidden>
                            <label for="size${dto.productSizeSeq}" class="size-item">${dto.sizeName}</label>
                    `
                } else {
                    html += `
                            <input type="radio" name="size" id="size${dto.productSizeSeq}" value="${dto.productSizeSeq}" hidden>
                            <label for="size${dto.productSizeSeq}" class="size-item">${dto.sizeName}</label>
                    `
                }
            });
            html += `   
                        </div>
                    </div>
            `;
        }
        
        html += `

                    <div class="option-item">
                        <div class="request-top">
                            <label class="option-title">요청사항 (50자 이내)</label>
                            <div class="comment-limit">
                                <span id="RequestCount">0</span>/50
                            </div>
                        </div>
                        <div class="request-box">
                            <input id="RequestText" class="request-text" type="text" maxlength="50" />
                        </div>
                    </div>
                </div>
                <button id="AddCart" class="btn-secondary btn-cart">장바구니 담기</button>
                <div class="notice-wrapper">
                    <p>* 개봉 후에는 단순 변심으로 인한 반품 불가입니다.</p>
                    <p>* 배송은 영업일 기준 3일 이내 도착 예정입니다.</p>
                </div>
            </div>
        `;

        $productWrapper.html(html);
    })()
        
    // 확인 모달
    $(document).on('click', '#AddCart', function (e) {
        e.preventDefault();
        $('#CartModal').fadeIn(200);
    });
    $('#CartModalClose, .modal-close, #CartModal').on('click', function (e) {
        if ($(e.target).hasClass('modal') || $(e.target).hasClass('modal-close') || $(e.target).hasClass('btn-warning')) {
            $('#CartModal').fadeOut(200);
        }
    });

    // 요청사항 50자 제한
    $(document).on('input', '#RequestText', function () {
        let content = $(this).val();
        $('#RequestCount').text(content.length);
    });
})