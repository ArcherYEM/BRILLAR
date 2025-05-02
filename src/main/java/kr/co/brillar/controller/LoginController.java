package kr.co.brillar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
public class LoginController {

    //공지사항 리스트 페이지
    @GetMapping({ "", "/" })
    public String login() {
        return "login/login";
    }
}
