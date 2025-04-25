package kr.co.brillar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    // 메인페이지 조회
    @GetMapping("/")
    public String index(){
        return "main/index";
    }
}
