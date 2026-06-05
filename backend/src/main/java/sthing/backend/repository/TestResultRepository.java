package sthing.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sthing.backend.entity.TestResultEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TestResultRepository extends JpaRepository<TestResultEntity, Long> {
    // 삭제되지 않은 shareId 조회
    Optional<TestResultEntity> findByShareIdAndDeletedFalse(String shareId);

    // soft delete - id로 조회(이미 삭제된 항목은 찾지 않음)
    Optional<TestResultEntity> findByIdAndDeletedFalse(Long id);

    // 삭제되지 않은 전체 수
    long countByDeletedFalse();

    // 오늘 가입자 수: createdAt이 오늘 00:00 이후이고 deleted = false
    long countByCreatedAtAfterAndDeletedFalse(LocalDateTime startOfDay);

    // MBTI별 분포: MBTI 커럼으로 그룹핑해서 [mbti, count] 형태로 반환
    @Query("SELECT r.mbti, COUNT(r) FROM TestResultEntity r WHERE r.deleted = false GROUP BY r.mbti")
    List<Object[]> countGroupByMbti();

    // 일별 추이 (최근 7일): 날짜별로 그룹핑
    @Query("SELECT CAST(r.createdAt AS date), COUNT(r) FROM TestResultEntity r " +
            "WHERE r.createdAt >= :from AND r.deleted = false " +
            "GROUP BY CAST(r.createdAt AS date) ORDER BY CAST(r.createdAt AS date) ASC")
    List<Object[]> countGroupByDate(@Param("from")LocalDateTime from);

    // MBTI별 분포 (삭제된 항목 포함)
    @Query("SELECT r.mbti, COUNT(r) FROM TestResultEntity r GROUP BY r.mbti")
    List<Object[]> countGroupByMbtiAll();

    // 일별 추이 (삭제된 항목 포함)
    @Query("SELECT CAST(r.createdAt AS date), COUNT(r) FROM TestResultEntity r " +
            "WHERE r.createdAt >= :from " +
            "GROUP BY CAST(r.createdAt AS date) ORDER BY CAST(r.createdAt AS date) ASC")
    List<Object[]> countGroupByDateAll(@Param("from") LocalDateTime from);

    // MBTI, 날짜 필터가 없으면(null) 해당 조건을 무시하고 전체 조회
    // Pageable로 페이지 번호, 크기, 정렬 정보를 받음
    @Query("SELECT r FROM TestResultEntity r WHERE r.deleted = false " +
            "AND (:mbti IS NULL OR r.mbti = :mbti) " +
            "AND (:date IS NULL OR CAST(r.createdAt AS date) = :date) " +
            "ORDER BY r.createdAt DESC")
    Page<TestResultEntity> findAllWithFilter(
            @Param("mbti") String mbti,
            @Param("date")LocalDate date,
            Pageable pageable
            );
}
