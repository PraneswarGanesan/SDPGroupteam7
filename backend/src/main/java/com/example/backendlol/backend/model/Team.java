package com.example.backendlol.backend.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Entity
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project; // Reference to the project entity

    @NotNull
    private Long leadId; // Team lead ID

    @ElementCollection
    private List<Long> memberIds; // List of team member IDs

    // Additional fields for displaying usernames
    @Transient
    private String leadUsername; // Use @Transient to indicate it's not stored in DB

    @Transient
    private List<String> memberUsernames; // Use @Transient to indicate it's not stored in DB

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Long getLeadId() {
        return leadId;
    }

    public void setLeadId(Long leadId) {
        this.leadId = leadId;
    }

    public List<Long> getMemberIds() {
        return memberIds;
    }

    public void setMemberIds(List<Long> memberIds) {
        this.memberIds = memberIds;
    }

    public String getLeadUsername() {
        return leadUsername;
    }

    public void setLeadUsername(String leadUsername) {
        this.leadUsername = leadUsername;
    }

    public List<String> getMemberUsernames() {
        return memberUsernames;
    }

    public void setMemberUsernames(List<String> memberUsernames) {
        this.memberUsernames = memberUsernames;
    }
}
