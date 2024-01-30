package com.example.library.login;


import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpSession;

@Service
public class SessionRegisterService {

    public void registerUserInformationSession(String name, HttpSession session){
        session.setAttribute("USERNAME", name);
    }
}
