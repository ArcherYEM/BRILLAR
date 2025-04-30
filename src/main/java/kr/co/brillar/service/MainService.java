package kr.co.brillar.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.co.brillar.dto.MainDto;
import kr.co.brillar.mapper.MainMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainService {

    private final MainMapper mainMapper;

    // 신상품 리스트
    public List<MainDto> getNewList() {
        return mainMapper.getNewProduct();
    }
}
