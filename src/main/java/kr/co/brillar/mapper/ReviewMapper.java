package kr.co.brillar.mapper;

import kr.co.brillar.dto.ReviewDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {

    Integer saveReview(ReviewDto reviewDto);

    List<ReviewDto> findReviewList(Long productSeq);
}
