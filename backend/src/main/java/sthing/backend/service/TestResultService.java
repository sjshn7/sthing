package sthing.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sthing.backend.dto.TestResultResponseDTO;
import sthing.backend.dto.TestResultSaveRequestDTO;
import sthing.backend.entity.TestResultEntity;
import sthing.backend.exception.ResourceNotFoundException;
import sthing.backend.repository.TestResultRepository;

@Service
@RequiredArgsConstructor
public class TestResultService {

    private final TestResultRepository testResultRepository;

    // 결과 저장. 테스트 결과 저장 후 shareId 반환
    // 테스트페이지 -> 결과 로딩 -> mbti 분석 -> save() 호출 -> 결과페이지
    // requestDTO -> entity -> responseDTO
    @Transactional
    public TestResultResponseDTO save(TestResultSaveRequestDTO requestDTO) {
        TestResultEntity entity = TestResultEntity.builder()
                .mbti(requestDTO.getMbti())
                .description(requestDTO.getDescription())
                .build();
        return new TestResultResponseDTO(testResultRepository.save(entity));
    }

    // 공유 링크로 조회. shareId로 결과 조회 및 조회수 증가
    // 테스트 후 공유 링크 클릭 -> findByShareId() 호출 -> 결과 조회 + 조회수 증가 -> 결과 페이지
    // entity -> responseDTO
    @Transactional
    public TestResultResponseDTO findByShareId(String shareId) {
        TestResultEntity entity = testResultRepository.findByShareIdAndDeletedFalse(shareId)
                .orElseThrow(() -> new ResourceNotFoundException("결과를 찾을 수 없습니다."));
        entity.incrementViewCount();
        return new TestResultResponseDTO(entity);
    }
}
