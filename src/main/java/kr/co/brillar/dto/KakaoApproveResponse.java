package kr.co.brillar.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KakaoApproveResponse {

    private String cid;
    private String tid;
    private String partner_order_id;
    private String partner_user_id;
    private String pg_token;
    
}
