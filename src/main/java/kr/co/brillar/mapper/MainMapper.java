package kr.co.brillar.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.brillar.dto.MainDto;

@Mapper
public interface MainMapper {

    String getTest();

    List<MainDto> getNewProduct();
}
