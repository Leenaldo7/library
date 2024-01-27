package com.example.library.login;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
public class LoginCheckController {
    @Autowired
    private LoginCheckService loginCheckService;
    @Autowired
    private SessionRegisterService sessionRegisterService;
    
    @PostMapping("/login/checkLogin")
    public ResponseEntity<?> checkLogin(@RequestBody LoginCheckDTO loginCheckDTO, HttpSession session){
        boolean isAuthenticated = loginCheckService.checkCredentials(loginCheckDTO.getName(), loginCheckDTO.getPassword());
        
        if(isAuthenticated) {
            sessionRegisterService.registerUserInformationSession(loginCheckDTO.getName(), session);
            return ResponseEntity.ok().body("로그인 성공!!");
        } else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("로그인 실패!!");
        }
        
    }
}
