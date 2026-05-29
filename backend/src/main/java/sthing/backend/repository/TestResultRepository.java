package sthing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sthing.backend.entity.TestResultEntity;

import java.util.Optional;

public interface TestResultRepository extends JpaRepository<TestResultEntity, Long> {
    // delete되지 않은 shareId 조회
    Optional<TestResultEntity> findByShareIdAndDeletedFalse(String shareId);
}
