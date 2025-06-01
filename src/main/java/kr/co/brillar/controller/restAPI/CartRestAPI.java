package kr.co.brillar.controller.restAPI;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import kr.co.brillar.dto.CartDto;
import kr.co.brillar.dto.SessionDto;
import kr.co.brillar.service.CartService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartRestAPI {
    
    private final CartService cartService;
    
    // 장바구니 품목 리스트
    @GetMapping("/list")
    public List<CartDto> getCartList(HttpSession session) {
        SessionDto loginUser = (SessionDto) session.getAttribute("loginUser");

        List<CartDto> cartList =  cartService.getItems(loginUser.getUserId());

        return cartList;
    }
    
    // 주문내역 총 합산
    @GetMapping("/result")
    public CartDto getGrandTotal(HttpSession session) {
        SessionDto loginUser = (SessionDto) session.getAttribute("loginUser");

        CartDto result = cartService.grandTotal(loginUser.getUserId());

        return result;
    }

    // 물품 수량증가
    @PostMapping("/quantityInc")
    public boolean postQuantityInc(@RequestParam int cartSeq, @RequestParam int productSeq) {
        
        boolean result = cartService.quantityInc(cartSeq, productSeq);
        
        return result;
    }

    // 물품 수량감소
    @PostMapping("/quantityDec")
    public boolean postQuantityDec(@RequestParam int cartSeq, @RequestParam int productSeq) {
        
        boolean result = cartService.quantityDec(cartSeq, productSeq);
        
        return result;
    }

    // 목록에서 물품 삭제
    @PostMapping("/delete")
    public boolean postDelete(@RequestParam int cartSeq, @RequestParam int productSeq) {

        boolean result = cartService.deleteItem(cartSeq, productSeq);
        
        return result;
    }
    
    // 직접 수량변경
    @PostMapping("/quantityChange")
    public boolean postQuantityChange(@RequestParam int cartSeq, 
                                      @RequestParam int productSeq, 
                                      @RequestParam int quantity) {
        
        boolean result = cartService.quantityChange(cartSeq, productSeq, quantity);
        
        return result;
    }
    
    
}
