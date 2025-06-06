package kr.co.brillar.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.brillar.dto.OrderCompleteDto;
import kr.co.brillar.mapper.OrderCompleteMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderCompleteService {
    
    private final OrderCompleteMapper orderCompleteMapper;

    public int insertOrder(OrderCompleteDto orderCompleteDto){

        orderCompleteMapper.insertOrder(orderCompleteDto);
        
        // 반환받은 orderSeq 넘겨주기
        return orderCompleteDto.getOrderSeq();
    }

    public int insertOrderDetail(List<OrderCompleteDto> orderCompleteDto){

        int result = orderCompleteMapper.insertOrderDetail(orderCompleteDto);
        
        return result;
    }

    public List<OrderCompleteDto> calcItemPrice(String userId){

        List<OrderCompleteDto> result = orderCompleteMapper.calcItemPrice(userId);
        
        return result;
    }

    @Transactional
    public List<String> updateStock(String userId){

        // 장바구니 내역
        List<OrderCompleteDto> cartProducts = orderCompleteMapper.checkCart(userId);

        // 장바구니 productSeq + quantity
        Map<Integer, Integer> cartSeqQuantity = toMap(cartProducts, 
                                                      OrderCompleteDto::getProductSeq, 
                                                      OrderCompleteDto::getCount,
                                                      Integer::sum);
        
        // 장바구니 productSeq + productName
        Map<Integer, String> cartSeqName = toMap(cartProducts, 
                                                 OrderCompleteDto::getProductSeq, 
                                                 OrderCompleteDto::getProductName,
                                                 (k, v) -> k);
        
        // 재고량 확인
        List<OrderCompleteDto> stock = orderCompleteMapper.checkStockForUpdate(userId);

        // 재고 productSeq + quantity
        Map<Integer, Integer> stockSeqQuantity = toMap(stock, 
                                                       OrderCompleteDto::getProductSeq, 
                                                       OrderCompleteDto::getCount,
                                                       Integer::sum);
        
        // 재고가 없는 상품 목록
        List<String> noStockProduct = new ArrayList<>();

        // 제품재고량과 제품주문량 비교
        for (Map.Entry<Integer, Integer> cartEntry : cartSeqQuantity.entrySet()) {
            int productSeq = cartEntry.getKey();
            int cartQty = cartEntry.getValue();
            int stockQty = stockSeqQuantity.getOrDefault(productSeq, 0);

            // 재고량보다 주문량이 많을 시
            if (stockQty < cartQty) {
                String itemName = cartSeqName.get(productSeq);
                noStockProduct.add(itemName); // 상품명 목록 추가
            }
        }

        // 재고가 없는 상품명 반환
        if (!noStockProduct.isEmpty()) {
            return noStockProduct;
        }
        
        return Collections.emptyList(); // 재고가 충분하여 빈 배열 반환
    }

    // 주문 성공 시 재고 차감
    public void stockWork(String userId){
        orderCompleteMapper.addHistory(userId); // 재고내역 추가
        orderCompleteMapper.decreaseStock(userId); // 재고 수량 감소
    }

    // 상품처리 완료 후 장바구니 내역 삭제
    public void deleteCart(String userId){
        orderCompleteMapper.deleteCart(userId);
    }

    // ============================주문 완료 페이지===========================
    // 주문정보
    public OrderCompleteDto getOrderInfo(String userId, int orderSeq){

        OrderCompleteDto result = orderCompleteMapper.getOrderInfo(userId, orderSeq);
        
        return result;
    }

    // 주문 상세
    public List<OrderCompleteDto> getDetailInfo(int orderSeq){

        List<OrderCompleteDto> result = orderCompleteMapper.getDetailInfo(orderSeq);

        return result;
    }
    
    // 중복 Map 방지 메서드
    private <K, V> Map<K, V> toMap(List<OrderCompleteDto> list,
                                    Function<OrderCompleteDto, K> key,
                                    Function<OrderCompleteDto, V> value,
                                    BinaryOperator<V> mergeFunction){
        return list.stream()
                   .collect(Collectors.toMap(key, value, mergeFunction));
    }

}

