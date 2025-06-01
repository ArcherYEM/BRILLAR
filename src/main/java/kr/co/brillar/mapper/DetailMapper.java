package kr.co.brillar.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.brillar.dto.DetailDto;

@Mapper
public interface DetailMapper {
    
    DetailDto getProductDetail(int productSeq);

    List<DetailDto> getProductMaterial(int productSeq);

    List<DetailDto> getProductSize(int groupId);

    int insertToCart(DetailDto detailDto);

    List<Integer> checkCartExist(@Param("userId") String userId, @Param("productSeq") int productSeq);

    int checkStock(int productSeq);
}
