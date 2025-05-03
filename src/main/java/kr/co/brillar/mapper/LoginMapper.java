package kr.co.brillar.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.brillar.dto.SessionDto;
import kr.co.brillar.dto.UserDto;

@Mapper
public interface LoginMapper {

    // 로그인
    UserDto login(String userId);  
    
}
