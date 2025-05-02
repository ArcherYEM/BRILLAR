package kr.co.brillar.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface JoinMapper {
    int isDuplicate(Map<String, Object> param);
}
