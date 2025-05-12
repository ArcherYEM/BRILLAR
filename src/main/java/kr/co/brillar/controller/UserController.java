package kr.co.brillar.controller;

import kr.co.brillar.service.OrderStateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpSession;
import kr.co.brillar.dto.SessionDto;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final OrderStateService orderStateService;

    //마이페이지
    @GetMapping({ "", "/" })
    public String myPage(HttpSession session,Model model) {
        SessionDto user = (SessionDto) session.getAttribute("loginUser");
        if (user == null) {
            return "redirect:/login";
        }
        model.addAttribute("activeMenu", "mypage");
        getUserOrderInfo(model, user);

        return "user/myPage";
    }

    @GetMapping("/order-status")
    public String orderStatus(HttpSession session, Model model){
        SessionDto user = (SessionDto) session.getAttribute("loginUser");
        if (user == null) {
            return "redirect:/login";
        }
        model.addAttribute("activeMenu", "status");
        getUserOrderInfo(model, user);

        return "user/orderState";
    }

    @GetMapping("/order-history")
    public String orderHistory(HttpSession session, Model model){
        SessionDto user = (SessionDto) session.getAttribute("loginUser");
        if (user == null) {
            return "redirect:/login";
        }
        model.addAttribute("activeMenu", "history");
        getUserOrderInfo(model, user);

        return "user/orderHistory";
    }

    private void getUserOrderInfo(Model model, SessionDto user) {
        model.addAttribute("userName", user.getUserName());
        //상품 구매완료 횟수 가져오기
        Integer count = orderStateService.getPurchaseCount(user.getUserId());
        model.addAttribute("purchaseCount", count);
    }
}
