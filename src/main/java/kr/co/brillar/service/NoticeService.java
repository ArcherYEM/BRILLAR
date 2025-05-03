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

      //신상품 리스트 + 페이지네이션 ( 총 게시글 개수를  NoticeDTO의 totalCount에 설정)
    public List<NoticeDto> getPageList(int page, int size){
        int offset = (page - 1) * size;
        List<NoticeDto> list = noticeMapper.getPageList(offset, size);
        int totalCount = noticeMapper.getTotalCount();

        if(!list.isEmpty()){
            list.get(0).setTotalCount(totalCount);
        }
        return list;
    }
}
