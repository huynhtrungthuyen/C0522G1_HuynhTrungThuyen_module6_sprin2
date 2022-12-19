package com.example.repository;

import com.example.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, String> {
    User findByUsername(String name);

    @Query(value = "SELECT username from  user where username = ?1", nativeQuery = true)
    String existsByUserName(String username);

    @Query(value = "select * from user where user.username =:username", nativeQuery = true)
    Optional<User> showUsername(@Param("username") String username);

    @Query(value = "select * from user where username like %:username%", nativeQuery = true)
    Optional<User> findUserByUsername(@Param("username") String username);
}
