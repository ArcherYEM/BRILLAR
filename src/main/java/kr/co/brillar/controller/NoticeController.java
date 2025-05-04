package kr.co.brillar.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/notice")
public class NoticeController {

    //공지사항 리스트 페이지
    @GetMapping({ "", "/" })
    public String notice() {
        return "notice/list";
    }

    //공지사항 글 상세보기 페이지
    @GetMapping("/{noticeSeq}")
    public String viewPage(@PathVariable String noticeSeq){
        return "notice/view"; }

    //공지사항 글쓰기 페이지
    @GetMapping("/register")
    public String noticeRegister(HttpServletRequest request){
        Object loginUser = request.getSession().getAttribute("loginUser");
        if(loginUser == null){
         return "redirect:/notice";
        }
        return "notice/register";
    }
}
