package kr.co.brillar.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductParamDTO {

    private Integer groupId;
    private Integer page;
    private String text;
    private List<String> materialList;
    private Integer minPrice;
    private Integer maxPrice;
    private Integer sortValue;
}
