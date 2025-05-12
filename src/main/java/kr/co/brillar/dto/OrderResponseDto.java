package kr.co.brillar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {

    private Long orderSeq;
    private String statusName;
    private String receiveName;
    private Integer amount;
    private String orderDate;
    private String addr1;
    private String addr2;
    private String deliveryMemo;
    private String payType;
    private List<OrderProductDto> orderProductDtos;

}
