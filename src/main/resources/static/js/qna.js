$(document).ready(function(){

    const path = window.location.pathname;
    const parts = path.split('/');

    if(path == '/qna' || '/qna/'){
        getQnaList(1);
        getPageBtn();
    }

    if(parts[2] != null){
        const qnaSeq = parts[2];
        getQnaView(qnaSeq);
    }

    $('#QnaRegisterBtn').on('click',function(e){
        e.preventDefault();
        saveQna();
    })

    $(document).on('click','#FirstBtn',function(){
        getQnaList(1);
    })

    $(document).on('click','#QnaPage button',function(){
        const page = $(this).attr('data-page');
        if(!page){
            return;
        }
        $(this).addClass('active').siblings().removeClass('active');
        getQnaList(page);
    })

    //상세 페이지 js
    $('#AnswerBtn').on('click',function(){
        $('#AnswerRegister').toggleClass('active');
        if($('#AnswerRegister').hasClass('active')){
            $('#AnswerRegister').show().css('display','flex');
            return;
        }
        $('#AnswerRegister').hide();
    })

    $('#AnswerSaveBtn').on('click',function(){
        //qnaSeq 파라미터로 보내주기
        saveQnaAnswer(parts[2]);
    })

    //답변 글자수 카운트
    $('#AnswerText').on('input', function () {
        let content = $(this).val();
        $('#AnswerCount').text(content.length);
    });

    $('#DeleteBtn').on('click',function(){
        if(confirm('정말 삭제하시겠습니까?')){
            deleteQna(parts[2]);
        }
    })

    $('#QnaListBtn').on('click', function(){
        window.location.href = '/qna';
    })

    //답변 삭제
    $(document).on('click','#BtnWarning',function(){
        if(confirm('정말 삭제하시겠습니까')){
            deleteQnaAnswer(parts[2]);
        }
    })
})

function saveQna(){
    const title = $('#QnaTitle').val();
    const contents = $('#QuestText').val();
    $.ajax({
        url: '/api/qna/save',
        method: 'post',
        contentType : 'application/json',
        data: JSON.stringify({title: title, contents: contents}),
        success: function(result){
            if(!result){
                alert('로그인을 해주세요');
                return;
            }
            alert('저장 성공');
            window.location.href ='/qna';
        },
        error : function(xhr, status, error){
            console.error('Qna 등록 실패:', status, error);
        }
    })
}

function getQnaList(page){
    $.ajax({
        url: '/api/qna/list',
        method: 'get',
        data: {page: page},
        success: function(qnas){
        if(page == 1){
            $('#QnaPage button[data-page="1"]').addClass('active').siblings().removeClass('active');
        }
        const $qnaList = $('#qna-content');
        $qnaList.empty();
        $.each(qnas, function (i, qna) {
            const stateText = qna.answerId == null
                ? `<div class="qna-col col-state wating">대기중</div>`
                : `<div class="qna-col col-state confirm">답변 완료</div>`;
            const lockIcon = qna.secrecy === 1
                ? '<img src="/img/icons/icon-lock.svg" alt="비공개" class="lock-icon" style="width: 16px; height: 16px; margin-right: 4px;" />'
                : '';

            const qnaHtml = `
				<div class="qna-list">
					<div class="qna-col">${(i+1) + (page-1) * 10}</div>
					${stateText}
					<div class="qna-col col-title">
						<a href="/qna/${qna.qnaSeq}">
							${qna.title}
						</a>
						${lockIcon}
					</div>
					<div class="qna-col col-date">${qna.createdAt}</div>
				</div>
				`;
            $qnaList.append(qnaHtml);
        });
        },
        error : function(xhr, status, error){
            console.error('Qna 조회 실패:', status, error);
        }
    })
}

function saveQna(){
    const title = $('#QnaTitle').val();
    const contents = $('#QuestText').val();
    $.ajax({
        url: '/api/qna/save',
        method: 'post',
        contentType : 'application/json',
        data: JSON.stringify({title: title, contents: contents}),
        success: function(result){
            if(!result){
                alert('로그인을 해주세요');
                return;
            }
            alert('저장 성공');
            window.location.href ='/qna';
        },
        error : function(xhr, status, error){
            console.error('Qna 등록 실패:', status, error);
        }
    })
}

