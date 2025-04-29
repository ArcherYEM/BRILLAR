package kr.co.brillar.controller;

import kr.co.brillar.dto.MainDto;
import kr.co.brillar.service.MainService;
import lombok.extern.log4j.Log4j2;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Log4j2
public class MainController {

    private final MainService mainService;

    public MainController(MainService mainService) {
        this.mainService = mainService;
    }

    // 메인페이지 조회
    @GetMapping("/")
    public String index() {
    String name = mainService.getTest();
    return "main/index";
    }

    // RequestMapping
    // @GetMapping("/")
    // public String index(Model model) {

    //     List<MainDto> result = mainService.getNewList();
    //     for (MainDto mainDto : result) {
    //         log.info("mainDto : {}", mainDto);
    //     }

    //     model.addAttribute("result", result);

    //     return "main/index";
    // }

    // REST API
    @GetMapping("/get/products")
    @ResponseBody
    public List<MainDto> getProductList() {
        return mainService.getNewList();
    }
}
