package kr.co.brillar.service;

import kr.co.brillar.dto.ProductDTO;
import kr.co.brillar.dto.ProductParamDTO;
import kr.co.brillar.mapper.ShopMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService {

    private final ShopMapper shopMapper;
    public List<ProductDTO> getShopListByCategory(ProductParamDTO paramDTO) {
        int offset = 0;
        if(paramDTO.getPage() != null) {
             offset = (paramDTO.getPage() - 1) * 9;
        }
        return shopMapper.getProductDTOList(paramDTO, offset);
    }
}
