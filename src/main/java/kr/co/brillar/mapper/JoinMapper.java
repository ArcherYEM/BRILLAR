package kr.co.brillar.mapper;

import kr.co.brillar.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface JoinMapper {
    // 중복확인
    int isDuplicate(Map<String, Object> param);
    
    // 회원가입
    void register(UserDto user);
}
