package kr.co.brillar.domain;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class Member {

    private Integer userId;
    private String userPassword;    //Bcrypt hash
    private String userName;
    private LocalDate userBirth;
    // M, F
    private String userGender;
    private String userPhone;
    private String userAddr1;
    private String userAddr2;
    private Integer userRole;
    private String userEmail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
