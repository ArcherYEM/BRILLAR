package kr.co.brillar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainService {
    @Autowired


    // 테스트
    public String getTest(){
        return "test";
    }
}
