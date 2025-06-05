package kr.co.brillar.controller.restAPI;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import kr.co.brillar.dto.KakaoApproveResponse;
import kr.co.brillar.dto.KakaoReadyResponse;
import kr.co.brillar.service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@RequestMapping("/kakao")
public class KakaoOrderController {

    private final KakaoPayService kakaoPayService;
    @PostMapping("/pay/ready")
    public ResponseEntity<KakaoReadyResponse> payReady(@RequestParam String productName, @RequestParam Integer totalPrice,
                                                       HttpServletRequest request){
        KakaoReadyResponse payload = kakaoPayService.payload(productName, totalPrice, request);
        return ResponseEntity.ok(payload);
    }

    @GetMapping("/pay/completed")
    public String payCompleted(@RequestParam String pg_token,HttpServletRequest request){
        KakaoApproveResponse response = kakaoPayService.payApprove(pg_token, request);
        return "/cart/orderComplete";
    }

    @GetMapping("/pay/cancel")
    public String payCancel(){
        return "redirect:/";
    }

    @GetMapping("/pay/fail")
    public String payFail(){
        return "redirect:/";
    }
}
