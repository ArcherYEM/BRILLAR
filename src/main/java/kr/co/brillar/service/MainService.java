package kr.co.brillar.service;

import java.util.Collections;
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

    // 할인품 리스트
    public List<MainDto> getSaleProduct() {
        List<MainDto> dto = mainMapper.getSaleProduct();
        Collections.shuffle(dto);
        
        List<MainDto> shuffledList = dto.subList(0, Math.min(3, dto.size()));

        return shuffledList;
    }

    public int checkStock(int productSeq){

    int stock = mainMapper.checkStock(productSeq);

    return stock;
    }
}
