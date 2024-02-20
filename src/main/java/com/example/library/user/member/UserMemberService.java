package com.example.library.user.member;

import com.example.library.email.TemporaryUser;
import com.example.library.email.TemporaryUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserMemberService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserCheckRepository userCheckRepository;

    @Autowired
    private TemporaryUserRepository temporaryUserRepository;

    public ResponseEntity<?> registerUser(User user) {
        if (userCheckRepository.findByName(user.getName()).isPresent() ||
                userCheckRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("사용자 이름 또는 이메일이 이미 존재합니다.");
        }
        Optional<TemporaryUser> temporaryUser = temporaryUserRepository.findByEmail(user.getEmail());
        if(temporaryUser.isPresent() && temporaryUser.get().isState()){
            user.setName(temporaryUser.get().getName());
            user.setEmail(temporaryUser.get().getEmail());
            user.setPassword(temporaryUser.get().getPassword());
            user.setIsadmin(false);
            user.setState(temporaryUser.get().isState());
            userRepository.save(user);
            temporaryUserRepository.delete(temporaryUser.get());
            return ResponseEntity.ok("회원가입 성공");

        } else{
            return ResponseEntity.badRequest().body("이메일 인증을 받아야합니다");
        }


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
