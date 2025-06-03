package kr.co.brillar.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewResponseDto {

    private Long reviewSeq;
    private Long productSeq;
    private String userName;
    private Integer score;
    private String contents;
    private String imageUrl;
    private String createdAt;
    private String productName;
    private Boolean checkUser;

}
