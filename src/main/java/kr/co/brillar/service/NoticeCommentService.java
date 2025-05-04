package kr.co.brillar.service;

import kr.co.brillar.dto.NoticeCommentDto;
import kr.co.brillar.mapper.NoticeCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NoticeCommentService {
    private final NoticeCommentMapper noticeCommentMapper;

    // 댓글등록
    @Transactional
    public boolean insertCmt(NoticeCommentDto noticeCmtDto){
        try {

            return noticeCommentMapper.insertCmt(noticeCmtDto) > 0;
        } catch(Exception e){

            throw new RuntimeException("댓글 등록 실패", e);
        }
    }
}
