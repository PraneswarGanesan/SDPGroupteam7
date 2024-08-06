package com.example.backendlol.backend.service;

import com.example.backendlol.backend.model.*;
import com.example.backendlol.backend.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamLeadScheduleService {

    @Autowired
    private UserRepository userRepository; // Repository for fetching users
    @Autowired
    private TeamLeadScheduleRepository teamLeadScheduleRepository; // Repository for TeamLeadSchedule

    public List<User> getAllTeamLeads() {
        return userRepository.findByRole("team_lead");
    }

    public TeamLeadSchedule getScheduleForTeamLead(Long teamLeadId) {
        return teamLeadScheduleRepository.findByTeamLeadId(teamLeadId);
    }

    public TeamLeadSchedule saveOrUpdateSchedule(TeamLeadSchedule schedule) {
        return teamLeadScheduleRepository.save(schedule);
    }
}
