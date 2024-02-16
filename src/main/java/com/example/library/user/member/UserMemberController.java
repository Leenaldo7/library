package com.example.library.user.member;

import com.example.library.email.TemporaryUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;




@Controller
@RequestMapping("user/member")

public class UserMemberController {
    @Autowired
    private UserMemberService userMemberService;



    @RequestMapping(value = "/createAccountForm", method = RequestMethod.GET)
    public String createAccountForm() {
        return "create_account_form";
    }

    @RequestMapping(value = "/createAccountConfirm", method = RequestMethod.POST)
    public ResponseEntity<?> registerAdmin(@RequestBody User user) {
        return userMemberService.registerUser(user);
    }

    @RequestMapping(value ="/editEmail", method = RequestMethod.POST )
    public ResponseEntity<?> editUserEmail(@RequestBody User user){
        return userMemberService.editEmail(user);
    }

    @RequestMapping(value ="/editPassword", method = RequestMethod.POST )
    public ResponseEntity<?> editUserPassword(@RequestBody User user){
        return userMemberService.editPassword(user);
    }
}
