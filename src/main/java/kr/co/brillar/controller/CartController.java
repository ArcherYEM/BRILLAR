package kr.co.brillar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cart")
public class CartController {

    // 장바구니 페이지
    @GetMapping({ "", "/" })
    public String index() {
        return "cart/list";
    }
}
