// 전역변수
let currentPage = 1;
const pageSize = 10;

// 페이지로드 - 페이지 로드 시  공지사항 리스트 조회 + 페이지 버튼 클릭 이벤트 설정
$(document).ready(function () {
    const path = window.location.pathname
    const parts = path.split('/');

    if ((path == '/notice' || path === '/notice/') && parts.length === 2){
        getList();

        //페이지네이션
        $(document).on('click', '.page-btn',function (){
            const selectedPage = $(this).data('page');
            currentPage = selectedPage;
            getList();
        })
    }

    //글 상세 페이지 구현
    else if ( parts[1] === 'notice' && parts.length === 3 && !isNaN(Number(parts[2]))){
        const noticeId = parts[2];
        getNoticeDetail(noticeId);
    }
});

/*********************************/

// 리스트 조회
function getList(){
    $.ajax({
        url : `/api/notice/list?page=${currentPage}&size=${pageSize}`,
        method : 'GET',
        dataType : 'json',

        success : function(data){
            const $noticeList = $('#notice-content');
            $noticeList.empty();

            $.each(data, function(i, notice){
                const createdDate = notice.createdAt.split('T')[0]; // 'YYYY-MM-DD'

                const html = `
                    <div class="notice-list">
                        <div class="notice-col">${notice.noticeSeq}</div>
                        <div class="notice-col col-title">
                            <a href="/notice/${notice.noticeSeq}">${notice.title}<span class="comment-count">&nbsp;[0]</span></a>
                        </div>
                        <div class="notice-col col-date">${createdDate}</div>
                    </div>
                `;

                $noticeList.append(html);
            });
            //페이징 버튼 생성
            const totalCount = data.length > 0 ? data[0].totalCount: 0;
            getPagination(totalCount, currentPage);
        },
        error : function(xhr, status, error){
            console.error('공지사항 조회 실패:', status, error);
        }
    })
}

//페이징 버튼 생성
function getPagination(totalCount, currentPage){
    const totalPage = Math.ceil(totalCount / pageSize);
    const $pagination = $(`.pagination`);
    $pagination.empty();

    for (let i = 1; i <= totalPage; i++){
        const btn = `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                            ${i}
                            </button>`;
        $pagination.append(btn)
    }
}

//글 상세보기
function getNoticeDetail(noticeSeq){
    $.ajax({
        url : `/api/notice/${noticeSeq}`,
        method : `GET`,
        dataType : 'json',
        success : function (notice){
            const createdDate = notice.createdAt.split(`T`)[0];
            $('#notice-seq-hidden').val(notice.noticeSeq); // seq 할당
            const noticeHTML = `
            <div class="notice-top">
                <div class="notice-title">${notice.title}</div>
                <div class="notice-meta">
                    <span>${notice.userId}</span>
                    <span class="notice-date">${createdDate}</span>
                </div>
            </div>
            <div class="notice-content">${notice.contents}</div>
            `;
            $('#notice-detail').html(noticeHTML);

            getCmt(); // 댓글 조회
        },
        error : function (xhr, status, error){
            console.error(`공지사항 상세조회 실패`, status, error);
        }
    })
}

// 댓글 조회
function getCmt(){
    const noticeSeq = $('#notice-seq-hidden').val();
    if (!noticeSeq || isNaN(noticeSeq)) {
        alert('게시번호 이상');
        return;
    }

    $.ajax({
        url : `/api/noticeComment/getCmt?noticeSeq=${noticeSeq}`,
        method : 'GET',

        success : function(result){
            const $commentList  = $('#notice-cm-list');
            const $commentCount = $('#notice-cm-count');
            
            $commentList.empty(); // 초기화

            if (result.length === 0) {
                $commentList.html('<p class="no-comment">등록된 댓글이 없습니다.</p>');
                $commentCount.text('(0)');
                return;
            }

            $commentCount.text(`(${result.length})`);

            result.forEach(function(comment) {
                const html = `
                    <div class="comment-list">
                        <div class="">
                            <span class="">${comment.userName}</span>
                            <span class="">(${comment.userId})</span>
                        </div>
                        <div>
                            <span>${comment.createdAt}</span>
                        </div>
                        <div class="">
                            <span>${comment.comment}</span>
                            <button type="button">삭제</button>
                        </div>
                    </div>
                    <hr>
                `;

                $commentList.append(html);
            });
        },
        error : function (xhr){
            console.warn('댓글 조회중 에러발생', xhr);
        }
    });
}

// 댓글작성
function insertCmt(){
    const comment   = $('#NoticeCmt').val().trim();
    const noticeSeq = $('#notice-seq-hidden').val();

    if (comment === null){
        alert('댓글을 입력해주세요.');
    }

    if (!noticeSeq || isNaN(noticeSeq)) {
        alert('게시번호 이상');

        return;
    }

    const data = {
        noticeSeq : noticeSeq,
        comment   : comment
    }

    $.ajax({
        url         : '/api/noticeComment/insertCmt',
        method      : 'POST',
        contentType : 'application/json',
        data        : JSON.stringify(data),

        success     : function (result){
            if (result === 1) {
                alert('댓글이 정상등록되었습니다.');
                getNoticeDetail(noticeSeq);
            } else if (result === -1){
                alert('로그인 후 댓글 작성이 가능합니다.');
            } else {
                alert('댓글 작성에 실패하였습니다.')
            }
        },
        error       : function (xhr){
            console.error("댓글작성중 에러 발생 : ", xhr);
        }
    });
}