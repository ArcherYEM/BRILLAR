package kr.co.brillar.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class ReviewRequestDto {

    private Long productSeq;
    private Integer score;
    private String contents;
    private MultipartFile imageUrl;
}
