package kr.co.brillar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpSession;
import kr.co.brillar.dto.SessionDto;

@Controller
@RequestMapping("/orderComplete")
public class OrderComplete {
    
    @GetMapping("/{orderSeq}")
    public String getMethodName(HttpSession session) {
        SessionDto user = (SessionDto) session.getAttribute("loginUser");

        if (user == null) {
            return "redirect:/login";
        }
        
        return "cart/orderComplete";
    }
    
}
