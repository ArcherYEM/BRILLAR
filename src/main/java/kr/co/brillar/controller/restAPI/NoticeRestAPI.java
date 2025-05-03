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

    @GetMapping("/getList")
    @ResponseBody
    public List<NoticeDto> getList() {
        List<NoticeDto> noticeDtoList = noticeService.getList();

        return noticeDtoList;
    }
    @GetMapping("/list")
    public List<NoticeDto> getPageList(@RequestParam(defaultValue = "1")int page,
                                       @RequestParam(defaultValue = "10")int size){
        return noticeService.getPageList(page, size);
    }
}
