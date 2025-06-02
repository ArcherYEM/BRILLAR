$(document).ready(function () {
    getReviewList();
})

function getReviewList(){
    const productSeq = window.location.href.split('/').pop();
    $.ajax({
        url: '/api/review/' + productSeq,
        method: 'get',
        success: function(reviews){
            const $reviewList = $('.review-list');
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
                </div>`;
                $reviewList.append(html);
            });
        }
    })
}

//리뷰 별점 표시
function reviewStars(score){
    const fill = '★'.repeat(score);
    const empty = '☆'.repeat(5-score);
    return fill + empty;
}