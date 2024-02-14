package com.example.library.login;


import com.example.library.user.member.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Controller
public class FindAccountController {
    @Autowired
    private FindAccountService findAccountService;

    @GetMapping("/find_account_id")
    public String findAccountId(){
        return "/login/find_account_id";
    }

    @GetMapping("/find_account_pwd")
    public String findAccountPwd(){
        return "/login/find_account_pwd";
    }


    @PostMapping("/find_account_id/check_email")
    public ResponseEntity<?> receiveUserInformationId(@RequestBody String email) {
        Optional<User> user = findAccountService.userInformation(email);
        if (user.isEmpty()) {
            // 사용자 정보가 없을 경우에도 200 OK 응답을 보내고, 메시지로 상황을 설명합니다.
            return ResponseEntity.ok().body("해당 이메일로 사용자를 찾을 수 없습니다.");
        }
        return ResponseEntity.ok().body(user.get());
    }

    @PostMapping("/find_account_pwd/check_pwd")
    public ResponseEntity<?> receiveUserInformationPwd(@RequestBody FindAccountDTO findAccountDTO) {
        Optional<User> user = findAccountService.userInformation(findAccountDTO.getName(), findAccountDTO.getEmail());
        if (user.isEmpty()) {
            // 사용자 정보가 없을 경우에도 200 OK 응답을 보내고, 메시지로 상황을 설명합니다.
            return ResponseEntity.ok().body("해당 사용자를 찾을 수 없습니다.");
        }
        return ResponseEntity.ok().body(user.get());
    }
}
