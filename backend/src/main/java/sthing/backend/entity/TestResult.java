package sthing.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "test_result")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) //접근 권한
public class TestResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto_increment
    private Long id;

    // 결과 공유 링크용 uuid
    @Column(nullable = false, unique = true, updatable = false)
    private String sharedId;

    // 테스트 결과
    @Column(nullable = false, length = 4)
    private String mbti;

    // 설명
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    // 공유 링크 클릭 수
    @Column(nullable = false)
    private int viewCount;

    // soft delete 여부(db에서 실제 삭제 안함)
    @Column(nullable = false)
    private boolean deleted;

    // 삭제 시각
    @Column
    private LocalDateTime deletedAt;

    // 테스트 완료 시각
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.sharedId = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
    }

    // 결과에서 받아야 하는 값
    @Builder
    public TestResult(String mbti, String description) {
        this.mbti = mbti;
        this.description = description;
    }

    public void incrementViewCount() {
        this.viewCount++;
    }

    // 관리자가 삭제시
    public void softDelete() {
        this.deleted = true;
        this.deletedAt = LocalDateTime.now();
    }
}
