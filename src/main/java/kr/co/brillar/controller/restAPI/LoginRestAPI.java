package kr.co.brillar.controller.restAPI;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import kr.co.brillar.dto.UserDto;
import kr.co.brillar.service.LoginService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginRestAPI {

    private final LoginService loginService;

    @GetMapping("/login")
    public UserDto getMethodName(@RequestParam String userId, @RequestParam String userPassword, HttpSession session) {
        UserDto user = loginService.login(userId, userPassword);

        if (user != null) {
            session.setAttribute("loginUser", user);
            return user;
        } else {
            return user;
        }
    }
    
    @GetMapping("/userInfo")
    public ResponseEntity<?> getUserInfo(HttpSession session) {
        UserDto user = (UserDto) session.getAttribute("loginUser");

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인정보 없음");
        }
    }

    @PostMapping("/logout")
    public String logout(HttpSession session) {
    session.invalidate(); 
    return "redirect:/login/login"; 
}
}
