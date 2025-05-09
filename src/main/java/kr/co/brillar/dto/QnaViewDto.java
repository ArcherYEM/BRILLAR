package kr.co.brillar.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QnaViewDto {

    private Long qnaSeq;
    private String userId;
    private String userName;
    private String title;
    private String contents;
    private String createdAt;
    private String answerId;
    private String answerName;
    private String answerContents;
    private String answerCreatedAt;
}
