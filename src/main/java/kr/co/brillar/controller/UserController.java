package kr.co.brillar.controller;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import kr.co.brillar.dto.UserDto;
import kr.co.brillar.mapper.UserMapper;
import kr.co.brillar.service.JoinServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    private final UserMapper userMapper;
    private JoinServiceImpl joinService;
   public UserController(JoinServiceImpl joinService, UserMapper userMapper) {
       this.joinService = joinService;
       this.userMapper = userMapper;
   }

    //회원가입 id중복확인 api
    @GetMapping("/check/userId")
    @ResponseBody
    public boolean checkUserId(@RequestParam String value){
       UserDto user = userMapper.findByUserId(value);
       return user != null;
    }
    //회원가입 - Email Check
    @GetMapping("/check/email")
    @ResponseBody
    public boolean checkEmail(@RequestParam String value){
       return joinService.findByEmail(value);
    }

    @GetMapping("/check/phone")
    @ResponseBody
    public boolean checkPhone(@RequestParam String value){
       return joinService.findByPhone(value);
    }


    //회원가입 get
    @GetMapping("/join")
    public String joinForm(Model model){
        model.addAttribute("joinRequestDto", new UserDto());
        return "join/register";
    }

    //회원가입 Post
    @PostMapping("/join")
    public String join(@Valid @ModelAttribute("joinRequestDto") UserDto userDto,
                       BindingResult bindingResult){
       if(bindingResult.hasErrors()){
           return "join/register";
       }

       try{
           joinService.register(userDto);
       }catch (IllegalArgumentException e){
           bindingResult.reject("passwordMismatch", e.getMessage());
           return "join/register";
       }
       return "redirect:/login";
    }

    @GetMapping("/user/mypage")
    public String myPage(){
       return "/user/mypage";
    }




}




