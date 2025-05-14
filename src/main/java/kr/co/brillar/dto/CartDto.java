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
    private String imageURL;
    private String materialName;
    private String sizeName;
    private String orderMemo;
    private int quantity;
    private int totalQuantity;
    private int price;
    private int reducedPrice;
    private String discountRate;
    private int totalPrice;
    private int totalDiscountPrice;
    private int totalCost;
    private String receiverName;
    private String senderName;
    private String receiverPhoneNumber;
    private String receiverEmail;
    private String receiverAddr1;
    private String receiverAddr2;
}
