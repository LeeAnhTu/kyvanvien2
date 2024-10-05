package org.example.api.repository;

import org.example.api.entity.HistoryGift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryGiftRepository extends JpaRepository<HistoryGift, Integer> {

    List<HistoryGift> findByUserId(Long userId);
}
