package com.example.library.login;

import com.example.library.user.member.User;
import com.example.library.user.member.UserCheckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginCheckService {
    @Autowired
    private UserCheckRepository userCheckRepository;

    public ResponseEntity<?> checkCredentials(String username, String password) {
        Optional<User> userOptional = userCheckRepository.findByName(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("사용자 이름이 존재하지 않습니다");
        }
        if(!userOptional.get().getPassword().equals(password)){
            return ResponseEntity.badRequest().body("비밀번호가 잘못되었습니다");
        }
        return ResponseEntity.ok("로그인 성공");

    }
}
