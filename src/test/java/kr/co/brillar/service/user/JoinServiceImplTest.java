package kr.co.brillar.service.user;


import kr.co.brillar.dto.user.request.JoinRequest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class JoinServiceImplTest {

    private final JoinServiceImpl joinService = new JoinServiceImpl();

    @Test
    void register(){
        JoinRequest joinRequest = new JoinRequest();
        joinRequest.setUserPassword("123456789");
        joinRequest.setUserPasswordConfirm("123456789");     //일치
//        joinRequest.setUserPasswordConfirm("1234567892");  //불일치
        joinRequest.setUserName("테스트 유저");
        joinRequest.setUserBirth("2020-05-05");
        joinRequest.setUserPhone("010-2050-4040");
        joinRequest.setUserEmail("test@join.com");


        //when & then
        Assertions.assertDoesNotThrow(() -> joinService.register(joinRequest));
    }
}
