cancelOrderSeq = 0;
let pageCount = 0;

$(document).ready(function(){

    const path = window.location.pathname;
    const parts = path.split('/');

    if(parts[2] == 'order-status'){
        getOrderStateList();
        getPageBtn(3, true);
    }

    if(parts[2] == 'order-history'){
        getOrderHistory();
        getPageBtn(5, false);
    }

    //리뷰 상세 아코디언
    $('#StateContainer').on('click', '.order-arrow', function () {
        const $arrow = $(this);
        const $detail = $arrow.closest('.order-item').find('.order-detail');

        $detail.stop(true, true).slideToggle(200);
        $arrow.toggleClass('rotated');
    });

    // 주문 취소 모달
    $(document).on('click', '.open-cancel-modal', function () {
        const orderNum = $(this).data('order');
        $('#CanOrdModal').fadeIn(200);
        $('#CanOrdModal .modal-subtitle').text(`주문번호 ${orderNum}에 대한 주문을 취소하시겠습니까?`);
        cancelOrderSeq = $(this).attr('data-order');
    });

    $('#OrdCloseBtn, .modal-close, #CanOrdModal').on('click', function (e) {
        if ($(e.target).hasClass('modal') || $(e.target).hasClass('modal-close') || $(e.target).hasClass('btn-warning')) {
            $('#CanOrdModal').fadeOut(200);
        }
    });

    $('#OrdCancel').on('click', function(){
        cancelOrder();
    })

    // 리뷰 모달
    // 작성 시 편의를 위해서 모달 외부 클릭 시 꺼지는 기능은 제외함
    $(document).on('click', '.open-cancel-modal', function () {
        const orderNum = $(this).data('order');

        // 초기화
        $('#ReviewText').val('');
        $('#ReviewCount').text(0);
        selectedRating = 0;
        updateStars(selectedRating);

        $('#ReviewModal').fadeIn(200);
        $('#ReviewModal .modal-subtitle').text(`주문번호 ${orderNum}에 대한 리뷰를 작성하세요`);
    });

    $('#ReviewClose, .modal-close').on('click', function (e) {
        if ($(e.target).hasClass('modal') || $(e.target).hasClass('modal-close') || $(e.target).hasClass('btn-warning')) {
            $('#ReviewModal').fadeOut(200);
        }
    });

    // 리뷰 별점 매기기
    let selectedRating = 0;
    let isDragging = false;

    $(document).on('click', '.star', function () {
        selectedRating = parseInt($(this).data('rating'));
        updateStars(selectedRating);
    });
    $(document).on('mousedown', '.star-rating', function () {
        isDragging = true;
    });
    $(document).on('mouseup', function () {
        isDragging = false;
    });
    $(document).on('mousemove', function (e) {
        if (!isDragging) return;
        const $stars = $('.star');
        $stars.each(function () {
            const offset = $(this).offset();
            const width = $(this).width();
            if (e.pageX >= offset.left && e.pageX <= offset.left + width) {
                const newRating = parseInt($(this).data('rating'));
                if (selectedRating !== newRating) {
                    selectedRating = newRating;
                    updateStars(selectedRating);
                }
            }
        });
    });

    function updateStars(rating) {
        $('.star').each(function () {
            const starVal = parseInt($(this).data('rating'));
            $(this).toggleClass('active', starVal <= rating);
            $(this).text(starVal <= rating ? '★' : '☆');
        });
    }

    // 리뷰 글자수 제한
    $('#ReviewText').on('input', function () {
        let content = $(this).val();
        $('#ReviewCount').text(content.length);
    });

    $(document).on('click','#FirstBtn',function(){
        const nowPage = $('.page-btn.active').attr('data-page');
        if(nowPage == 1){
            return;
        }
        $('.page-btn[data-page]').removeClass('active').first().addClass('active');
        if(parts[2] == 'order-status'){
            getOrderStateList(1);
        }
        if(parts[2] == 'order-history'){
            getOrderHistory(1);
        }
    })

    //페이지 번호 클릭시 해당 페이지값 보여주기
    $(document).on('click','#OrderPage button',function(){
        const page = $(this).attr('data-page');
        if(!page){
            return;
        }
        $(this).addClass('active').siblings().removeClass('active');
        if(parts[2] == 'order-status'){
            getOrderStateList(page);
        }
        if(parts[2] == 'order-history'){
            getOrderHistory(page);
        }
    })

    // >> 버튼 클릭시 마지막 페이지값 보여주기
    $(document).on('click', '#LastBtn', function(){
        const nowPage = $('.page-btn.active').attr('data-page');
        if(nowPage == pageCount){
            return;
        }
        $('.page-btn[data-page]').removeClass('active').last().addClass('active');
        if(parts[2] == 'order-status'){
            getOrderStateList(pageCount);
        }
        if(parts[2] == 'order-history'){
            getOrderHistory(pageCount);
        }
    })

    $(document).on('click','#prevBtn',function(){
        const nowPage = $('.page-btn.active').attr('data-page');
        if(nowPage == 1){
            return;
        }
        $(`.page-btn[data-page="${nowPage - 1}"]`).addClass('active').siblings().removeClass('active');
        if(parts[2] == 'order-status'){
            getOrderStateList(nowPage - 1);
        }
        if(parts[2] == 'order-history'){
            getOrderHistory(nowPage - 1);
        }
    })

    $(document).on('click','#NextBtn',function(){
        const nowPage = Number($('.page-btn.active').attr('data-page'));
        if(nowPage == pageCount){
            return;
        }
        $(`.page-btn[data-page="${nowPage + 1}"]`).addClass('active').siblings().removeClass('active');
        if(parts[2] == 'order-status'){
            getOrderStateList(nowPage + 1);
        }
        if(parts[2] == 'order-history'){
            getOrderHistory(nowPage + 1);
        }
    })

})

