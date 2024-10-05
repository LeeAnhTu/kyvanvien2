package org.example.api.repository;

import org.example.api.entity.GiftRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GiftRequestRepository extends JpaRepository<GiftRequest, Long> {

    List<GiftRequest> findByUserId(Long userId);
}
