$(document).ready(function(){
    getShopList();
    //인기순은 아직 미구현
    $('#MaterialCheckbox input[type="checkbox"],#ShopSelect').on('change',function(){
        getShopList();
    })

    $('#MinPrice, #MaxPrice, #ShopSearch').on('keyup', function(e){
        if (e.which === 13){
            getShopList();
        }
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
        data: {groupId: groupId, text: text, materialList: materialList, minPrice: minPrice, maxPrice: maxPrice, sortValue: sortValue},
        dataType : 'json',
        success: function(data){
        console.log(data);
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