function getOrderStateList(page){
    const limit = 3;
    if(!page){
        page = 1;
    }
    const offset = (page -1) * 3;
    $.ajax({
        url: '/api/order-state/list',
        method: 'get',
        data: {offset: offset, limit: limit, statusCode: true},
        success: function(stateList){

        if(!stateList){
            return;
        }

        const $container = $('#StateContainer');
        const stepLabels = ['입금대기','확인중', '배송중'];

        $container.empty();
        stateList.forEach((state, index) => {

        if(state.statusName == '입금대기'){
            stateVal = 0;
        }else if(state.statusName == '주문확인'){
            stateVal = 1;
        }else{
            stateVal = 2;
        }
            const stateHtml = `
					<div id="StateItem" class="order-item" data-seq="${state.orderSeq}">
						<div class="order-summary">
							<div class="order-col col-num">${index + 1 + (page-1) * 3}</div>
							<div class="order-col col-date">${state.orderDate}</div>
							<div class="order-col col-state">${stepLabels[stateVal]}</div>
							<div class="order-col col-total">${state.amount}</div>
							<div class="order-col col-thumb">
								${state.orderProductDtos.map(product => `<img src="${product.imageURL}" class="order-photo" alt="상품 이미지">`).join('')}
							</div>
							<img src="/img/icons/icon-arrow.svg" class="order-arrow" data-index="${index}">
						</div>
						<div id="StateDetail" class="order-detail" style="display: none;">
							<div class="order-content">
								<div class="order-product">
									<p class="title-xs title-left">상품 정보</p>
									<div class="product-wrap">
									${state.orderProductDtos.map(product => `
										<div class="product-item">
											<img src=${product.imageURL} alt="상품 이미지" />
											<div class="product-info">
												<p>${product.productName}</p>
												<p>₩${product.unitPrice}</p>
												<p class="product-quantity">수량: ${product.count}</p>
											</div>
										</div>`).join('')}
									</div>
								</div>
								<div class="detail-order">
									<p class="title-xs title-left">배송 정보</p>
									<div class="product-wrap">
										<div class="shipping-info">
											<p class="shipping-title">받는 분 성함</p>
											<p>${state.receiveName}</p>
										</div>
										<div class="shipping-info">
											<p class="shipping-title">주소</p>
											<div class="shipping-address">
												<p>${state.addr1}</p>
												<p>${state.addr2}</p>
											</div>
										</div>
									</div>
									<div class="shipping-order">
										 ${createShippingSteps(stateVal)}
									</div>
									${stateVal < 1 ? (`<div class="delete-order">
									<button class="btn-warning open-cancel-modal" data-order="${state.orderSeq}">주문취소</button>
									</div>`) : ''}
								</div>
							</div>
						</div>
					</div>
				`;
            $container.append(stateHtml);
            });
        },
        error: function(xhr, status, error){
            console.error('상품 주문현황 조회 실패:', status, error);
        }
    })
}

// 진행현황 html 그리기
function createShippingSteps(stateVal) {
    const stepLabels = ['입금대기','주문확인', '배송중', '배송완료'];
    let html = '';
    let isCompleted;

    for (let i = 1; i < 4; i++) {
        if(stateVal !== 4){
            isCompleted = stateVal > i || stateVal == 3;
        }
        const isNow = stateVal < 3 && stateVal == i;

        html += `
            <div class="step step-${i} ${isNow ? 'step-now' : ''}">
                <div class="step-circle">
                    ${isCompleted ? `<img src="/img/icons/icon-check-w.svg" alt="완료">` : i}
                </div>
                ${i < 3 ? `<div class="step-line step-line-${i}"></div>` : ''}
                <div class="step-text">
                    ${stepLabels[i]}
                </div>
            </div>
            `;
    }
    return html;
}

