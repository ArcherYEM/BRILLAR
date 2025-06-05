package kr.co.brillar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderCompleteDto {
    
    // 주문
    private String userId;
    private String statusCode;
    private int amount;
    private char payType;
    private String receiveName;
    private String addr1;
    private String addr2;

    // 주문 상세
    private int orderSeq;
    private int productSeq;
    private Integer productSizeSeq;
    private int materialSeq;
    private String orderMemo;
    private int count;
    private int unitPrice;
    private int price;

    // 주문 페이지
    private String imageURL;
    private String sizeName;
    private String materialName;

    // 재고 소진 안내 메세지용
    private String productName;

    // 재고 변동 내역기록
    private int oldStockQuantity;
    private int newStockQuantity;
    private int modifyQuantity;
    private String modifyHistory;
}
