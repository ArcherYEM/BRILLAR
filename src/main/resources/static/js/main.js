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

// 더미데이터
const products = [{
        id: 1,
        name: "골드 체인 팔찌1",
        price: "20,000원",
        desc: "고급스러운 골드 체인 팔찌",
        image: "../img/products/bracelet/b1.png",
        link: "/shop/bracelet/1"
    },
    {
        id: 2,
        name: "골드 체인 팔찌2",
        price: "25,000원",
        desc: "고급스러운 골드 체인 팔찌",
        image: "../img/products/bracelet/b1.png",
        link: "/shop/bracelet/1"
    },
    {
        id: 3,
        name: "골드 체인 팔찌3",
        price: "10,000원",
        desc: "고급스러운 골드 체인 팔찌",
        image: "../img/products/bracelet/b1.png",
        link: "/shop/bracelet/1"
    },
    {
        id: 4,
        name: "골드 체인 팔찌4",
        price: "20,000원",
        desc: "고급스러운 골드 체인 팔찌",
        image: "../img/products/bracelet/b1.png",
        link: "/shop/bracelet/1"
    },
    {
        id: 5,
        name: "골드 체인 팔찌5",
        price: "23,000원",
        desc: "고급스러운 골드 체인 팔찌",
        image: "../img/products/bracelet/b1.png",
        link: "/shop/bracelet/1"
    },
    {
        id: 6,
        name: "골드 체인 팔찌6",
        price: "20,000원",
        desc: "고급스러운 골드 체인 팔찌",
        image: "../img/products/bracelet/b1.png",
        link: "/shop/bracelet/1"
    },]

const saleProducts = [{
        id: 1,
        name: "루비 실버 물방울 귀걸이",
        price: "20,000원",
        discount: "15% OFF",
        image: "../img/products/earring/e4.png",
        link: "/shop/bracelet/1"
    },
    {
        id: 2,
        name: "더블링 실버 반지",
        price: "25,000원",
        discount: "5% OFF",
        image: "../img/products/ring/r4.png",
        link: "/shop/bracelet/1"
    },
    {
        id: 3,
        name: "골드 LOVE 목걸이",
        price: "10,000원",
        discount: "15% OFF",
        image: "../img/products/necklace/n3.png",
        link: "/shop/bracelet/1"
    },]

$(document).ready(function () {
    // 신상품
    // const $newItemList = $('#new-list');

    // $.each(products, function (i, product) {
    //     const itemHtml = `
    //         <div class="new-item">
    //             <div class="new-image">
    //                 <a href="${product.link}"><img src="${product.image}" alt="new-item" /></a>
    //             </div>
    //             <div class="new-name">${product.name}</div>
    //             <div class="new-price">${product.price}</div>
    //             <div class="new-desc">${product.desc}</div>
    //         </div>
    //         `
    //     $newItemList.append(itemHtml);
    // })

    // 할인 상품
    const $saleItemList = $('#SaleList');

    $.each(saleProducts, function (i, product) {
        const itemHtml = `
            <div class="sale-item" style="background-image: url('${product.image}')">
                <div class="sale-info-wrap">
                    <div class="sale-info">
                        <div class="sale-discount">${product.discount}</div>
                        <div class="sale-name">${product.name}</div>
                        <div class="sale-price">${product.price}</div>
                    </div>
                    <a href="${product.link}" class="sale-link">바로가기</a>
                </div>
            </div>
            `
        $saleItemList.append(itemHtml);
    })
})

const pageLoaded = () => {
    $.ajax({
        url: '/api/main/getProducts',
        method: 'GET',
        dataType: 'json',
        success: (data)=>{
            const $newList = $('#NewList')
            let html = '';
            $.each(data, function(index, dto) {
                html += `
                    <div class="new-item">
                        <input id="PSeq" type="hidden" name="productId" value="${dto.productId}">
                        <div class="new-image">
                            <a href=""><img src="${dto.imageUrl}" alt="new-item" /></a>
                        </div>
                        <div class="new-name">${dto.productName}</div>
                        <div class="new-price">${dto.price} 원</div>
                        <div class="new-desc">${dto.productDesc}</div>
                    </div>
                `;
            });

            $newList.html(html);
        },
        error: (xhr, status, error)=>{
            console.error(status, error);
        }
    });
};

pageLoaded();