//주문 취소
function cancelOrder(){
    $.ajax({
        url: '/api/order-state/cancel/' + cancelOrderSeq,
        method: 'post',
        success: function(result){
            if(result == 0){
                alert('주문취소 실패');
                window.location.href = '/user/order-status';
            }
            alert('주문취소 성공');
            window.location.href = '/user/order-status';
        },
        error: function(xhr, status, error){
            console.error('주문취소 실패:', status, error);
        }
    })
}

//주문내역 js
function getOrderHistory(page){
    const limit = 5;
    if(!page){
        page = 1;
    }
    const offset = (page -1) * 5;
    $.ajax({
        url: '/api/order-state/list',
        method: 'get',
        data: {offset: offset, limit: limit},
        success: function(stateList){

        if(!stateList){
            return;
        }

        const $container = $('#StateContainer');
        const stepLabels = ['입금대기','주문진행중','배송중','배송완료', '주문취소'];
        $container.empty();
        stateList.forEach((state, index) => {

        let reviewValid = true;
        const orderDate = new Date(state.orderDate);
        const nowDate = new Date();

        const diffTime = nowDate.getTime() - orderDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if(diffDays > 7){
            reviewValid = false;
        }

        if( state.statusName == '입금대기'){
            stateVal = 0;
        }else if(state.statusName == '주문확인'){
            stateVal = 1;
        }else if(state.statusName == '배송중' || state.statusName == '교환배송중'){
            stateVal = 2;
        }else if(state.statusName == '배송완료'){
            stateVal = 3;
        }else{
            stateVal = 4;
        }
            const stateHtml = `
					<div id="StateItem" class="order-item">
						<div class="order-summary">
							<div class="order-col col-num">${index + 1 + (page-1) * 5}</div>
							<div class="order-col col-date">${state.orderDate}</div>
							<div class="order-col col-state">
								<div class="state-circle state-${stateVal}"></div>
								${stepLabels[stateVal]}
							</div>
							<div class="order-col col-total">${state.amount}</div>
							<div class="order-col col-thumb">
								${state.orderProductDtos.map(product => `<img src="${product.imageURL}" class="order-photo" alt="상품 이미지">`).join('')}
							</div>
							<img src="/img/icons/icon-arrow.svg" class="order-arrow" data-index="${index}">
						</div>
						<div id="StateDetail" class="order-detail" style="display: none;">
							<div class="order-content">
								<div class="order-product">
									<p class="title-xs title-left">상품 정보</p>
									<div class="product-wrap">
									${state.orderProductDtos.map(product => `
										<div class="product-item">
											<img src=${product.imageURL} alt="상품 이미지" />
											<div class="product-info">
												<p>${product.productName}</p>
												<p>₩${product.unitPrice}</p>
												<p class="product-quantity">수량: ${product.count}</p>
											</div>
										</div>`).join('')}
									</div>
									${stateVal > 2 && stateVal !== 4 && reviewValid ? (`<div class="review-order">
									<button class="btn-primary open-cancel-modal" data-order="${state.orderSeq}">리뷰 작성</button>
									</div>`) : ''}
								</div>
								<div class="detail-order">
									<p class="title-xs title-left">배송 정보</p>
									<div class="product-wrap">
										<div class="shipping-info">
											<p class="shipping-title">받는 분 성함</p>
											<p>${state.receiveName}</p>
										</div>
										<div class="shipping-info">
											<p class="shipping-title">주소</p>
											<div class="shipping-address">
												<p>${state.addr1}</p>
												<p>${state.addr2}</p>
											</div>
										</div>
									</div>
									<div class="shipping-order">
										 ${createShippingSteps(stateVal)}
									</div>
								</div>
							</div>
						</div>
					</div>
				`;
            $container.append(stateHtml);
        });

        }
    })
}

function getPageBtn(num, statusCode){
    $.ajax({
        url: '/api/order-state/count',
        method: 'get',
        data:{num : num, statusCode: statusCode},
        success: function(page){
            if(!page){
                return;
            }
            const $orderHistoryPage = $('#OrderPage');
            let html = `<button class="page-btn disabled" id="FirstBtn"><img src="/img/icons/icon-first.svg"/></button>
                       <button class="page-btn disabled" id="prevBtn"><img src="/img/icons/icon-prev.svg"/></button>`;
            if(page > 0){
                for(let i = 0; i < page; i++){
                    if(i == 0){
                        html += `<button class="page-btn active" data-page="${i+1}">${i+1}</button>`;
                        continue;
                    }
                    html += `<button class="page-btn" data-page="${i+1}">${i+1}</button>`;
                }
            }
            html += `<button class="page-btn" id="NextBtn"><img src="/img/icons/icon-next.svg"/></button>
                     <button class="page-btn" id="LastBtn"><img src="/img/icons/icon-last.svg"/></button>`;
            $orderHistoryPage.append(html);
            pageCount = page;
        }
    })
}