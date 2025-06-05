$('#Pay').on('click',function(){
    pay();
})

function pay(){
    $.ajax({
        url: '/kakao/pay/ready',
        method: 'post',
        data: {productName: 'tt', totalPrice: 1000},
        success: function(result){
            window.location.href = result.next_redirect_pc_url;
        },
        error : function(xhr, status, error){
            console.error('결제 실패:', status, error);
        }
    })
}