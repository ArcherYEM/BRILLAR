package kr.co.brillar.controller.restAPI;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import kr.co.brillar.dto.OrderCompleteDto;
import kr.co.brillar.dto.SessionDto;
import kr.co.brillar.service.OrderCompleteService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    @PostMapping("/updateStock")
    public ResponseEntity<?> postUpdateStock(HttpSession session) {
        SessionDto user = (SessionDto) session.getAttribute("loginUser");

        List<String> noStockNames = service.updateStock(user.getUserId());

        String msg = "다음 상품의 재고가 부족하여 주문이 취소되었습니다 : " + 
                    String.join(", ", noStockNames);

        if (!noStockNames.isEmpty()) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(msg);
        }
        
        return ResponseEntity.ok("주문이 완료되었습니다");
    }

    @PostMapping("/stockWork")
    public void postStockWork(HttpSession session) {
        SessionDto user = (SessionDto) session.getAttribute("loginUser");
        service.stockWork(user.getUserId());
    }
    
    @DeleteMapping("/deleteCart")
    public void deleteCart(HttpSession session) {
        SessionDto user = (SessionDto) session.getAttribute("loginUser");
        service.deleteCart(user.getUserId());
    }

    // ============================주문 완료 페이지=============================
    @GetMapping("/myOrder")
    public OrderCompleteDto getOrderInfo(int orderSeq, HttpSession session) {
        SessionDto user = (SessionDto) session.getAttribute("loginUser");
        
        OrderCompleteDto orderInfo = service.getOrderInfo(user.getUserId(), orderSeq);
        
        return orderInfo;
    }

    @GetMapping("/myItem")
    public List<OrderCompleteDto> getDetailInfo(int orderSeq) {
        
        List<OrderCompleteDto> itemDetail = service.getDetailInfo(orderSeq);
        
        return itemDetail;
    }
}
