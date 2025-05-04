package kr.co.brillar.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeDto {
    // 테이블
    private int noticeSeq;
    private String userId;
    private String userName;
    private String title;
    private String contents;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    //페이징
    private Integer totalCount;
}
