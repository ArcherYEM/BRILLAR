package kr.co.brillar.controller.restAPI;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.brillar.dto.DetailDto;
import kr.co.brillar.service.DetailService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/detail")
public class DetailRestAPI {
    
    private final DetailService detailService;
    
    @GetMapping("/info")
    public DetailDto getProductDetail(int productSeq) {

        DetailDto dto = detailService.getDetail(productSeq);
        
        return dto;
    }
    
    @GetMapping("/material")
    public List<DetailDto> getMaterial(int productSeq) {

        List<DetailDto> material = detailService.getMaterial(productSeq);
        
        return material;
    }
    
    @GetMapping("/size")
    public List<DetailDto> getSize(int groupId) {

        List<DetailDto> size = detailService.getSize(groupId);

        return size;
    }
    
}
