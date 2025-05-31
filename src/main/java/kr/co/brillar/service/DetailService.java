package kr.co.brillar.service;

import java.util.List;

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

    public List<DetailDto> getMaterial(int productSeq){

        List<DetailDto> material = detailMapper.getProductMaterial(productSeq);
        
        return material;
    }

    public List<DetailDto> getSize(int groupId){

        List<DetailDto> size = detailMapper.getProductSize(groupId);
        
        return size;
    }
}
