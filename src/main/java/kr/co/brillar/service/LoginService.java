package kr.co.brillar.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.co.brillar.dto.SessionDto;
import kr.co.brillar.dto.UserDto;
import kr.co.brillar.mapper.LoginMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
    
    private final BCryptPasswordEncoder passwordEncoder;
    private final LoginMapper loginMapper;

    public SessionDto login(String userId, String userPassword){
        
        UserDto userInfo = loginMapper.login(userId);

        if(userInfo != null && passwordEncoder.matches(userPassword, userInfo.getUserPassword())){
            SessionDto user = new SessionDto();
            user.setUserId(userInfo.getUserId());
            user.setUserName(userInfo.getUserName());
            user.setUserRoleCode(userInfo.getUserRoleCode());
            return user;
        }
        
        return null;
    }
}
