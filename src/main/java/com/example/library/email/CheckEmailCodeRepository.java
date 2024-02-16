package com.example.library.email;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CheckEmailCodeRepository extends JpaRepository<TemporaryUser, Integer> {
    Optional<TemporaryUser> findByCode(String code);
    Optional<TemporaryUser> findByName(String name);
}
