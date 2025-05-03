package kr.co.brillar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String userRoleCode;
    private String userId;
    private String userPassword;
    private String userName;
    private String userBirth;
    private String userGender;
    private String userPhone;
    private String userAddr1;
    private String userAddr2;
    private String userEmail;
}
