package kr.co.brillar.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.brillar.dto.OrderCompleteDto;

@Mapper
public interface OrderCompleteMapper {
    
    // 주문시 작업
    int insertOrder(OrderCompleteDto orderCompleteDto);

    int insertOrderDetail(@Param("orderDetailList") List<OrderCompleteDto> orderCompleteDto);

    List<OrderCompleteDto> calcItemPrice(String userId);

    // 주문 완료시 작업
    List<OrderCompleteDto> checkStockForUpdate(String userId);

    List<OrderCompleteDto> checkCart(String userId);

    void decreaseStock(String userId);

    void addHistory(String userId);

    void deleteCart(String userId);

    // 주문완료 페이지
    OrderCompleteDto getOrderInfo(String userId, int orderSeq);

    List<OrderCompleteDto> getDetailInfo(int orderSeq);
}