package kr.co.brillar.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.brillar.dto.OrderCompleteDto;

@Mapper
public interface OrderCompleteMapper {
    
    int insertOrder(OrderCompleteDto orderCompleteDto);

    int insertOrderDetail(@Param("orderDetailList") List<OrderCompleteDto> orderCompleteDto);

    List<OrderCompleteDto> calcItemPrice(String userId);
}
