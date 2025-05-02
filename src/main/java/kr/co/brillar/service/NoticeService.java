package kr.co.brillar.service;

import kr.co.brillar.dto.NoticeDto;
import kr.co.brillar.mapper.NoticeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeMapper noticeMapper;

    // 공지사항 리스트
    public List<NoticeDto> getList() {
        return noticeMapper.getList();
    }
}
