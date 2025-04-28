package kr.co.brillar.service.user;

import kr.co.brillar.dto.Member;
import kr.co.brillar.dto.Role;
import kr.co.brillar.mapper.UserMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;


@SpringBootTest
public class UserMapperTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    void insertUserTest(){
        Member member = new Member();
        member.setUserPassword("2020");
        member.setUserName("테스트유저");
        member.setUserBirth(LocalDate.of(1990, 05, 05));
        member.setUserGender("M");
        member.setUserAddr1("인천광역시");
        member.setUserAddr2("부평구");
        member.setUserRole(Role.SILVER.getCode());
        member.setUserEmail("test@test.com");

        Assertions.assertDoesNotThrow(()->userMapper.insertUser(member));
    }
}
