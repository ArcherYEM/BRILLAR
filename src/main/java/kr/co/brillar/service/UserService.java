package kr.co.brillar.service;

import kr.co.brillar.dto.UserDto;
import kr.co.brillar.mapper.UserMapper;
import kr.co.brillar.security.PasswordEncryptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class JoinServiceImpl {

    private final PasswordEncryptor passwordEncryptor;
    private final UserMapper userMapper;

    public JoinServiceImpl(BCryptPasswordEncoder pwdEncoder,
                           PasswordEncryptor passwordEncryptor,
                           UserMapper userMapper)
    {
        this.passwordEncryptor = passwordEncryptor;
        this.userMapper = userMapper;
    }

    //로그인
    public UserDto login(String userId, String rawPassword){
        UserDto user = userMapper.findByUserId(userId);

        if(user == null){
            throw new IllegalArgumentException("존재하지 않는 아이디입니다.");
        }
        if(!passwordEncryptor.matches(rawPassword, user.getUserPassword())){
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        return user;
    }

    //이메일 중복확인
    public boolean findByEmail(String email){
        return userMapper.findByEmail(email) > 0;
    }
    public boolean findByPhone(String phone){
        return userMapper.findByPhone(phone) > 0;
    }






    public void register(UserDto userDto) {

        if (!userDto.getUserPassword().equals(userDto.getUserPasswordConfirm())) {
            throw new IllegalArgumentException("비밀번호와 확인이 일치하지 않습니다.");
        }
        //비밀번호 암호화
        String encodedPwd = passwordEncryptor.encode(userDto.getUserPassword());
        userDto.setUserPassword(encodedPwd);

        userDto.setUserRoleCode("Silver");   //룩업 테이블
        //DB 저장
        userMapper.insertUser(userDto);

    }
}
