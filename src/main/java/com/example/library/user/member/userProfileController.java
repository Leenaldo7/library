package com.example.library.user.member;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class userProfileController {

    @RequestMapping("/user/profile")
    public String profilePage(){
        return "/user/profile/profile";
    }
}
