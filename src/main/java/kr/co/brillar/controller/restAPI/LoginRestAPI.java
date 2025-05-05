package kr.co.brillar.controller.restAPI;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import kr.co.brillar.dto.SessionDto;
import kr.co.brillar.service.LoginService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginRestAPI {

    private final LoginService loginService;

    // 로그인 API
    @GetMapping("/login")
    public SessionDto getMethodName(@RequestParam String userId, @RequestParam String userPassword, HttpSession session) {
        SessionDto user = loginService.login(userId, userPassword);

        if (user != null) {
            session.setAttribute("loginUser", user);
            return user;
        } else {
            return user;
        }
    }

    // 헤더 유저 정보띄우기
    @GetMapping("/header")
    public SessionDto getMethodName(HttpSession session) {
        SessionDto user = (SessionDto) session.getAttribute("loginUser");
        SessionDto headerUser = loginService.header(user.getUserId());
        
        return headerUser;
    }
    
    
    // 로그아웃 API
    @PostMapping("/logout")
    public String logout(HttpSession session) {
    session.invalidate(); 
    return "redirect:/login/login"; 
}
}
