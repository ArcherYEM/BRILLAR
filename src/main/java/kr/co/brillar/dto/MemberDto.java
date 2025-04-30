package kr.co.brillar.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
public class MemberDto {

    private String userId;
    private String userPassword;
    private String userPasswordConfirm;
    private String userName;
    private LocalDate userBirth;
    private String userGender;
    private String userPhone;
    private String userAddr1;
    private String userAddr2;
    private String userEmail;
    private String userRoleCode;
}
