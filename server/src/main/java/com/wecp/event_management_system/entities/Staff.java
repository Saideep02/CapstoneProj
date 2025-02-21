package com.wecp.event_management_system.entities;

import javax.persistence.Entity;
import javax.persistence.Table;

// import org.springframework.boot.autoconfigure.security.SecurityProperties.User;

@Entity
@Table(name ="staffs")
public class Staff extends User{
}