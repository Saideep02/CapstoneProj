package com.wecp.event_management_system.services;
import com.wecp.event_management_system.entities.Event;
import com.wecp.event_management_system.entities.EventPlanner;
import com.wecp.event_management_system.repositories.EventPlannerRepository;
import com.wecp.event_management_system.repositories.EventRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService{
@Autowired
private EventRepository eventRepository;
@Autowired
private EventPlannerRepository eventPlannerRepository;
public Event createEvent(Event event,Long plannerId)
{
   EventPlanner eventPlanner = eventPlannerRepository.findById(plannerId).orElse(null); 
   event.setPlanner(eventPlanner);
   return eventRepository.save(event);
}
public List<Event> getAllEvents()
{
  return eventRepository.findAll();
}
public Event updateEvent(Event event,Long eventId)
{
    Event event1 = eventRepository.findById(eventId).orElse(null);
    event.setId(event1.getId());
    return eventRepository.save(event);
}
public List<Event> getEventsByPlanner(Long plannerId)
{
    return eventRepository.findByplannerId(plannerId);
}
public Event updateFeedback(Long eventId,String feedback){
    Event event = eventRepository.findById(eventId).orElse(null);
    event.setFeedback(feedback);
    return eventRepository.save(event);
}
}