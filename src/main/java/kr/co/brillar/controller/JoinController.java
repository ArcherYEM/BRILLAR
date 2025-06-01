package kr.co.brillar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpSession;
import kr.co.brillar.dto.SessionDto;

@Controller
@RequestMapping("/join")
public class JoinController {

    //회원가입 페이지
    @GetMapping({ "", "/" })
    public String join(HttpSession session) {
        SessionDto user = (SessionDto) session.getAttribute("loginUser");

        if (user != null) {
            return "redirect:/";
        }
        
        return "join/join";
    }

}
