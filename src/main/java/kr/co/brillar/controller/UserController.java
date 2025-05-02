package kr.co.brillar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {

    //마이페이지
    @GetMapping({ "", "/" })
    public String myPage() {
        return "user/myPage";
    }
}
