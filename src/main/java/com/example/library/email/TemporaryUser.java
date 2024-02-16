package com.example.library.email;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "temporary_user")
public class TemporaryUser {
    @Id
    @Column(name = "name")
    private String name;

    @Column(nullable = false, name = "state")
    private boolean state;

    @Column(nullable = false, name = "code")
    private String code;

    @Column(name="password")
    private String password;

    @Column(name = "email")
    private String email;

}
