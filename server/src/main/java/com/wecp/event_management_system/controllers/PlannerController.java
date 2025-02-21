package com.wecp.event_management_system.controllers;


import com.wecp.event_management_system.entities.Event;
import com.wecp.event_management_system.entities.Task;
import com.wecp.event_management_system.services.EventService;
//import com.wecp.event_management_system.services.TaskService;
import com.wecp.event_management_system.services.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planner")
public class PlannerController {
@Autowired
private EventService eventService;
@Autowired
private TaskService taskService;
    @PostMapping("/event")
    public ResponseEntity<Event> createEvent(@RequestParam Long plannerId, @RequestBody Event event) {
       // create event and return the created event with status code 201 created
       return ResponseEntity.status(201).body(eventService.createEvent(event, plannerId));
    }

    @PutMapping("/event/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event eventDetails) {
        // update event and return the updated event with status code 200 ok
        return ResponseEntity.ok(eventService.updateEvent(eventDetails, id));
    }

    @GetMapping("/events")
    public ResponseEntity<List<Event>> getEventsByPlanner(@RequestParam Long plannerId) {
        // retrieve all events of a planner with status code 200 ok
        return ResponseEntity.ok(eventService.getEventsByPlanner(plannerId));
    }

    @PostMapping("/task")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        // create task and return the created task with status code 201 created
        return ResponseEntity.status(201).body(taskService.createTask(task));
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
       // retrieve all tasks with status code 200 ok
       return ResponseEntity.ok(taskService.getAllTasks());
    }

    @PostMapping("/tasks/{taskId}/assign/{staffId}")
    public ResponseEntity<Task> assignTaskToStaff(@PathVariable Long taskId, @PathVariable Long staffId) {
        // assign task to staff and return the assigned task with status code 200 ok
        return ResponseEntity.ok(taskService.assignTask(taskId,staffId));
    }


}
