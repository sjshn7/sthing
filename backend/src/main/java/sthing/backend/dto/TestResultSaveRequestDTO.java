package sthing.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TestResultSaveRequestDTO {
    // 프론트에서 받을 데이터
    private String mbti;
    private String description;
}
