package kr.co.brillar.mapper;

import kr.co.brillar.dto.NoticeDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NoticeMapper {
    List<NoticeDto> getList();
    List<NoticeDto> getPageList(@Param("offset") int offset,@Param("size") int size);
    int getTotalCount();
}
