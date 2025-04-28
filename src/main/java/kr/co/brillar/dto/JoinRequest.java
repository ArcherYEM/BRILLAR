package kr.co.brillar.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
@Setter
public class JoinRequest {

//    @NotBlank(message = "아이디를 입력하세요.")
//    @Size(min = 5, max = 20, message = "아이디는 5자 이상 20자 이하로 입력해주세요.")
//    private Integer userId;


    @NotBlank(message = "아이디를 입력해주세요.")
    @Size(min=1, max = 50)
    private String loginId;

    @NotBlank(message = "비밀번호를 입력하세요.")
    @Size(min = 4,max = 30, message = "비밀번호는 4자 이상 30자 이하로 입력해주세요.")
    private String userPassword;

    private String userPasswordConfirm;

    @NotBlank(message = "이름을 입력해주세요.")
    private String userName;

    @NotBlank(message = "생년월일을 입력하세요.")
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "생년월일은 yyyy-MM-dd형식이어야 합니다.")
    private LocalDate userBirth;

    @NotBlank(message = "성별을 선택하세요.")
    @Pattern(regexp = "^[MF]{1}$", message = "성별은 M/F 중 하나여야 합니다.")
    private String userGender;

    @NotBlank(message = "휴대폰 번호를 입력하세요.")
    @Pattern(regexp = "^01[0-9]-\\d{3,4}-\\d{4}]$", message = "휴대폰 번호 형식이 올바르지 않습니다.")
    private String userPhone;

    private String userAddr1;  //기본주소 (선택 입력)
    private String userAddr2;  //상세주소 (선택 입력)

    @Email(message = "이메일 형식이 올바르지 않습니다.")
    private String userEmail;  //선택 입력 (DB에 컬럼이 추가되어있지 않다면 무시 가능하도록
}
