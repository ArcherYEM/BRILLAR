package kr.co.brillar.service.user;

import kr.co.brillar.domain.Member;
import kr.co.brillar.domain.Role;
import kr.co.brillar.dto.user.request.JoinRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Slf4j
@Service
public class JoinServiceImpl implements JoinService{


    @Override
    public void register(JoinRequest joinRequest) {
//        throw new RuntimeException("임의로 에러 발생");
        log.info("[회원가입 요청] 이름: {}, 이메일: {}", joinRequest.getUserName(),joinRequest.getUserEmail());
        if(!joinRequest.getUserPassword().equals(joinRequest.getUserPasswordConfirm())) {
            throw new IllegalArgumentException("비밀번호와 비밀번화 확인이 일치하지 않습니다.");
        }
        Member member = getMember(joinRequest);

        System.out.println("[회원가입 요청]");
        System.out.println("이름: " + member.getUserName());
        System.out.println("이메일: " + member.getUserEmail());
        System.out.println("전화번호: " + member.getUserPhone());

    }

    private static Member getMember(JoinRequest joinRequest) {
        Member member = new Member();
//        member.setUserId(joinRequest.getUserId());
        member.setUserPassword(joinRequest.getUserPassword());
        member.setUserName(joinRequest.getUserName());
        member.setUserBirth(LocalDate.parse(joinRequest.getUserBirth()));
        member.setUserGender(joinRequest.getUserGender());
        member.setUserPhone(joinRequest.getUserPhone());
        member.setUserAddr1(joinRequest.getUserAddr1());
        member.setUserAddr2(joinRequest.getUserAddr2());
        member.setUserEmail(joinRequest.getUserEmail());

        //신규가입 기본등급 : Silver
        member.setUserRole(Role.SILVER.getCode());
        return member;
    }
}
