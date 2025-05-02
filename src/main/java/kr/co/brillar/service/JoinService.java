package kr.co.brillar.service;

import kr.co.brillar.mapper.JoinMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class JoinService {

    private final JoinMapper joinMapper;

    // 신상품 리스트
    public int isDuplicate(Map<String, Object> param) {
        return joinMapper.isDuplicate(param);
    }
}
