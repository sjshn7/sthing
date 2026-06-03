package sthing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sthing.backend.entity.TestResultEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TestResultRepository extends JpaRepository<TestResultEntity, Long> {
    // 삭제되지 않은 shareId 조회
    Optional<TestResultEntity> findByShareIdAndDeletedFalse(String shareId);

    // 삭제되지 않은 전체 수
    long countByDeletedFalse();

    // 오늘 가입자 수: createdAt이 오늘 00:00 이후이고 deleted = false
    long countByCreatedAtAfterAndDeletedFalse(LocalDateTime startOfDay);

    // MBTI별 분포: MBTI 커럼으로 그룹핑해서 [mbti, count] 형태로 반환
    @Query("SELECT r.mbti, COUNT(r) FROM TestResultEntity r WHERE r.deleted = false GROUP BY r.mbti")
    List<Object[]> countGroupByMbti();

    // 일별 추이 (최근 7일): 날짜별로 그룹핑
    @Query("SELECT CAST(r.createdAt AS date), COUNT(r) FROM TestResultEntity r WHERE r.createdAt >= :from AND r.deleted = false GROUP BY CAST(r.createdAt AS date) ORDER BY CAST(r.createdAt AS date) ASC")
    List<Object[]> countGroupByDate(@Param("from")LocalDateTime from);
}
