package kr.co.brillar.controller.restAPI;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import kr.co.brillar.dto.CartDto;
import kr.co.brillar.dto.SessionDto;
import kr.co.brillar.service.CartService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartRestAPI {
    
    private final CartService cartService;
    
    @GetMapping("/list")
    public List<CartDto> getCartList(HttpSession session) {
        SessionDto loginUser = (SessionDto) session.getAttribute("loginUser");

        List<CartDto> cartList =  cartService.getItems(loginUser.getUserId());
        
        return cartList;
    }
    
    @GetMapping("/result")
    public CartDto getGrandTotal(HttpSession session) {
        SessionDto loginUser = (SessionDto) session.getAttribute("loginUser");

        CartDto result = cartService.grandTotal(loginUser.getUserId());

        return result;
    }
    
}