function getPageBtn(){
    $.ajax({
        url: '/api/qna/count',
        method: 'get',
        success: function(page){
            const $qnaPage = $('#QnaPage');
            console.log(page);
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
            $qnaPage.append(html);
        }
    })
}

//qna 상세페이지
function getQnaView(qnaSeq){
    $.ajax({
        url: '/api/qna/' + qnaSeq,
        method: 'get',
        success: function(qna){
        const questionHTML = `
				<div class="question-top" id="QuestionTop" data-id="${qna.userId}">
					<p class="question-state">${qna.answerId != null ? '답변완료' : '대기중'}</p>
					<p class="question-title">${qna.title}</p>
					<div class="question-top-info">
						<p class="question-author">${qna.userName}</p>
						<p class="question-date">${qna.createdAt}</p>
					</div>
				</div>
				<div class="question-content">${qna.contents}</div>
			`
        $('#QuestionDetail').html(questionHTML);
        // 답변
        if (qna.answerId) {
            const answerHTML = `
				<div class="answer-detail">
					<div class="answer-top">
					<div class="answer-title">관리자 답변</div>
					<div class="answer-date">${qna.answerCreatedAt}</div>
					</div>
					<div class="answer-content">${qna.answerContents}</div>
				</div>
				<div class="btn-list">
					<button class="btn-warning" id="BtnWarning">삭제</button>
				</div>
				`;
            $('#AnswerView').html(answerHTML).show();
        } else {
            $('#AnswerView').hide(); // 답변 없으면 숨김
        }
        checkUser(qna.userId);
        },
        error : function(xhr, status, error){
            console.error('Qna 상세 페이지 불러오기 실패:', status, error);
        }
    })
}

function checkUser(userId){
    $.ajax({
        url: '/qna/check-user',
        data: {userId: userId},
        method: 'get',
        success: function(role){
            if(role == 0){
                $('#AnswerBtn').show();
                $('#BtnWarning').show();
                return;
            }else if(role == 1){
                $('#DeleteBtn').show();
            }
        },
        error : function(xhr, status, error){
            console.error('유저 권한 조회 실패:', status, error);
        }
    })
}

function saveQnaAnswer(qnaSeq){
    const comment = $('#AnswerText').val();
    $.ajax({
        url: '/api/qna/answer/save',
        contentType : 'application/json',
        data: JSON.stringify({qnaSeq: qnaSeq, answerContents: comment}),
        method: 'post',
        success: function(result){
            if(!result){
                alert('답글을 작성할 권한이 없습니다');
                return;
            }
            window.location.href ='/qna/' + qnaSeq;
        },
        error : function(xhr, status, error){
            console.error('유저 권한 조회 실패:', status, error);
        }
    })
}

function deleteQna(qnaSeq){
    const userId = $('#QuestionTop').attr('data-id');
    $.ajax({
        url: '/api/qna/delete',
        data: {qnaSeq: qnaSeq, userId: userId},
        method: 'post',
        success: function(result){
            if(!result){
                alert('Qna를 삭제할 권한이 없습니다');
                return;
            }
            alert('삭제 성공');
            window.location.href ='/qna';
        },
        error : function(xhr, status, error){
            console.error('Qna 삭제 실패:', status, error);
        }
    })
}

function deleteQnaAnswer(qnaSeq){
    $.ajax({
        url: '/api/qna/delete-answer',
        data: {qnaSeq: qnaSeq},
        method: 'post',
        success: function(result){
            if(!result){
                alert('Qna 답변을 삭제할 권한이 없습니다');
                return;
            }
            alert('삭제 성공');
            window.location.href ='/qna/' + qnaSeq;
        },
        error : function(xhr, status, error){
            console.error('Qna 삭제 실패:', status, error);
        }
    })
}