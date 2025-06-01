package kr.co.brillar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("detail")
public class DetailController {
    
    @GetMapping("/{productSeq}")
    public String showDetail() {
        return "shop/detail";
    }
}
