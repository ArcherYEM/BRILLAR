package kr.co.brillar.service;

import kr.co.brillar.dto.UserDto;
import kr.co.brillar.mapper.JoinMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class JoinService {
    static final String SUCCESS = "SUCCESS";
    static final String FAIL    = "FAIL";

    private final JoinMapper joinMapper;

    // 중복확인
    public int isDuplicate(Map<String, Object> param) {
        return joinMapper.isDuplicate(param);
    }

    // 회원가입
    public String register(UserDto user) {
        try {
            joinMapper.register(user);

            return SUCCESS;
        } catch (Exception e){
            return FAIL;
        }
    }
}
