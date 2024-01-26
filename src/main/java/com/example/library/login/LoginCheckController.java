package com.example.library.login;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
public class LoginCheckController {
    @Autowired
    private LoginCheckService loginCheckService;

    @PostMapping("/login/checkLogin")
    public ResponseEntity<?> checkLogin(@RequestBody LoginCheckDTO loginCheckDTO, HttpSession session){

        return loginCheckService.checkCredentials(loginCheckDTO.getName(), loginCheckDTO.getPassword());
    }
}
