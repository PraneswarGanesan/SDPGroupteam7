package com.example.backendlol.backend.controller;

import com.example.backendlol.backend.service.EmployeeScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backendlol.backend.model.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeScheduleController {

    @Autowired
    private EmployeeScheduleService employeeScheduleService;

    @GetMapping("/schedules")
    public ResponseEntity<List<User>> getAllSchedules() {
        List<User> employees = employeeScheduleService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/schedules/{employeeId}")
    public ResponseEntity<EmployeeSchedule> getScheduleByEmployeeId(@PathVariable Long employeeId) {
        EmployeeSchedule schedule = employeeScheduleService.getScheduleForEmployee(employeeId);
        return schedule != null ? ResponseEntity.ok(schedule) : ResponseEntity.notFound().build();
    }

    @PostMapping("/schedules")
    public ResponseEntity<EmployeeSchedule> createSchedule(@RequestBody EmployeeSchedule schedule) {
        EmployeeSchedule createdSchedule = employeeScheduleService.saveOrUpdateSchedule(schedule);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSchedule);
    }

    @PutMapping("/schedules/{id}")
    public ResponseEntity<EmployeeSchedule> updateSchedule(@PathVariable Long id, @RequestBody EmployeeSchedule schedule) {
        schedule.setId(id);
        EmployeeSchedule updatedSchedule = employeeScheduleService.saveOrUpdateSchedule(schedule);
        return ResponseEntity.ok(updatedSchedule);
    }

    @DeleteMapping("/schedules/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        employeeScheduleService.saveOrUpdateSchedule(new EmployeeSchedule() {{ setId(id); }});
        return ResponseEntity.noContent().build();
    }
}
