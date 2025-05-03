package kr.co.brillar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/events")
public class EventController {

    // 이벤트 페이지
    @GetMapping({ "", "/" })
    public String index() {
        return "events/list";
    }
}
