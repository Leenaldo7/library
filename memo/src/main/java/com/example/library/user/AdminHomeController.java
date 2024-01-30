package com.example.library.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminHomeController {
    
    @GetMapping("/admin")
    public String adminHome(){
        return "admin/home";
    }

    @GetMapping("/user")
    public String userHome(){
        return "user/home";
    }


}
