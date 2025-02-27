package com.wecp.event_management_system.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wecp.event_management_system.entities.Event;
@Repository
public interface EventRepository extends JpaRepository<Event,Long>{
    List<Event> findByplannerId(Long plannerId);
}