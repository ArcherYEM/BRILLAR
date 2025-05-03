package kr.co.brillar.controller.restAPI;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserRestAPI {


    //로그인 API
    @PostMapping("/login")
    public void login(){

    }


}
