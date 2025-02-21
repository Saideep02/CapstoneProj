package com.wecp.event_management_system.entities;

import javax.persistence.Entity;
import javax.persistence.Table;

//new
@Entity
@Table(name = "clients")
public class Client extends User{

}