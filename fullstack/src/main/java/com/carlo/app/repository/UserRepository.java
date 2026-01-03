package com.carlo.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carlo.app.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
