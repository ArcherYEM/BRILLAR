package kr.co.brillar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeCommentDto {
    // 테이블
    private int noticeCommentSeq;
    private String userId;
    private String userName;
    private String comment;
    private int noticeSeq;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    //페이징
    private Integer totalCount;
}
