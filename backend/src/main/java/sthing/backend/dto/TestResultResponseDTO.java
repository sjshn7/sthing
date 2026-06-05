package sthing.backend.dto;

import lombok.Getter;
import sthing.backend.entity.TestResultEntity;

import java.time.LocalDateTime;

@Getter
public class TestResultResponseDTO {
    // 프론트에 돌려줄 데이터
    private final String shareId;
    private final String mbti;
    private final String description;
    private final int viewCount;
    private final LocalDateTime createdAt;

    public TestResultResponseDTO(TestResultEntity entity) {
        this.shareId = entity.getShareId();
        this.mbti = entity.getMbti();
        this.description = entity.getDescription();
        this.viewCount = entity.getViewCount();
        this.createdAt = entity.getCreatedAt();
    }
}
