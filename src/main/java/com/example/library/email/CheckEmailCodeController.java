package com.example.library.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class CheckEmailCodeController {
    @Autowired
    CheckEmailCodeService checkEmailCodeService;

    @PostMapping("/createAccountForm/checkEmailCode")
    public ResponseEntity<?> checkEmailCode(@RequestBody EmailCode emailCode){
        return checkEmailCodeService.verificationCode(emailCode);
    }
}
