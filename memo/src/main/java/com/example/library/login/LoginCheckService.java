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

    public Boolean checkCredentials(String username, String password) {
        Optional<User> userOptional = userCheckRepository.findByName(username);
        if (userOptional.isEmpty()) {
            return false;
        }
        return userOptional.get().getPassword().equals(password);

    }
}
