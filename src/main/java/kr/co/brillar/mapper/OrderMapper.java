package kr.co.brillar.mapper;

import kr.co.brillar.dto.OrderProductDto;
import kr.co.brillar.dto.OrderResponseDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderMapper {

    List<OrderResponseDto> findListOrderStateDto(@Param("userId") String userId, @Param("offset")Integer offset,
                                                 @Param("statusCode") Boolean statusCode,@Param("limit") Integer limit);

    List<OrderProductDto> findOrderProductList(List<Long> orderSeqs);

    Integer cancelOrder(@Param("userId") String userId,@Param("orderSeq") Long orderSeq);

    Integer orderPageCount(@Param("userId") String userId,@Param("statusCode") Boolean statusCode);

    Integer getPurchaseCount(String userId);
}
