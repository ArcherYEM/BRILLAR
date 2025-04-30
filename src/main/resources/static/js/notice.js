// 전역변수

// 페이지로드
$(document).ready(function () {
    getList(); // 리스트 조회
})

/*********************************/

// 리스트 조회
function getList(){
    $.ajax({
        url : '/api/notice/getList',
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
        },
        error : function(xhr, status, error){
            console.error('공지사항 조회 실패:', status, error);
        }
    })
}
