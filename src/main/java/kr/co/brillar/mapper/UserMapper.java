package kr.co.brillar.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.brillar.dto.UserDto;

@Mapper
public interface UserMapper {
    
    UserDto getUser(String userId);
    
    int updateUser(UserDto userDto);
 
    int deleteUser(String userId);

    int updatePassword(@Param("newPasswordCheck")String newPasswordCheck, @Param("userId") String userId);
}
