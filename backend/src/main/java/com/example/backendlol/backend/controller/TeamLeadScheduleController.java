package com.example.backendlol.backend.controller;
import com.example.backendlol.backend.repository.*;
import com.example.backendlol.backend.service.*;
import com.example.backendlol.backend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product_manager/schedule")
public class TeamLeadScheduleController {

    @Autowired
    private TeamLeadScheduleService teamLeadScheduleService; // Service for business logic

    // Endpoint to fetch all team leads
    @GetMapping("/team_leads")
    public ResponseEntity<List<User>> getAllTeamLeads() {
        List<User> teamLeads = teamLeadScheduleService.getAllTeamLeads();
        return ResponseEntity.ok(teamLeads);
    }

    // Endpoint to get the schedule of a specific team lead
    @GetMapping("/schedule/{teamLeadId}")
    public ResponseEntity<TeamLeadSchedule> getTeamLeadSchedule(@PathVariable Long teamLeadId) {
        TeamLeadSchedule schedule = teamLeadScheduleService.getScheduleForTeamLead(teamLeadId);
        if (schedule != null) {
            return ResponseEntity.ok(schedule);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to create or update the schedule for a team lead
    @PostMapping("/schedule")
    public ResponseEntity<TeamLeadSchedule> createOrUpdateSchedule(@RequestBody TeamLeadSchedule schedule) {
        TeamLeadSchedule savedSchedule = teamLeadScheduleService.saveOrUpdateSchedule(schedule);
        return ResponseEntity.ok(savedSchedule);
    }
}