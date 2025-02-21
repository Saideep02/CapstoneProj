package com.wecp.event_management_system.Exceptions;

public class UserAlreadyExists extends RuntimeException{

    public UserAlreadyExists(String msg)
    {
        super(msg);
    }
}
