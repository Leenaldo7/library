package com.example.library.user.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class UserCheckController {
    @Autowired
    private UserCheckService userCheckService;

    @GetMapping("/checkUserName")
    public ResponseEntity<Boolean> checkAdminName(@RequestParam String name) {
        boolean isUnique = userCheckService.isEmptyName(name);
        return ResponseEntity.ok(isUnique);
    }

    @GetMapping("/checkUserEmail")
    public ResponseEntity<Boolean> checkAdminEmail(@RequestParam String email) {
        boolean isUnique = userCheckService.isEmptyEmail(email);
        return ResponseEntity.ok(isUnique);
    }
}
