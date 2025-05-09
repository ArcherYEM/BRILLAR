package kr.co.brillar.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class QnaDto {

    private Long qnaSeq;
    private String userId;
    private String userName;
    private String title;
    private String contents;
    private String createdAt;
    private String answerId;

}
