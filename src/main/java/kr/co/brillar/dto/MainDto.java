package kr.co.brillar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MainDto {

    private int productId;
    private int groupId;
    private String productName;
    private int price;
    private String productDesc;
    private String imageUrl;
}
