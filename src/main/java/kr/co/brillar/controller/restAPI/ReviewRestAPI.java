package kr.co.brillar.controller.restAPI;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.brillar.dto.ReviewDto;
import kr.co.brillar.dto.ReviewRequestDto;
import kr.co.brillar.dto.ReviewResponseDto;
import kr.co.brillar.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review")
public class ReviewRestAPI {

    private final ReviewService reviewService;

    //sortVal : 1 = 최신 순 , 2 = 별점 높은 순
    @GetMapping("/{productSeq}")
    public List<ReviewResponseDto> findReviewList(@PathVariable Long productSeq,@RequestParam(defaultValue = "1") Integer sortVal,
                                                  @RequestParam(defaultValue = "1") Integer page ,HttpServletRequest request){
        if(productSeq == null){
            return null;
        }
        List<ReviewResponseDto> reviewList = reviewService.findReviewList(productSeq,sortVal ,page ,request);
        return reviewList;
    }

    @PostMapping("/save")
    public Integer saveReview(@ModelAttribute ReviewRequestDto reviewRequestDto, HttpServletRequest request){
        Integer result = reviewService.saveReview(reviewRequestDto, request);
        return result;
    }

    @PostMapping("/delete")
    public Integer deleteReview(@RequestParam Long reviewSeq,HttpServletRequest request){
        Integer result = reviewService.deleteReview(reviewSeq, request);
        return result;
    }

    @GetMapping("/count/{productSeq}")
    public Integer findReviewCount(@PathVariable Long productSeq){
        Integer count = reviewService.findReviewCount(productSeq);
        return count;
    }

}
