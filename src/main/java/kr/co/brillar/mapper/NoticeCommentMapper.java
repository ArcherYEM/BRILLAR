package kr.co.brillar.mapper;

import kr.co.brillar.dto.NoticeCommentDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeCommentMapper {
    // 댓글등록
    int insertCmt(NoticeCommentDto noticeCommentDto);

    // 댓글 조회
    List<NoticeCommentDto> getCmt(int noticeSeq);
}
