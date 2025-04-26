package kr.co.brillar.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Member {

    private String id;
    private String userPassword;
    private String userName;
    private String userBirth;
    private String userGender;
    private String userPhone;
    private String userAddr1;
    private String userAddr2;
    private int userRole;
    private String createdAt;
    private String updatedAt;
}
