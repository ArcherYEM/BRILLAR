package kr.co.brillar.service;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.brillar.dto.ReviewDto;
import kr.co.brillar.dto.ReviewRequestDto;
import kr.co.brillar.dto.ReviewResponseDto;
import kr.co.brillar.dto.SessionDto;
import kr.co.brillar.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewMapper reviewMapper;
    @Transactional
    public Integer saveReview(ReviewRequestDto reviewRequestDto, HttpServletRequest request) {
        SessionDto loginUser = (SessionDto) request.getSession().getAttribute("loginUser");
        if(loginUser == null || loginUser.getUserId() == null){
            return null;
        }

        String filePath = null;

        try {
            if(reviewRequestDto.getImageUrl() != null) {
                String originalFilename = reviewRequestDto.getImageUrl().getOriginalFilename();

                int pos = originalFilename.lastIndexOf(".");
                String filenameOnly = originalFilename.substring(0, pos);
                String fileName = filenameOnly + "_" + LocalDateTime.now().
                        format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) + originalFilename.substring(pos);

                String uploadDir = System.getProperty("user.dir") + "/uploads/images/review/";
                File folder = new File(uploadDir);

                if (!folder.exists()) {
                    folder.mkdirs();
                }

                File dest = new File(folder, fileName);
                reviewRequestDto.getImageUrl().transferTo(dest);

                filePath = "/images/review/" + fileName;
            }

        }catch (Exception e){
            throw new RuntimeException("이미지 저장 실패");
        }

            ReviewDto reviewDto = ReviewDto.builder()
                    .productSeq(reviewRequestDto.getProductSeq())
                    .userId(loginUser.getUserId())
                    .userName(loginUser.getUserName())
                    .score(reviewRequestDto.getScore())
                    .contents(reviewRequestDto.getContents())
                    .imageUrl(filePath)
                    .build();


            Integer result = reviewMapper.saveReview(reviewDto);
            return result;

    }

    public List<ReviewResponseDto> findReviewList(Long productSeq, Integer sortVal,Integer page,HttpServletRequest request) {
        Integer offset = (page - 1) * 10;
        List<ReviewDto> reviewList = reviewMapper.findReviewList(productSeq, sortVal, offset);

        SessionDto loginUser = (SessionDto) request.getSession().getAttribute("loginUser");
        List<ReviewResponseDto> responseDtos = new ArrayList<>();

        //로그인 유저랑 작성자 같은지 비교
        for (ReviewDto reviewDto : reviewList) {
            ReviewResponseDto build = ReviewResponseDto.builder()
                    .reviewSeq(reviewDto.getReviewSeq())
                    .productSeq(reviewDto.getProductSeq())
                    .userName(reviewDto.getUserName())
                    .imageUrl(reviewDto.getImageUrl())
                    .createdAt(reviewDto.getCreatedAt())
                    .contents(reviewDto.getContents())
                    .score(reviewDto.getScore())
                    .productName(reviewDto.getProductName())
                    .createdAt(reviewDto.getCreatedAt())
                    .build();

            if(loginUser != null) {
                if (reviewDto.getUserId().equals(loginUser.getUserId())) {
                    build.setCheckUser(true);
                }
            }
            responseDtos.add(build);
        }
        return responseDtos;
    }

    @Transactional
    public Integer deleteReview(Long reviewSeq, HttpServletRequest request) {
        SessionDto loginUser = (SessionDto) request.getSession().getAttribute("loginUser");
        if(loginUser == null || loginUser.getUserId() == (null)) {
            return null;
        }
        Integer result = reviewMapper.deleteReview(reviewSeq, loginUser.getUserId());
        return result;
    }

    public Integer findReviewCount(Long productSeq) {
        Integer count = reviewMapper.findReviewCount(productSeq);
        count  = count / 10 + 1;
        return count;
    }
}
