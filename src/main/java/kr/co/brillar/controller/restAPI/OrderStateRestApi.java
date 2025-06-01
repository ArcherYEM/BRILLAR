package kr.co.brillar.controller.restAPI;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.brillar.dto.OrderResponseDto;
import kr.co.brillar.service.OrderStateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/order-state")
public class OrderStateRestApi {

    private final OrderStateService orderStateService;

    //statusCode가 존재할시 주문확인, 입금대기, 배송중만 조회
    @GetMapping("/list")
    public List<OrderResponseDto> findListOrderDto(HttpServletRequest request,
                                                   @RequestParam(defaultValue = "0")Integer offset,
                                                   @RequestParam(required = false)Boolean statusCode,
                                                   @RequestParam Integer limit) {
        List<OrderResponseDto> orderStateDtoList = orderStateService.findListOrderStateDto(request, offset, statusCode,limit);
        return orderStateDtoList;
    }

    @PostMapping("/cancel/{orderSeq}")
    public Integer cancelOrder(HttpServletRequest request, @PathVariable Long orderSeq){
        Integer cancelResult = orderStateService.cancelOrder(request, orderSeq);
        return cancelResult;
    }

    @GetMapping("/count")
    public Integer orderPageCount(HttpServletRequest request, @RequestParam Integer num, @RequestParam Boolean statusCode){
        Integer count = orderStateService.orderPageCount(request, num, statusCode);
        return count;
    }

}
