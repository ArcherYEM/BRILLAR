package kr.co.brillar.mapper;

import kr.co.brillar.dto.NoticeCommentDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NoticeCommentMapper {
    // 댓글등록
    int insertCmt(NoticeCommentDto noticeCommentDto);
}
