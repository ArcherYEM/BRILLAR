// 전역변수
let currentPage = 1;
const pageSize = 10;

// 페이지로드 - 페이지 로드 시  공지사항 리스트 조회 + 페이지 버튼 클릭 이벤트 설정
$(document).ready(function () {
    getList(); // 리스트 조회

    //페이지네이션
    $(document).on('click', '.page-btn', function () {
        const selectedPage = $(this).data('page');
        currentPage = selectedPage;
        getList(currentPage);
    })
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


//페이징 버튼 생성 함수
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
