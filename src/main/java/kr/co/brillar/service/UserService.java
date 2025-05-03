package kr.co.brillar.service;

import org.springframework.stereotype.Service;

import kr.co.brillar.dto.UserDto;
import kr.co.brillar.mapper.UserMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserMapper userMapper;

    public UserDto getUser(String userId){
        
        UserDto userDto = userMapper.getUser(userId);

        return userDto;
    }
    
}
