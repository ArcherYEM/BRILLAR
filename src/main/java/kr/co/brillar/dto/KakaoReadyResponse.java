package kr.co.brillar.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KakaoReadyResponse {

    private String tid;
    private String next_redirect_pc_url;

}
