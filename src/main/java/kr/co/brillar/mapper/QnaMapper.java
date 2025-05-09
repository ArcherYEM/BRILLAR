package kr.co.brillar.mapper;

import kr.co.brillar.dto.QnaDto;
import kr.co.brillar.dto.QnaViewDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface QnaMapper {
    Integer saveQna(QnaDto qnaDto);
    List<QnaDto> findQnaList(Integer offset);
    Integer findQnaCount();
    QnaViewDto findQnaContent(Long qnaSeq);
    Integer saveQnaAnswer(QnaViewDto qnaViewDto);
    Integer deleteQna(Long qnaSeq);
    Integer deleteQnaAnswer(Long qnaSeq);
}
