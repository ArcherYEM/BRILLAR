package kr.co.brillar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/notice")
public class NoticeController {

    //공지사항 리스트 페이지
    @GetMapping({ "", "/" })
    public String notice() {
        return "notice/list";
    }

    //상세보기 페이지
    @GetMapping("/{noticeSeq}")
    public String viewPage(){return "notice/view"; }


}
