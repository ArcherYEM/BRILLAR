package kr.co.brillar.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {
    SILVER(0),
    GOLD(1),
    DIAMOND(2),
    ADMIN(9);

    private final int code;

    public static Role from(int code){
        for(Role role : values()){
            if(role.code == code){
                return role;
            }
        }
        throw new IllegalArgumentException("없는 등급입니다." + code);
    }

}
