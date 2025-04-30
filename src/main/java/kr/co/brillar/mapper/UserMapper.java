package kr.co.brillar.mapper;

import kr.co.brillar.dto.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    void insertUser(Member member);   //회원 데이터
}
