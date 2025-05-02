package kr.co.brillar.mapper;

import kr.co.brillar.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface JoinMapper {
    int isDuplicate(Map<String, Object> param);
    void register(UserDto user);
}
