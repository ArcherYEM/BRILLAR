package kr.co.brillar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MainDto {

    private int productSeq;
    private int groupId;
    private String productName;
    private int price;
    private String productDesc;
    private String imageUrl;
    private String discountSeq;
}
