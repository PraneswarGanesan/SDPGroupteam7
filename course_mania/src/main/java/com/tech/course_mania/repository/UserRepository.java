package com.tech.course_mania.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tech.course_mania.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String username);
}
