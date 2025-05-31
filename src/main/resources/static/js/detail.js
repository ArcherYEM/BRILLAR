$(document).ready(function () {
    const productSeq = window.location.pathname.split('/')[2];
    
    // 제품상세
    $.ajax({
        url: '/detail/info',
        method: 'GET',
        data: {
            productSeq: productSeq
        },
        success: (data) => {
            const $productWrapper = $('#ProductWrapper')
            
            let html = `
                    <div class="image-wrapper">
                        <img src="${data.imageURL}" alt="제품이미지" />
                    </div>
                    <div class="info-wrapper">
                        <div class="title-wrapper">
                            <p class="title-sm title-left">${data.productName}</p>
                            <p class="subtitle">${data.productDesc}</p>
                        </div>
                        <div class="price-wrapper"> 
            `;

                if (data.discountRate != null) {
                    html += `
                        <span class="before-sale" style="text-decoration-line: line-through;">${data.price}원</span>
                        <span style="color: red;"> ${data.discountRate} off</span>
                        <p><span class="after-sale">${data.reducedPrice}</span>원</p>
                    `;
                } else {
                    html += `<p><span class="no-sale">${data.price}</span>원</p>`;
                }
            
                html += `
                        </div>
                        <div class="option-wrapper">
                            <div class="option-item">
                                <label class="option-title">소재</label>
                `;
                
                // 소재 가져오기
                $.get("/detail/material", {productSeq: productSeq}, function (material) {  
                    if (material.length > 1) {
                        html += `
                            <div class="material-box">
                                <select class="shop-select option-select">
                        `;
                        $.each(material, (index, dto) => {
                            html += `
                                <option value="${dto.materialSeq}">${dto.materialName}</option>
                            `;
                        });
                        return html += `
                                </select>
                            </div>
                        `;
                    } else {
                        return html += `<p><span value="${material.materialSeq}">${material.materialName}</span>원</p>`;
                    }
                });
                
                html += `
                        </div>
                            <div class="option-item">
                                <label class="option-title">사이즈 선택</label>
                                <div class="size-box">
                                    <input type="radio" name="size" id="size10" value="10cm" checked hidden>
                                    <label for="size10" class="size-item">10cm</label>
                                    <input type="radio" name="size" id="size12" value="12cm" hidden>
                                    <label for="size12" class="size-item">12cm</label>
                                    <input type="radio" name="size" id="size13" value="13cm" hidden>
                                    <label for="size13" class="size-item">13cm</label>
                                    <input type="radio" name="size" id="size14" value="14cm" hidden>
                                    <label for="size14" class="size-item">14cm</label>
                                    <input type="radio" name="size" id="size15" value="15cm" hidden>
                                    <label for="size15" class="size-item">15cm</label>
                                    <input type="radio" name="size" id="size16" value="16cm" hidden>
                                    <label for="size16" class="size-item">16cm</label>
                                    <input type="radio" name="size" id="size17" value="17cm" hidden>
                                    <label for="size17" class="size-item">17cm</label>
                                    <input type="radio" name="size" id="size18" value="18cm" hidden>
                                    <label for="size18" class="size-item">18cm</label>
                                    <input type="radio" name="size" id="size19" value="19cm" hidden>
                                    <label for="size19" class="size-item">19cm</label>
                                    <input type="radio" name="size" id="size20" value="20cm" hidden>
                                    <label for="size20" class="size-item">20cm</label>
                                </div>
                            </div>
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

            $productWrapper.html(html)

        }
    })
        
    // 확인 모달
    $('#AddCart').on('click', function (e) {
        e.preventDefault();
        $('#CartModal').fadeIn(200);
    });
    $('#CartModalClose, .modal-close, #CartModal').on('click', function (e) {
        if ($(e.target).hasClass('modal') || $(e.target).hasClass('modal-close') || $(e.target).hasClass('btn-warning')) {
            $('#CartModal').fadeOut(200);
        }
    });

    // 요청사항 50자 제한
    $('#RequestText').on('input', function () {
        let content = $(this).val();
        $('#RequestCount').text(content.length);
    });
})