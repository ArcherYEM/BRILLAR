package kr.co.brillar.controller.restAPI;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.brillar.dto.ReviewDto;
import kr.co.brillar.dto.ReviewRequestDto;
import kr.co.brillar.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review")
public class ReviewRestAPI {

    private final ReviewService reviewService;

    @GetMapping("/{productSeq}")
    public List<ReviewDto> findReviewList(@PathVariable Long productSeq){
        if(productSeq == null){
            return null;
        }
        List<ReviewDto> reviewList = reviewService.findReviewList(productSeq);
        return reviewList;
    }

    @PostMapping("/save")
    public Integer saveReview(@ModelAttribute ReviewRequestDto reviewRequestDto, HttpServletRequest request){
        Integer result = reviewService.saveReview(reviewRequestDto, request);
        return result;
    }
}
