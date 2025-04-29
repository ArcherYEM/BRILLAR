function checkPasswordMatch(){
    const pwd = document.querySelector(`input[name=userPassword]`).value;
    const confirmPwd = document.querySelector(`input[name="userPasswordConfirm"]`).value;

    if(pwd !== confirmPwd){
        alert("비밀번호가 일치하지 않습니다.");
    }else{
        alert("비밀번호가 일치합니다.");
    }
}

document.addEventListener("DOMContentLoaded", function (){
    const joinBtn = document.getElementById("joinSubmitBtn");
    if(joinBtn){
        joinBtn.addEventListener("click", function (){
            alert("회원가입 요청");
        });
    }
})