package kr.co.brillar.mapper;

import kr.co.brillar.dto.ProductDTO;
import kr.co.brillar.dto.ProductParamDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ShopMapper {
    List<ProductDTO> getProductDTOList(@Param("dto")ProductParamDTO dto, @Param("offset")Integer offset);
}
