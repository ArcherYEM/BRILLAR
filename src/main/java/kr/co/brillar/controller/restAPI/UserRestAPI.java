package kr.co.brillar.controller.restAPI;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import kr.co.brillar.dto.SessionDto;
import kr.co.brillar.dto.UserDto;
import kr.co.brillar.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserRestAPI {

    private final UserService userService;

    // user정보 sessionDto로 불러오기
    @GetMapping("/sessionUser")
    public ResponseEntity<?> getUserToSessionDto(HttpSession session) {
        SessionDto user = (SessionDto) session.getAttribute("loginUser");

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.ok(null);
        }
    }
    
    // user정보 userDto로 불러오기
    @GetMapping("/dtoUser")
    public ResponseEntity<?> getUserToUserDto(HttpSession session) {
        SessionDto sessionUser = (SessionDto) session.getAttribute("loginUser");
        UserDto user = userService.getUser(sessionUser.getUserId());

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인정보 없음");
        }
    }

    // user정보 수정
    @PostMapping("/update")
    public int postMethodName(UserDto userDto, HttpSession session) {
        int result = userService.updateUser(userDto);
        
        if (result == 1) {
            return result;
        }
        return result;
    }
    
    
    // 회원탈퇴
    @PostMapping("/delete")
    public int postMethodName(@RequestParam(required = true) String userId,
                              @RequestParam(required = true) String userPassword) {

        int result = userService.deleteUser(userId, userPassword);
        
        return result;
    }
    
}
