package com.wecp.event_management_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wecp.event_management_system.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
 User findByUsername(String userName);
}