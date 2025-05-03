package kr.co.brillar.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.brillar.dto.MainDto;

@Mapper
public interface MainMapper {

    // 메인화면 신상품순 불러오기
    List<MainDto> getNewProduct();
}
