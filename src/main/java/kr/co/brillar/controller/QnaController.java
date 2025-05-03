package kr.co.brillar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/qna")
public class QnaController {

    // Q&A 페이지
    @GetMapping({ "", "/" })
    public String index() {
        return "qna/list";
    }
}
