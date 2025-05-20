package kr.co.brillar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DetailDto {
    
    // 아이템 상세
    private int productSeq;
    private String discountRate;
    private int reducedPrice;
    private Integer groupId;
    private String productName;
    private String productDesc;
    private Integer price;
    private String imageURL;
    private Double score;
    private String isClose;

    // 아이템 옵션
    private int materialSeq;
    private String materialName;
    private String materialCode;
    private int productSizeSeq;
    private String sizeName;

    // 리뷰 리스트
}
