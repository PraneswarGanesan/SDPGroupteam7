package com.example.backendlol.backend.controller;

import com.example.backendlol.backend.model.Team;
import com.example.backendlol.backend.model.User;
import com.example.backendlol.backend.service.TeamService;
import com.example.backendlol.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product-manager")
public class ProductManagerController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserService userService; // Service to handle user-related operations

    @GetMapping("/teams")
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping("/teams/{id}")
    public Optional<Team> getTeamById(@PathVariable Long id) {
        return teamService.getTeamById(id);
    }

    // @PostMapping("/teams")
    // public Team createOrUpdateTeam(@RequestBody Team team) {
    //     return teamService.createOrUpdateTeam(team);
    // }

    @DeleteMapping("/teams/{id}")
    public void deleteTeam(@PathVariable Long id) {
        teamService.deleteTeam(id);
    }

    // // Endpoint to add members to a team based on their IDs
    // @PostMapping("/teams/{teamId}/add-members")
    // public Team addMembersToTeam(@PathVariable Long teamId, @RequestBody List<Long> userIds) {
    //     Optional<Team> optionalTeam = teamService.getTeamById(teamId);
    //     if (optionalTeam.isPresent()) {
    //         Team team = optionalTeam.get();
    //         List<User> users = new ArrayList<>();
    //         for (Long userId : userIds) {
    //             Optional<User> userOptional = userService.findById(userId);
    //             userOptional.ifPresent(users::add);
    //         }
    //         team.getMembers().addAll(users);
    //         return teamService.createOrUpdateTeam(team);
    //     }
    //     throw new RuntimeException("Team not found");
    // }
}
