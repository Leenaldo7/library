package com.example.library.email;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TemporaryUserRepository extends JpaRepository<TemporaryUser, Integer> {

    Optional<TemporaryUser> findByEmail(String mail);
    Optional<TemporaryUser> findByState(Boolean state);
}
