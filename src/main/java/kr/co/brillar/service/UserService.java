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

    // 유저 비밀번호 변경
    public int updatePassword(String userId, String newPasswordCheck, String oldPassword){

        UserDto userInfo = loginMapper.login(userId);

        if (passwordEncoder.matches(oldPassword, userInfo.getUserPassword())) {

            // 새 비밀번호가 기존 비밀번호와 겹치지 않을 때 정상 return 1 / 비정상 return 0
            if (!passwordEncoder.matches(newPasswordCheck, userInfo.getUserPassword())) {
                String currentNewPassword = passwordEncoder.encode(newPasswordCheck);
                int result = userMapper.updatePassword(currentNewPassword, userId);
                return result;
            }

            return 2; // 새 비밀번호가 기존 비밀번호와 겹칠 때
        }

        return -1; // 기존 비밀번호가 일치하지 않을 때
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
