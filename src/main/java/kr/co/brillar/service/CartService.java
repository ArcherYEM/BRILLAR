package kr.co.brillar.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.co.brillar.dto.CartDto;
import kr.co.brillar.mapper.CartMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {
    
    private final CartMapper cartMapper;

    // 장바구니 품목 리스트
    public List<CartDto> getItems(String userId){

        List<CartDto> cartList = cartMapper.cartList(userId);
        
        return cartList;
    }

    // 주문내역
    public CartDto grandTotal(String userId){

        CartDto grandTotal = cartMapper.grandTotal(userId);

        return grandTotal;
    }

    // 물품 수량증가
    public boolean quantityInc(int cartSeq, int productSeq){

        int result = cartMapper.quantityInc(cartSeq, productSeq);

        if (result == 1) {
            return true;
        }
        
        return false; // 재고가 없을 시
    }

    // 물품 수량감소
    public boolean quantityDec(int cartSeq, int productSeq){

        int result = cartMapper.quantityDec(cartSeq, productSeq);

       if (result == 1) {
            return true;
        }
        
        return false; // 최소수량 도달시
    }

    // 직접 수량변경
    public boolean quantityChange(int cartSeq, int productSeq, int quantity){

        int result = cartMapper.quantityChange(cartSeq, productSeq, quantity);

        if (result == 1) {
            return true;
        }
        
        return false; // 해당 수량보다 재고가 적을시
    }

    // 물품 삭제
    public boolean deleteItem(int cartSeq, int productSeq){

        int result = cartMapper.deleteItem(cartSeq, productSeq);

        if (result > 0) {
            return true;
        }
        
        return false;
    };
}
