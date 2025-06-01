package kr.co.brillar.service;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.brillar.dto.QnaDto;
import kr.co.brillar.dto.QnaViewDto;
import kr.co.brillar.dto.SessionDto;
import kr.co.brillar.mapper.QnaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QnaService {

    private final QnaMapper qnaMapper;

    @Transactional
    public Integer saveQna(QnaDto qnaDto, HttpServletRequest request) {

        SessionDto user = (SessionDto) request.getSession().getAttribute("loginUser");
        if(user == null){
            return null;
        }

        qnaDto.setUserId(user.getUserId());
        qnaDto.setUserName(user.getUserName());

        Integer result = qnaMapper.saveQna(qnaDto);
        return result;
    }

    public List<QnaDto> findQnaList(Integer page) {
        Integer offset = 0;
        if(page != null){
            offset = (page-1) * 10;
        }
        List<QnaDto> qnaList = qnaMapper.findQnaList(offset);
        return qnaList;
    }

    public Integer findQnaCount(){
        Integer count = qnaMapper.findQnaCount();
        return count / 10 + 1;
    }

    public QnaViewDto findQnaContent(Long qnaSeq) {
        QnaViewDto qna = qnaMapper.findQnaContent(qnaSeq);
        return qna;
    }

    @Transactional
    public Integer saveQnaAnswer(QnaViewDto qnaViewDto, HttpServletRequest request) {
        SessionDto user = (SessionDto) request.getSession().getAttribute("loginUser");
        if(!user.getUserRoleCode().toLowerCase().equals("admin")){
            return null;
        }

        qnaViewDto.setAnswerId(user.getUserId());
        qnaViewDto.setAnswerName(user.getUserName());
        Integer result = qnaMapper.saveQnaAnswer(qnaViewDto);
        return result;
    }

    @Transactional
    public Integer deleteQna(Long qnaSeq, String userId,HttpServletRequest request) {
        SessionDto loginUser = (SessionDto) request.getSession().getAttribute("loginUser");
        if(!loginUser.getUserId().equals(userId)){
            return null;
        }
        Integer result = qnaMapper.deleteQna(qnaSeq);
        return result;
    }

    @Transactional
    public Integer deleteQnaAnswer(Long qnaSeq, HttpServletRequest request) {
        SessionDto loginUser = (SessionDto) request.getSession().getAttribute("loginUser");
        if(!loginUser.getUserRoleCode().toLowerCase().equals("admin")){
            return null;
        }
        Integer resultCount = qnaMapper.deleteQnaAnswer(qnaSeq);
        return resultCount;
    }
}
