let page = 1;
let sortVal = 1;
let totalBtn = 0;

$(document).ready(function () {

    getReviewList();
    getPageBtn();

    $(document).on('click','#DeleteBtn',function(){
        const reviewSeq = $(this).attr('data-review-seq');
        console.log(reviewSeq);
        if(confirm('정말 삭제하시겠습니까?')){
            deleteReview(reviewSeq);
        }
    })

    $(document).on('change', '.sort-filter input[type="radio"]', function(){
        if($(this).val() == 'recent'){
            sortVal = 1;
            getReviewList();
        }else{
            sortVal = 2;
            getReviewList();
        }
    })

    $(document).on('click','#FirstBtn',function(){
        if(page == 1){
            return;
        }
        page = 1;
        getReviewList();
    })

    $(document).on('click','#PrevBtn',function(){
        if(page == 1){
            return;
        }
        --page;
        getReviewList();
    })

    $(document).on('click','#NextBtn',function(){
        if(page == totalBtn){
            return;
        }
        ++page;
        getReviewList();
    })

    $(document).on('click','#LastBtn', function(){
        console.log(totalBtn);
        if(page == totalBtn){
            return;
        }
        page = totalBtn;
        console.log(page);
        getReviewList();
    })

    $(document).on('click','.page-btn',function(){
        newPage = $(this).attr('data-page');
        if(!newPage){
            return;
        }

        page = newPage;
        $(this).addClass('active').siblings().removeClass('active');
        getReviewList();
    })

})

function getReviewList(){
    const productSeq = window.location.href.split('/').pop();
    $.ajax({
        url: '/api/review/' + productSeq,
        data: {sortVal: sortVal, page: page},
        method: 'get',
        success: function(reviews){
            const $reviewList = $('.review-list');
            $reviewList.empty();
            reviews.forEach(function(review, index){
                const imgHtml = review.imageUrl
                                ? `<div class="img-container"><img src=${review.imageUrl} alt="리뷰사진"></div>`
                                : '';
                const html = `<div class="review-item">
                    <div class="reviewer-info">
                        <p class="review-rate">${reviewStars(review.score)}</p>
                        <p class="review-name">${review.userName}</p>
                        <p class="review-date ">${review.createdAt}</p>
                    </div>
                    <div class="review-container">
                        <p class="product-name">${review.productName}</p>
                        <div class="review-content">
                            <p>${review.contents}</p>
                            ${imgHtml}
                        </div>
                    </div>
                    ${review.checkUser == true ? `<button type="button" data-review-seq="${review.reviewSeq}" class="btn-primary" id="DeleteBtn">삭제</button>` : ''}
                </div>`;
                $reviewList.append(html);
            });
            activeBtn();
        },
        error: function(xhr, status, error){
            console.error('리뷰 저장 실패:', status, error);
        }
    })
}

//리뷰 별점 표시
function reviewStars(score){
    const fill = '★'.repeat(score);
    const empty = '☆'.repeat(5-score);
    return fill + empty;
}

function deleteReview(reviewSeq){
    $.ajax({
        url: '/api/review/delete',
        method: 'post',
        data:{reviewSeq: reviewSeq},
        success: function(result){
            if(!result){
                alert('삭제 실패');
                return;
            }
            alert('삭제 성공');
            getReviewList();
        },
        error: function(xhr, status, error){
            console.error('리뷰 삭제 실패:', status, error);
        }

    })
}

function getPageBtn(){
    const productSeq = window.location.href.split('/').pop();
    $.ajax({
        url: '/api/review/count/' + productSeq,
        method: 'get',
        success: function(page){
            totalBtn = page;
            const $pagination = $('.pagination');
            let html = `<button class="page-btn disabled" id="FirstBtn"><img src="/img/icons/icon-first.svg"/></button>
                       <button class="page-btn disabled" id="PrevBtn"><img src="/img/icons/icon-prev.svg"/></button>`;
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
            $pagination.append(html);
        }
    })
}

function activeBtn(){
    console.log(page);
    $('.page-btn').removeClass('active');
    $(`.page-btn[data-page="${page}"]`).addClass('active');
}