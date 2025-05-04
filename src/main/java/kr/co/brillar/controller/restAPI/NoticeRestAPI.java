package kr.co.brillar.controller.restAPI;

import kr.co.brillar.dto.NoticeDto;
import kr.co.brillar.service.NoticeCommentService;
import kr.co.brillar.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeRestAPI {
    private final NoticeService noticeService;

    // 공지사항 리스트 API - 페이지네이션 처리된 리스트 반환
    @GetMapping("/list")
    public List<NoticeDto> getPageList(@RequestParam(name = "page", defaultValue = "1")int page,
                                       @RequestParam(name = "size", defaultValue = "10")int size){
        List<NoticeDto> listPage = noticeService.getPageList(page, size);
        return listPage;
    }

    //글 상세보기 페이지
    @GetMapping("/{noticeSeq}")
    public NoticeDto getReadPage(@PathVariable int noticeSeq){
        NoticeDto noticeDetail = noticeService.getNoticeById(noticeSeq);
        return noticeDetail;
    }
}
