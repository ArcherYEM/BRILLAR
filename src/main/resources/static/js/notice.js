// 전역변수

// 페이지로드
$(document).ready(function () {
    const $noticeList = $('#notice-content');

    $.each(notices, function (i, notice) {
        const noticeHtml = `
					<div class="notice-list">
						<div class="notice-col">${notice.id}</div>
						<div class="notice-col col-title">
							<a href="/notice/${notice.id}">${notice.title}<span class="comment-count">&nbsp;[${notice.comment}]</span></a>
						</div>
						<div class="notice-col col-date">${notice.date}</div>
						<div class="notice-col">${notice.view}</div>
					</div>
				`
        $noticeList.append(noticeHtml);
    })
})

/*********************************/

