package com.example.library.user.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserCheckService {
    @Autowired
    private UserCheckRepository userCheckRepository;

    public boolean isEmptyName(String name) {
        Optional<User> admin = userCheckRepository.findByName(name);
        return admin.isEmpty();
    }

    public boolean isEmptyEmail(String email) {
        Optional<User> admin = userCheckRepository.findByEmail(email);
        return admin.isEmpty();
    }
}
