package kr.co.brillar.controller;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.brillar.dto.SessionDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/qna")
public class QnaController {

    // Q&A 페이지
    @GetMapping({ "", "/" })
    public String index() {
        return "qna/list";
    }

    @GetMapping("/register")
    public String qnaRegister(HttpServletRequest request){
        SessionDto user = (SessionDto) request.getSession().getAttribute("loginUser");
        if(user == null){
            return "redirect:/login";
        }
        return "qna/register";
    }

    @GetMapping("/{qnaSeq}")
    public String viewPage(@PathVariable Long qnaSeq){
        return "qna/view";
    }

    @ResponseBody
    @GetMapping("/check-user")
    public Integer checkUser(@RequestParam String userId , HttpServletRequest request){
        SessionDto user = (SessionDto) request.getSession().getAttribute("loginUser");
        if(user.getUserRoleCode().toLowerCase().equals("admin")){
            return 0;
        }
        if(user.getUserId().equals(userId)){
            return 1;
        }

        return 2;
    }
}
