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
                        <a href=""><img src="${product.imageURL}" alt="shop-item" /></a>
                    </div>
                    <div class="shop-name">${product.productName}</div>
                    <div class="shop-price">${product.price}</div>
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