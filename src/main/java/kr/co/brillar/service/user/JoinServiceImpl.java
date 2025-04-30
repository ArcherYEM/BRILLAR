package kr.co.brillar.service.user;

import kr.co.brillar.dto.Member;
import kr.co.brillar.dto.Role;
import kr.co.brillar.dto.JoinRequest;
import kr.co.brillar.mapper.UserMapper;
import kr.co.brillar.security.PasswordEncryptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Slf4j
@Service
public class JoinServiceImpl implements JoinService{

    private final BCryptPasswordEncoder pwdEncoder;
    private final PasswordEncryptor passwordEncryptor;
    private final UserMapper userMapper;

    public JoinServiceImpl(BCryptPasswordEncoder pwdEncoder, PasswordEncryptor passwordEncryptor, UserMapper userMapper) {
        this.pwdEncoder = pwdEncoder;
        this.passwordEncryptor = passwordEncryptor;
        this.userMapper = userMapper;
    }


    @Override
    public void register(JoinRequest joinRequest) {
//        throw new RuntimeException("임의로 에러 발생");

        log.info("[회원가입 요청] 이름: {}, 이메일: {}", joinRequest.getUserName(),joinRequest.getUserEmail());
        if(!joinRequest.getUserPassword().equals(joinRequest.getUserPasswordConfirm())) {
            throw new IllegalArgumentException("비밀번호와 비밀번화 확인이 일치하지 않습니다.");
        }
        Member member = getMember(joinRequest);

        //비밀번호 암호화
        member.setUserPassword(passwordEncryptor.encode(joinRequest.getUserPassword()));

        //DB 저장
        userMapper.insertUser(member);

        System.out.println("[회원가입 요청]");
        System.out.println("이름: " + member.getUserName());
        System.out.println("이메일: " + member.getUserEmail());
        System.out.println("전화번호: " + member.getUserPhone());

    }

    private static Member getMember(JoinRequest joinRequest) {
        Member member = new Member();
        member.setLoginId(joinRequest.getLoginId());
        member.setUserName(joinRequest.getUserName());
        member.setUserBirth(joinRequest.getUserBirth());
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
