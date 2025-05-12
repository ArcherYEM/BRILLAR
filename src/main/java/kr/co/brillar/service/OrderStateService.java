package kr.co.brillar.service;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.brillar.dto.OrderProductDto;
import kr.co.brillar.dto.OrderResponseDto;
import kr.co.brillar.dto.SessionDto;
import kr.co.brillar.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.Session;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderStateService {

    private final OrderMapper orderMapper;
    public List<OrderResponseDto> findListOrderStateDto(HttpServletRequest request, Integer offset ,Boolean statusCode,Integer limit) {
        SessionDto user = (SessionDto) request.getSession().getAttribute("loginUser");
        if(user == null){
            return null;
        }

        List<OrderResponseDto> orderStateDtoList = orderMapper.findListOrderStateDto(user.getUserId(), offset, statusCode,limit);

        if(orderStateDtoList.isEmpty()){
            return null;
        }

        List<Long> orderSeqs = new ArrayList<>();
        for (OrderResponseDto orderStateDto : orderStateDtoList) {
            orderSeqs.add(orderStateDto.getOrderSeq());
        }

        //상품상세 가져오기
        List<OrderProductDto> orderProductDtos = orderMapper.findOrderProductList(orderSeqs);
        Long seq = orderProductDtos.get(0).getOrderSeq();

        //상품 상세 배열 orderStateDto에 넣기
        int i = 0;
        List<OrderProductDto> flatList = new ArrayList<>();
        for (OrderProductDto orderProductDto : orderProductDtos) {
            if(orderProductDto.getOrderSeq().equals(seq)){
                flatList.add(orderProductDto);
            }else{
                seq = orderProductDto.getOrderSeq();
                orderStateDtoList.get(i++).setOrderProductDtos(flatList);
                flatList = new ArrayList<>();
                flatList.add(orderProductDto);
            }
        }
        orderStateDtoList.get(i).setOrderProductDtos(flatList);
        return orderStateDtoList;
    }

    @Transactional
    public Integer cancelOrder(HttpServletRequest request, Long orderSeq) {
        SessionDto user = (SessionDto) request.getSession().getAttribute("loginUser");
        if(user == null){
            return null;
        }
        Integer cancelResult = orderMapper.cancelOrder(user.getUserId(), orderSeq);
        return cancelResult;
    }

    public Integer orderPageCount(HttpServletRequest request, Integer num, Boolean statusCode) {
        SessionDto loginUser = (SessionDto) request.getSession().getAttribute("loginUser");
        if(loginUser == null || loginUser.getUserId() == null){
            return null;
        }
        Integer count = orderMapper.orderPageCount(loginUser.getUserId(), statusCode);
        if(count % num != 0){
            return count / num + 1;
        }
        return count / num;
    }

    public Integer getPurchaseCount(String userId) {
        Integer count = orderMapper.getPurchaseCount(userId);
        return count;
    }
}
