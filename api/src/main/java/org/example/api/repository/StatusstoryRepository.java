package org.example.api.repository;

import org.example.api.entity.Statusstory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusstoryRepository extends JpaRepository<Statusstory, Long> {
}
