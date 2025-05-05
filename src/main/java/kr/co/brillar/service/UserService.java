package kr.co.brillar.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.co.brillar.dto.UserDto;
import kr.co.brillar.mapper.LoginMapper;
import kr.co.brillar.mapper.UserMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final LoginMapper loginMapper;

    // 유저정보 가져오기
    public UserDto getUser(String userId){
        UserDto userDto = userMapper.getUser(userId);
        return userDto;
    }

    // 유저정보 업데이트
    public int updateUser(UserDto userDto){
        int result = userMapper.updateUser(userDto);
        
        if (result == 1) {
            return result;
        }
        return 0;
    }

    // 비밀번호일치 확인 후 회원탈퇴 절차 진행
    public int deleteUser(String userId, String userPassword){

        UserDto checkUser = loginMapper.login(userId);
        
        if (checkUser != null && passwordEncoder.matches(userPassword, checkUser.getUserPassword())) {
            int result = userMapper.deleteUser(userId);
            return result;
        }

        return 0;
    }
    
}
