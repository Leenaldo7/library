package com.example.library.user.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public ResponseEntity<?> editEmail(User user){
        if(userCheckRepository.findByEmail(user.getEmail()).isPresent()){
            return ResponseEntity.badRequest().body("이메일이 이미 존재합니다");
        }
        userRepository.save(user);
        return ResponseEntity.ok("이메일 수정 완료");
    }

    public ResponseEntity<?> editPassword(User user){
        userRepository.save(user);
        return ResponseEntity.ok("비밀번호 수정 완료");
    }

    }
