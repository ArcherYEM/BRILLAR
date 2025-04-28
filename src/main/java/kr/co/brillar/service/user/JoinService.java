package kr.co.brillar.service.user;

import kr.co.brillar.dto.user.request.JoinRequest;
import org.springframework.stereotype.Service;

public interface JoinService {
    void register(JoinRequest joinRequest);



}
