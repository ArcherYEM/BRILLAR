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
        },
        error : function (xhr, status, error){
            console.error(`공지사항 상세조회 실패`, status, error);
        }
    })
}
