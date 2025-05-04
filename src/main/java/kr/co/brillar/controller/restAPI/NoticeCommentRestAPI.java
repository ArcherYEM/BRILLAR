package kr.co.brillar.controller.restAPI;

import jakarta.servlet.http.HttpSession;
import kr.co.brillar.dto.NoticeCommentDto;
import kr.co.brillar.dto.SessionDto;
import kr.co.brillar.service.NoticeCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/noticeComment")
public class NoticeCommentRestAPI {
    private final NoticeCommentService noticeCommentService;

    // 댓글 등록
    @PostMapping("/insertCmt")
    public int insertCmt(@RequestBody NoticeCommentDto noticeCmtDto, HttpSession session){
        SessionDto loginUser = (SessionDto) session.getAttribute("loginUser");

        if (loginUser == null) {
            return -1; // 비로그인
        }

        noticeCmtDto.setUserId(loginUser.getUserId());
        noticeCmtDto.setUserName(loginUser.getUserName());

        boolean result = noticeCommentService.insertCmt(noticeCmtDto);

        if (result){
            return 1;
        } else {
            return 0;
        }
    }

    // 댓글 조회
    @GetMapping("/getCmt")
    public List<NoticeCommentDto> getCmt(@RequestParam int noticeSeq){
        List<NoticeCommentDto> noticeCmtList = noticeCommentService.getCmt(noticeSeq);

        return noticeCmtList;
    }
}
