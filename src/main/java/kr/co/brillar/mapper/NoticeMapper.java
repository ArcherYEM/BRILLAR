package kr.co.brillar.mapper;

import kr.co.brillar.dto.NoticeDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NoticeMapper {

    //offset부터 size수 만큼 게시글 목록 조회
    List<NoticeDto> getPageList(@Param("offset") int offset,@Param("size") int size);

    //전체 게시글 수 조회
    int getTotalCount();
}
