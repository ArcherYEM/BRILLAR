package kr.co.brillar.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.brillar.dto.CartDto;

@Mapper
public interface UserCartMapper {
    
    List<CartDto> cartList(String userId);
    
    CartDto grandTotal(String userId);

    int quantityInc(@Param("cartSeq")int cartSeq, @Param("productSeq") int productSeq);

    int quantityDec(@Param("cartSeq")int cartSeq, @Param("productSeq") int productSeq);

    int quantityChange(@Param("cartSeq")int cartSeq,
                       @Param("productSeq") int productSeq,
                       @Param("quantity") int quantity);

    int deleteItem(@Param("cartSeq")int cartSeq, @Param("productSeq") int productSeq);
}
