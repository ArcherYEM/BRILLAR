package kr.co.brillar.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.brillar.dto.UserDto;

@Mapper
public interface LoginMapper {

    // 로그인
    UserDto login(@Param("userId") String userId, @Param("userPassword") String userPassword);  
    
}
