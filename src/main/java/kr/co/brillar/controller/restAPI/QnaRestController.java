package kr.co.brillar.controller.restAPI;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.brillar.dto.QnaDto;
import kr.co.brillar.dto.QnaViewDto;
import kr.co.brillar.service.QnaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/qna")
@RequiredArgsConstructor
public class QnaRestController {

    private final QnaService qnaService;

    @GetMapping("/list")
    public List<QnaDto> findQnaList(@RequestParam(required = false) Integer page){
        List<QnaDto> qnaList = qnaService.findQnaList(page);
        return qnaList;
    }
    //qna 등록
    @PostMapping("/save")
    public Integer saveQna(@RequestBody QnaDto qnaDto, HttpServletRequest request){
        Integer result = qnaService.saveQna(qnaDto, request);
        return result;
    }
    @GetMapping("/count")
    public Integer findQnaCount(){
        Integer count = qnaService.findQnaCount();
        return count;
    }
    //글 상세 페이지
    @GetMapping("/{qnaSeq}")
    public QnaViewDto findQnaContent(@PathVariable Long qnaSeq){
        QnaViewDto qna = qnaService.findQnaContent(qnaSeq);
        return qna;
    }
    //답변 저장
    @PostMapping("/answer/save")
    public Integer saveQnaAnswer(@RequestBody QnaViewDto qnaViewDto, HttpServletRequest request){
        Integer result = qnaService.saveQnaAnswer(qnaViewDto, request);
        return result;
    }
    @PostMapping("/delete")
    public Integer deleteQna(@RequestParam Long qnaSeq, @RequestParam String userId, HttpServletRequest request){
        Integer deleteResult = qnaService.deleteQna(qnaSeq, userId, request);
        return deleteResult;
    }

    @PostMapping("/delete-answer")
    public Integer deleteQnaAnswer(@RequestParam Long qnaSeq, HttpServletRequest request){
        Integer result = qnaService.deleteQnaAnswer(qnaSeq, request);
        return result;
    }
}
