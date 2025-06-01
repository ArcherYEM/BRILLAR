package kr.co.brillar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpSession;
import kr.co.brillar.dto.SessionDto;

@Controller
@RequestMapping("/cart")
public class CartController {

    // 장바구니 페이지
    @GetMapping({ "", "/" })
    public String index(HttpSession session) {

        SessionDto user = (SessionDto) session.getAttribute("loginUser");

        if (user == null) {
            return "redirect:/login";
        }
        
        return "cart/list";
    }
}
