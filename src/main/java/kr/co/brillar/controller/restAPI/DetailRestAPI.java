package kr.co.brillar.controller.restAPI;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.brillar.dto.DetailDto;
import kr.co.brillar.service.DetailService;
import lombok.RequiredArgsConstructor;
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
    
}
