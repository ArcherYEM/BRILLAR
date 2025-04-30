package kr.co.brillar.mapper;

import kr.co.brillar.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    void insertUser(MemberDto memberDto);   //회원 데이터
    MemberDto findByUserId(String userId);
    int findByEmail(String email);
    int findByPhone(String phone);
}
