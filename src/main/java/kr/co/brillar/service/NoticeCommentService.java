package kr.co.brillar.service;

import kr.co.brillar.dto.NoticeCommentDto;
import kr.co.brillar.mapper.NoticeCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    // 댓글조회
    public List<NoticeCommentDto> getCmt(int noticeSeq){
        try {
            List<NoticeCommentDto> noticeCmtList = noticeCommentMapper.getCmt(noticeSeq);

            return noticeCmtList;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
