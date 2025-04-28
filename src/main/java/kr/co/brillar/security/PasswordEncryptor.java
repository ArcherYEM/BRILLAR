package kr.co.brillar.security;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordEncryptor {

    private final BCryptPasswordEncoder pwdEncoder;

    public PasswordEncryptor(BCryptPasswordEncoder pwdEncoder) {
        this.pwdEncoder = pwdEncoder;
    }

    public String encode(String rawPwd){
        return pwdEncoder.encode(rawPwd);
    }
    public boolean matches(String rawPwd, String encodedPwd){
        return pwdEncoder.matches(rawPwd, encodedPwd);
    }
}
