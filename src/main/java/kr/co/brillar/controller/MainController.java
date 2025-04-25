package kr.co.brillar.controller;

import kr.co.brillar.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @Autowired
    private final MainService mainService;
    public MainController(MainService mainService) {
        this.mainService = mainService;
    }

    // 메인페이지 조회
    @GetMapping("/")
    public String index(){
        String name = mainService.getTest();
        return "main/index";
    }
}
