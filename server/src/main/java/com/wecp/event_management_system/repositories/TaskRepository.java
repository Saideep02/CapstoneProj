package com.wecp.event_management_system.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wecp.event_management_system.entities.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

    List<Task> findByAssignedStaffId(Long staffID);
}