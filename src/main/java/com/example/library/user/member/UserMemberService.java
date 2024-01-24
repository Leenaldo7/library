package com.example.library.user.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserMemberService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserCheckRepository userCheckRepository;

    public ResponseEntity<?> registerUser(User user) {
        if (userCheckRepository.findByName(user.getName()).isPresent() ||
                userCheckRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("사용자 이름 또는 이메일이 이미 존재합니다.");
        }

        user.setIsadmin(false);
        userRepository.save(user);
        return ResponseEntity.ok("회원가입 성공");
    }

    }
