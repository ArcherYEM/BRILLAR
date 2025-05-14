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

    public List<CartDto> getItems(String userId){

        List<CartDto> cartList = cartMapper.cartList(userId);
        
        return cartList;
    }

    public CartDto grandTotal(String userId){

        CartDto grandTotal = cartMapper.grandTotal(userId);

        return grandTotal;
    }
}
