package com.example.library.user.member;

import java.util.UUID;

public class EmailVerificationKeyGenerator {
    public static String generateKeyWithUUiD(){
        return UUID.randomUUID().toString();
    }
}
