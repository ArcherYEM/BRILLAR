package kr.co.brillar.service;

import org.springframework.stereotype.Service;

import kr.co.brillar.dto.DetailDto;
import kr.co.brillar.mapper.DetailMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DetailService {
    
    private final DetailMapper detailMapper;

    public DetailDto getDetail(int productSeq){

        DetailDto dto = detailMapper.getProductDetail(productSeq);
        
        return dto;
    }
}
