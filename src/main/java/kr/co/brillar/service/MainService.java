package kr.co.brillar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.brillar.dto.MainDto;
import kr.co.brillar.mapper.MainMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class MainService {

    private final MainMapper mainMapper;

    @Autowired

    // 테스트
    public String getTest() {
        return "test";
    }

    // 신상품 리스트
    public List<MainDto> getNewList() {
        return mainMapper.getNewProduct();
    }
}
