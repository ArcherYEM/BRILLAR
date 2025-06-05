package kr.co.brillar.service;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.brillar.dto.KakaoApproveResponse;
import kr.co.brillar.dto.KakaoReadyResponse;
import kr.co.brillar.dto.SessionDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class KakaoPayService {

    @Value("${kakao.pay.key}")
    private String apiKey;

    public KakaoReadyResponse payload(String productName, Integer totalPrice, HttpServletRequest request){

        SessionDto loginUser = (SessionDto) request.getSession().getAttribute("loginUser");

        Map<String, String> parameters = new HashMap<>();
        parameters.put("cid", "TC0ONETIME");
        parameters.put("partner_order_id", "11111");
        parameters.put("partner_user_id", loginUser.getUserId());
        parameters.put("item_name", productName);
        parameters.put("quantity","1");
        parameters.put("total_amount", String.valueOf(totalPrice));
        parameters.put("tax_free_amount","0");
        parameters.put("approval_url", "http://localhost:8080/kakao/pay/completed");
        parameters.put("cancel_url", "http://localhost:8080/kakao/pay/cancel");
        parameters.put("fail_url", "http://localhost:8080/kakao/pay/fail");

        HttpEntity<Map<String,String>> requestEntity = new HttpEntity<>(parameters, getHeaders());

        RestTemplate template = new RestTemplate();
        ResponseEntity<KakaoReadyResponse> responseEntity =
                template.postForEntity(
                        "https://open-api.kakaopay.com/online/v1/payment/ready",
                        requestEntity,
                        KakaoReadyResponse.class);

        request.getSession().setAttribute("tid",responseEntity.getBody().getTid());
        return responseEntity.getBody();
    }

    public KakaoApproveResponse payApprove(String pg_token,HttpServletRequest request){
        String tid = (String) request.getSession().getAttribute("tid");

        Map<String,String> parameters = new HashMap<>();
        parameters.put("cid","TC0ONETIME");
        parameters.put("tid", tid);
        parameters.put("partner_order_id","11111");
        parameters.put("partner_user_id","10");
        parameters.put("pg_token", pg_token);

        HttpEntity<Map<String,String>> requestEntity = new HttpEntity<>(parameters, getHeaders());

        RestTemplate restTemplate = new RestTemplate();
        KakaoApproveResponse response = restTemplate.postForObject(
                "https://open-api.kakaopay.com/online/v1/payment/approve",
                requestEntity,
                KakaoApproveResponse.class
        );
        return response;
    }

    private HttpHeaders getHeaders(){
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "SECRET_KEY " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        return headers;
    }
}
