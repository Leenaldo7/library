package com.example.library.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CheckEmailCodeService {

    @Autowired
    private CheckEmailCodeRepository checkEmailCodeRepository;
    public ResponseEntity<?> verificationCode(EmailCode emailCode){
        Optional<TemporaryUser> confirm = checkEmailCodeRepository.findByCode(emailCode.getCode());
        if (confirm.isPresent()) {
            TemporaryUser temporaryUser = confirm.get();
            temporaryUser.setState(true);
            checkEmailCodeRepository.save(temporaryUser);
            return ResponseEntity.ok("인증 성공");
        } else{
            return ResponseEntity.badRequest().body("인증에 실패하셨습니다");
        }
    }
}
