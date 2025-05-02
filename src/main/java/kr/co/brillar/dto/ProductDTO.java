package kr.co.brillar.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class ProductDTO {

    private Long productSeq;
    private Long discountSeq;
    private Integer groupId;
    private String productName;
    private String productDesc;
    private Integer price;
    private String imageURL;
    private Double score;
    private String isClose;

}
