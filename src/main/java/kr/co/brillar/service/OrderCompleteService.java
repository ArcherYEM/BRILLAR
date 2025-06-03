package kr.co.brillar.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.co.brillar.dto.OrderCompleteDto;
import kr.co.brillar.mapper.OrderCompleteMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderCompleteService {
    
    private final OrderCompleteMapper orderCompleteMapper;

    public int insertOrder(OrderCompleteDto orderCompleteDto){

        orderCompleteMapper.insertOrder(orderCompleteDto);
        
        // 반환받은 orderSeq 넘겨주기
        return orderCompleteDto.getOrderSeq();
    }

    public int insertOrderDetail(List<OrderCompleteDto> orderCompleteDto){

        int result = orderCompleteMapper.insertOrderDetail(orderCompleteDto);
        
        return result;
    }

    public List<OrderCompleteDto> calcItemPrice(String userId){

        List<OrderCompleteDto> result = orderCompleteMapper.calcItemPrice(userId);
        
        return result;
    }
}
