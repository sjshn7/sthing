package sthing.backend.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import sthing.backend.dto.TestResultResponseDTO;
import sthing.backend.dto.TestResultSaveRequestDTO;
import sthing.backend.entity.TestResultEntity;
import sthing.backend.exception.ResourceNotFoundException;
import sthing.backend.repository.TestResultRepository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

// 실제 DB 없이 Mock 객체로 의존성을 대체해 순수 비즈니스 로직만 테스트
@ExtendWith(MockitoExtension.class)
class TestResultServiceTest {

    // @Mock: 실제 구현 대신 가짜 객체 생성 (DB 호출 없음)
    @Mock
    private TestResultRepository testResultRepository;

    // @InjectMocks: @Mock으로 만든 객체를 자동으로 주입해 서비스 인스턴스 생성
    @InjectMocks
    private TestResultService testResultService;

    @Test
    @DisplayName("결과 저장 성공 - MBTI와 설명이 담긴 DTO 반환")
    void save_success() {
        // given
        // DTO에 setter가 없어 ReflectionTestUtils로 private 필드에 직접 값 설정
        TestResultSaveRequestDTO request = new TestResultSaveRequestDTO();
        ReflectionTestUtils.setField(request, "mbti", "INFP");
        ReflectionTestUtils.setField(request, "description", "테스트 설명");

        TestResultEntity savedEntity = TestResultEntity.builder()
                .mbti("INFP")
                .description("테스트 설명")
                .build();

        // save()가 호출되면 savedEntity를 반환하도록 Mock 설정
        when(testResultRepository.save(any(TestResultEntity.class))).thenReturn(savedEntity);

        // when
        TestResultResponseDTO result = testResultService.save(request);

        // then
        assertThat(result.getMbti()).isEqualTo("INFP");
        assertThat(result.getDescription()).isEqualTo("테스트 설명");
        verify(testResultRepository, times(1)).save(any(TestResultEntity.class)); //save()가 정확히 1번 호출됐는지 검증
    }

    @Test
    @DisplayName("shareId로 조회 성공 - 조회수 1 증가")
    void findByShareId_success() {
        // given
        TestResultEntity entity = TestResultEntity.builder()
                .mbti("INFP")
                .description("테스트 설명")
                .build();

        when(testResultRepository.findByShareIdAndDeletedFalse("test-share-id"))
                .thenReturn(Optional.of(entity));

        // when
        TestResultResponseDTO result = testResultService.findByShareId("test-share-id");

        // then
        assertThat(result.getMbti()).isEqualTo("INFP");
        assertThat(result.getViewCount()).isEqualTo(1); //조회시 incrementViewCount()가 호출돼 viewCount가 0 -> 1로 증가했는지 확인
    }

    @Test
    @DisplayName("없는 shareId로 조회 시 ResourceNotFoundException 발생")
    void findByShareId_notFound_throwsException() {
        // given
        // Optional.empty()를 반환해 존재하지 않는 shareId 상황을 재현
        when(testResultRepository.findByShareIdAndDeletedFalse(any()))
                .thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> testResultService.findByShareId("없는-id"))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("총 참여자 수 조회")
    void getCount_success() {
        // given
        when(testResultRepository.countByDeletedFalse()).thenReturn(42L);

        // when
        long result = testResultService.getCount();

        // then
        assertThat(result).isEqualTo(42L);
    }
}
