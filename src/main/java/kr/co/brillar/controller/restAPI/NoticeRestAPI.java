package kr.co.brillar.controller.restAPI;

import kr.co.brillar.dto.NoticeDto;
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
    public List<NoticeDto> getPageList(@RequestParam(defaultValue = "1")int page,
                                       @RequestParam(defaultValue = "10")int size){
        return noticeService.getPageList(page, size);
    }
}
