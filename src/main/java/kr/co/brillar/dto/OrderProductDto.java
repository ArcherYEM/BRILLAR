package kr.co.brillar.dto;

import jakarta.annotation.security.DenyAll;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderProductDto {

    private Long orderSeq;
    private String productName;
    private String imageURL;
    private Integer price;
    private Integer count;
    private Integer unitPrice;

}
