package org.example.api.repository;

import org.example.api.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends JpaRepository<Type,Long> {
}
