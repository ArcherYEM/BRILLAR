package kr.co.brillar.controller.restAPI;

import kr.co.brillar.dto.MainDto;
import kr.co.brillar.service.MainService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/main")
public class MainRestAPI {
    private final MainService mainService;

    @GetMapping("/getProducts")
    @ResponseBody
    public List<MainDto> getProductList() {
        List<MainDto> mainDtoList = mainService.getNewList();

        return mainDtoList;
    }

    @GetMapping("/getSale")
    public List<MainDto> getSaleList() {
        List<MainDto> saleList = mainService.getSaleProduct();
        
        return saleList;
    }

    @GetMapping("/chkStock")
    public int getCheckStock(int productSeq) {
        int stock = mainService.checkStock(productSeq);

        if (stock == 0) {
            return 3;
        }

        return 0;
    }
    
    
}
