package com.example.library.login;

import com.example.library.user.member.User;
import com.example.library.user.member.UserCheckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FindAccountService {
    @Autowired
    private UserCheckRepository userCheckRepository;

    public Optional<User> userInformation(String email) {
        return userCheckRepository.findByEmail(email);
    }

    public Optional<User> userInformation(String name, String email){
        Optional<User> nameOptional = userCheckRepository.findByName(name);
        Optional<User> emailOptional = userCheckRepository.findByEmail(email);

        // 두 Optional 값이 모두 있는 경우
        if(nameOptional.isPresent() && emailOptional.isPresent()){
            //이름과 이메일이 동일한 사용자인 경우
            if(nameOptional.get().equals(emailOptional.get())){
                return nameOptional;
            } else{
                return Optional.empty();
            }
        } else {
            return Optional.empty();
        }
        
    }

}
