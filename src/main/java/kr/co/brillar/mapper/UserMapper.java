package kr.co.brillar.mapper;

import kr.co.brillar.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    void insertUser(UserDto userDto);   //회원 데이터
    UserDto findByUserId(String userId);
    int findByEmail(String email);
    int findByPhone(String phone);
}
