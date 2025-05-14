package kr.co.brillar.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.brillar.dto.CartDto;

@Mapper
public interface CartMapper {
    
    List<CartDto> cartList(String userId);
    
    CartDto grandTotal(String userId);
}
