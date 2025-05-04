package kr.co.brillar.controller.restAPI;

import kr.co.brillar.dto.ProductDTO;
import kr.co.brillar.dto.ProductParamDTO;
import kr.co.brillar.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/shop")
public class ShopRestAPI {

    private final ShopService shopService;
    @GetMapping("/getProducts")
    public List<ProductDTO> getShopList(@ModelAttribute ProductParamDTO paramDTO){
        List<ProductDTO> productDTOList = shopService.getShopListByCategory(paramDTO);
        return productDTOList;
    }

    @GetMapping("/count")
    public Integer getShopCount(@ModelAttribute ProductParamDTO paramDTO){
        Integer count = shopService.getPageCount(paramDTO);
        return count;
    }
}
