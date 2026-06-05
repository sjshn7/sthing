package sthing.backend.dto;

import lombok.Getter;
import sthing.backend.entity.TestResultEntity;

import java.time.LocalDateTime;

/**
 * 결과 목록 조회용 DTO
 */
@Getter
public class TestResultListItemDTO {
    private final Long id;
    private final String shareId;
    private final String mbti;
    private final String description;
    private final int viewCount;
    private final LocalDateTime createdAt;

    // entity -> dto 변환
    public TestResultListItemDTO(TestResultEntity entity) {
        this.id = entity.getId();
        this.shareId = entity.getShareId();
        this.mbti = entity.getMbti();
        this.description = entity.getDescription();
        this.viewCount = entity.getViewCount();
        this.createdAt = entity.getCreatedAt();
    }
}
