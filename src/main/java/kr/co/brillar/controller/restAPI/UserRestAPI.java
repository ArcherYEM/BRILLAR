package kr.co.brillar.controller.restAPI;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import kr.co.brillar.dto.SessionDto;
import kr.co.brillar.dto.UserDto;
import kr.co.brillar.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserRestAPI {

    private final UserService userService;
    
    @GetMapping("/user")
    public ResponseEntity<?> getUser(HttpSession session) {
        SessionDto sessionUser = (SessionDto) session.getAttribute("loginUser");
        UserDto user = userService.getUser(sessionUser.getUserId());

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인정보 없음");
        }
    }
    
}
