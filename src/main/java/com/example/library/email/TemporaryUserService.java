package com.example.library.email;


import com.example.library.user.member.User;
import com.example.library.user.member.UserCheckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Random;

@Service
public class TemporaryUserService {

    @Autowired
    private UserCheckRepository userCheckRepository;

    @Autowired
    private TemporaryUserRepository temporaryUserRepository;

    @Autowired
    private JavaMailSender mailSender;

    public ResponseEntity<?> sendSimpleMessage(TemporaryUser user, String subject){
        if (userCheckRepository.findByName(user.getName()).isPresent() ||
                userCheckRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("사용자 이름 또는 이메일이 이미 존재합니다.");
        }
        SimpleMailMessage message = new SimpleMailMessage();
        Random random = new Random();
        int verificationCode = random.nextInt(900000) + 100000;
        user.setCode(String.valueOf(verificationCode));
        temporaryUserRepository.save(user);

        message.setFrom("dkekr7710@gmail.com");
        message.setTo(user.getEmail());
        message.setSubject(subject);
        message.setText(String.valueOf(verificationCode));
        mailSender.send(message);
        return ResponseEntity.ok().body("인증 이메일이 발송되었습니다.");
    }
}
