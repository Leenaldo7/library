package com.example.library.email;

import com.example.library.user.member.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.http.ResponseEntity;

@Controller
public class TemporaryUserController {

    @Autowired
    private TemporaryUserService temporaryUserService;


    @PostMapping("/createAccountForm/sendEmail")
    public ResponseEntity<?> sendVerificationEmail(@RequestBody TemporaryUser user){
        return temporaryUserService.sendSimpleMessage(user, "이메일 인증 코드");
    }

    @PostMapping("/find_account_pwd/sendEmail")
    public ResponseEntity<?> sendVerificationFindEmail(@RequestBody TemporaryUser user){
        return temporaryUserService.sendFindMessage(user, "이메일 인증 코드");
    }
}
