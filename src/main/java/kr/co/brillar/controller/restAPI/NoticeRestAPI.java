package kr.co.brillar.controller.restAPI;

import kr.co.brillar.dto.NoticeDto;
import kr.co.brillar.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
}
