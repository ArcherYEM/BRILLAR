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
    
    // 장바구니 품목 관련
    private String productName;
    private int productSeq;
    private String imageURL;
    private String materialName;
    private String sizeName;
    private String orderMemo;
    private int quantity;
    private int price;
    private int reducedPrice;
    private String discountRate;
    private int cartSeq;

    // 주문내역 관련
    private int totalQuantity;
    private int totalPrice;
    private int totalDiscountPrice;
    private int totalCost;

    // 배송정보 관련
    private String receiverName;
    private String senderName;
    private String receiverPhoneNumber;
    private String receiverEmail;
    private String receiverAddr1;
    private String receiverAddr2;
}
