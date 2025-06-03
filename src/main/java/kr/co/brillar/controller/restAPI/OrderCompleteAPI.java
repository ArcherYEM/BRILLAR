package kr.co.brillar.controller.restAPI;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import kr.co.brillar.dto.OrderCompleteDto;
import kr.co.brillar.dto.SessionDto;
import kr.co.brillar.service.OrderCompleteService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/orderComplete")
@RequiredArgsConstructor
public class OrderCompleteAPI {

    private final OrderCompleteService service;

    @GetMapping("/calcVal")
    public List<OrderCompleteDto> calcItemPrice(HttpSession session) {
        SessionDto user = (SessionDto) session.getAttribute("loginUser");

        List<OrderCompleteDto> dto = service.calcItemPrice(user.getUserId());
        
        return dto;
    }

    @PostMapping("/insertOrder")
    public int postOrder(HttpSession session,@RequestBody OrderCompleteDto dto) {
        SessionDto user = (SessionDto) session.getAttribute("loginUser");

        dto.setUserId(user.getUserId());

        int result = service.insertOrder(dto);
        
        return result;
    }
    
    @PostMapping("/insertDetail")
    public int postInsertDetail(@RequestBody List<OrderCompleteDto> orderCompleteDto) {

        int result = service.insertOrderDetail(orderCompleteDto);
        
        return result;
    }
}
