package kr.co.brillar.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.co.brillar.dto.UserDto;
import kr.co.brillar.mapper.LoginMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
    
    private final BCryptPasswordEncoder passwordEncoder;
    private final LoginMapper loginMapper;

    public UserDto login(String userId, String userPassword){

        UserDto user = loginMapper.login(userId, userPassword);

        if(user != null && passwordEncoder.matches(userPassword, user.getUserPassword())){
            return user;
        }
        
        return null;
    }
}
