let page = 1;

$(document).ready(function(){
    getShopList();
    getPageCount();

    $('#MaterialCheckbox input[type="checkbox"]').on('change',function(){
        page = 1;
        getShopList();
        getPageCount();
    })

    //인기순은 아직 미구현
    $('#ShopSelect').on('change',function(){
        getShopList();
    })

    $('#PriceBtn').on('click', function (e) {
        e.preventDefault();
        page = 1;
        getShopList();
        getPageCount();
    })

    $('#MinPrice, #MaxPrice').on('keyup', function(e){
        if (e.which === 13){
            page = 1;
            getShopList();
            getPageCount();
        }
    })

    $('#ShopSearch').on('keyup', function(e){
        if (e.which === 13){
            page = 1;
            getShopList();
            getPageCount();
        }
    })

    $(document).on('click','#ShopPage button',function(){
        $(this).addClass('active').siblings().removeClass('active');
        page = $(this).attr('data-page');
        getShopList();
    })

    // 가격 슬라이더
    initPriceSlider();
})

function getShopList(){
    const text = $('#ShopSearch').val().trim();
    let groupId = window.location.pathname.split('/')[2];
    let materialList = [];
    $('#MaterialCheckbox').find('input[type="checkbox"]:checked').each(function(){
        materialList.push(this.value);
    })
    const minPrice = $('#MinPrice').val().trim();
    const maxPrice = $('#MaxPrice').val().trim();
    const sortValue = $('#ShopSelect').val();
    $.ajax({
        url : '/api/shop/getProducts',
        method : 'GET',
        data: {groupId: groupId, text: text, page: page ,materialList: materialList, minPrice: minPrice, maxPrice: maxPrice, sortValue: sortValue},
        dataType : 'json',
        success: function(data){
            const $itemList = $('#ItemList');
            $itemList.empty();
            $.each(data, function(index, product) {
                const html =
                `<div class="shop-item">
                    <div class="shop-image">
                        <div class="cart-icon">
                            <img src="/img/icons/icon-cart-b.svg" />
                        </div>
                        <a href="/detail/${product.productSeq}"><img class="product-image" src="${product.imageURL}" alt="shop-item" /></a>
                    </div>
                    <div class="shop-name">${product.productName}</div>
                    <div class="shop-product-price">${Number(product.price).toLocaleString()}&nbsp;원</div>
                    <div class="shop-desc">${product.productDesc}</div>
                </div>`
                $itemList.append(html);
                });
            },
        error : function(xhr, status, error){
            console.error('상품 조회 실패:', status, error);
        }
    })
}

function getPageCount(){
    const text = $('#ShopSearch').val().trim();
    let groupId = window.location.pathname.split('/')[2];
    let materialList = [];
    $('#MaterialCheckbox').find('input[type="checkbox"]:checked').each(function(){
        materialList.push(this.value);
    })
    $.ajax({
        url: '/api/shop/count',
        method: 'GET',
        data: {groupId: groupId, text: text, materialList: materialList},
        dataType : 'json',
        success: function(data){
            const $shopPage = $('#ShopPage');
            $shopPage.empty();
            if(data === 0){
                return;
            }
            data = data / 9;
            let html = '';
            if(data > 0){
                for(let i = 0; i < data; i++){
                    if(i == 0){
                        html += `<button class="page-btn active" data-page="${i+1}">${i+1}</button>`;
                        continue;
                    }
                    html += `<button class="page-btn" data-page="${i+1}">${i+1}</button>`;
                }
            }
            $shopPage.append(html);
        },
        error : function(xhr, status, error){
            console.error('상품 조회 실패:', status, error);
        }
    })
}

// 가격 슬라이더
function initPriceSlider(options) {
    const $minSlider = $('#RangeMin');
    const $maxSlider = $('#RangeMax');
    const $minPrice = $('#SliderMin');
    const $maxPrice = $('#SliderMax');
    const $minInput = $('#MinPrice');
    const $maxInput = $('#MaxPrice');

    let maxValue = 1000000 // DB에서 Max값 잡아와서 넣기


    // 초기 세팅
    $minSlider.attr('max', maxValue);
    $maxSlider.attr('max', maxValue);
    $minSlider.val(0);
    $maxSlider.val(maxValue);

    // 값 업데이트
    function updatePrices() {
        let minVal = parseInt($minSlider.val(), 10);
        let maxVal = parseInt($maxSlider.val(), 10);

        if (minVal > maxVal) {
            minVal = maxVal;
            $minSlider.val(minVal);
        }
        if (maxVal < minVal) {
            maxVal = minVal;
            $maxSlider.val(maxVal);
        }

        $minPrice.text(`₩${minVal.toLocaleString()}`);
        $maxPrice.text(`₩${maxVal.toLocaleString()}`);
        $minInput.val(minVal);
        $maxInput.val(maxVal);
    }

    // 이벤트 바인딩
    $minSlider.on('input', updatePrices);
    $maxSlider.on('input', updatePrices);

    // 초기값 렌더링
    updatePrices();
}