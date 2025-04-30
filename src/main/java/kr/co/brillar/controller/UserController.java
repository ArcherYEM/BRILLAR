package kr.co.brillar.controller;


import jakarta.validation.Valid;
import kr.co.brillar.dto.JoinRequest;
import kr.co.brillar.service.user.JoinService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    private final JoinService joinService;

    public UserController(JoinService joinService){
        this.joinService = joinService;
    }

    //회원가입
    @GetMapping("/join")
    public String joinForm(Model model){
        model.addAttribute("joinRequest", new JoinRequest());
        return "join/register";
    }

    //회원가입 Post
    @PostMapping("/join")
    public String join(@Valid @ModelAttribute("joinRequest")JoinRequest joinRequest, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            //유효성 검증실패하면 -> 다시 회원가입 폼 보여주기
            return "join/register";
        }

        //유효성 통과 -> 회원가입 처리
        joinService.register(joinRequest);

        //회원가입 완료 -> 로그인 페이지로 이동
        return "redirect:/login";
    }




}




