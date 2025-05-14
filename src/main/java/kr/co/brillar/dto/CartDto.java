package kr.co.brillar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartDto {
    
    private String productName;
    private String materialName;
    private String sizeName;
    private String orderMemo;
    private int quantity;
    private int price;
    private int discountPrice;
    private int discountRate;
    private String receiverName;
    private String senderName;
    private String receiverPhoneNumber;
    private String receiverEmail;
    private String receiverAddr1;
    private String receiverAddr2;
}
