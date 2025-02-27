package com.wecp.event_management_system.entities;

import javax.persistence.*;

@Entity
public class Task{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String status;
   
    //Entity Mapping will come here
    @ManyToOne
    @JoinColumn(name="assigned_staff_id")
    private Staff assignedStaff;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Staff getAssignedStaff() {
        return assignedStaff;
    }
    public void setAssignedStaff(Staff assignedStaff) {
        this.assignedStaff = assignedStaff;
    }

    
}