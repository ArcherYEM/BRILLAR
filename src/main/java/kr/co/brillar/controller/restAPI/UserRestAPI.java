package kr.co.brillar.controller.restAPI;

import kr.co.brillar.mapper.UserMapper;
import kr.co.brillar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserRestAPI {

    private final UserService userService;
    private final UserMapper userMapper;

    //로그인 API
    @PostMapping("/login")
    public


}
