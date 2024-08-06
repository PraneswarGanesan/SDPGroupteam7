package com.example.backendlol.backend.repository;

import com.example.backendlol.backend.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
