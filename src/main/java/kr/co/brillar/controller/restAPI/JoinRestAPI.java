package kr.co.brillar.controller.restAPI;

import kr.co.brillar.dto.UserDto;
import kr.co.brillar.service.JoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/join")
public class JoinRestAPI {
    private final JoinService joinService;
    private final BCryptPasswordEncoder passwordEncoder;

    // 중복확인
    @GetMapping("/duplicate")
    @ResponseBody
    public int isDuplicate(@RequestParam("data") String data,
                           @RequestParam("flag") int flag) {
        Map<String, Object> param = new HashMap<>();
        param.put("data", data);
        param.put("flag", flag); // 1: 아이디, 2: 이메일, 3: 휴대폰번호

        int rst = -1;
        if (0 < flag && flag < 4){
            rst = joinService.isDuplicate(param);
        }

        return rst;
    }

    // 회원가입
    @PostMapping("/register")
    public String register(UserDto user){
        String encodedPwd = passwordEncoder.encode(user.getUserPassword());
        user.setUserPassword(encodedPwd);

        String rst = joinService.register(user);

        return rst;
    }
}
