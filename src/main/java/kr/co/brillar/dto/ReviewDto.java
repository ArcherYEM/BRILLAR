package kr.co.brillar.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReviewDto {

    private Long reviewSeq;
    private Long productSeq;
    private String userId;
    private String userName;
    private Integer score;
    private String contents;
    private String imageUrl;
    private String createdAt;
    private String productName;

}
