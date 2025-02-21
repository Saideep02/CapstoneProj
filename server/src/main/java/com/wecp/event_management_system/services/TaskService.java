package com.wecp.event_management_system.services;

import com.wecp.event_management_system.entities.*;
import com.wecp.event_management_system.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private StaffRepository staffRepository;
    
    public Task createTask(Task task){
        return taskRepository.save(task);
    }



    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }



    public Task assignTask(Long taskId,Long staffID){
     Task task1 = taskRepository.findById(taskId).orElse(null);
     Staff staff1 = staffRepository.findById(staffID).orElse(null);
     task1.setAssignedStaff(staff1);
     return taskRepository.save(task1);
    }



    public List<Task> getAssignedTasks(Long staffId){
        return taskRepository.findByAssignedStaffId(staffId);
    }



    public Task updateTaskStatus(Long taskId,String status){
      Task task2 = taskRepository.findById(taskId).get();
      task2.setStatus(status);
      return taskRepository.save(task2);
    }

}
