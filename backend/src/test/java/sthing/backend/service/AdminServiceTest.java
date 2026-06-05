package sthing.backend.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import sthing.backend.dto.AdminLoginRequestDTO;
import sthing.backend.dto.AdminLoginResponseDTO;
import sthing.backend.entity.AdminEntity;
import sthing.backend.entity.TestResultEntity;
import sthing.backend.exception.InvalidCredentialsException;
import sthing.backend.exception.ResourceNotFoundException;
import sthing.backend.repository.AdminRepository;
import sthing.backend.repository.TestResultRepository;
import sthing.backend.security.JwtTokenProvider;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

// 실제 DB, Spring Security, JWT 없이 관리자 서비스 로직만 단위 테스트
@ExtendWith(MockitoExtension.class)
class AdminServiceTest {

    @Mock
    private AdminRepository adminRepository;

    // 실제 BCrypt 해시 연산 없이 true/false만 반환하도록
    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    // 실제 JWT 서명/검증 없이 토큰 문자열만 반환하도록
    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private TestResultRepository testResultRepository;

    @InjectMocks
    private AdminService adminService;

    @Test
    @DisplayName("로그인 성공 - JWT 토큰 반환")
    void login_success() {
        // given
        AdminLoginRequestDTO request = new AdminLoginRequestDTO();
        ReflectionTestUtils.setField(request, "adminId", "admin");
        ReflectionTestUtils.setField(request, "pw", "password");

        AdminEntity admin = AdminEntity.builder()
                .adminId("admin")
                .name("관리자")
                .pw("encodedPassword") // 실제로는 BCrypt 해시값이지만 Mock이므로 임의 문자열 사용
                .build();

        when(adminRepository.findById("admin")).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches("password", "encodedPassword")).thenReturn(true);
        when(jwtTokenProvider.createToken("admin")).thenReturn("jwt-token");

        // when
        AdminLoginResponseDTO result = adminService.login(request);

        // then
        assertThat(result.getToken()).isEqualTo("jwt-token");
    }

    @Test
    @DisplayName("없는 아이디로 로그인 시 InvalidCredentialsException 발생")
    void login_adminNotFound_throwsException() {
        // given
        AdminLoginRequestDTO request = new AdminLoginRequestDTO();
        ReflectionTestUtils.setField(request, "adminId", "nobody");
        ReflectionTestUtils.setField(request, "pw", "password");

        // DB에 해당 아이디가 없는 상황 재현
        when(adminRepository.findById("nobody")).thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> adminService.login(request))
                .isInstanceOf(InvalidCredentialsException.class);
    }

    @Test
    @DisplayName("틀린 비밀번호로 로그인 시 InvalidCredentialsException 발생")
    void login_wrongPassword_throwsException() {
        // given
        AdminLoginRequestDTO request = new AdminLoginRequestDTO();
        ReflectionTestUtils.setField(request, "adminId", "admin");
        ReflectionTestUtils.setField(request, "pw", "wrongPassword");

        AdminEntity admin = AdminEntity.builder()
                .adminId("admin")
                .name("관리자")
                .pw("encodedPassword")
                .build();

        when(adminRepository.findById("admin")).thenReturn(Optional.of(admin));
        // 비밀번호 불일치 상황 재현
        when(passwordEncoder.matches("wrongPassword", "encodedPassword")).thenReturn(false);

        // when & then
        assertThatThrownBy(() -> adminService.login(request))
                .isInstanceOf(InvalidCredentialsException.class);
    }

    @Test
    @DisplayName("결과 soft delete 성공 - deleted = true, deletedAt 설정")
    void deleteResult_success() {
        // given
        TestResultEntity entity = TestResultEntity.builder()
                .mbti("INFP")
                .description("테스트")
                .build();

        when(testResultRepository.findByIdAndDeletedFalse(1L)).thenReturn(Optional.of(entity));

        // when
        adminService.deleteResult(1L);

        // then
        // softDelete() 호출 후 엔티티 상태 직접 검증
        assertThat(entity.isDeleted()).isTrue();
        assertThat(entity.getDeletedAt()).isNotNull();
    }

    @Test
    @DisplayName("없는 id 삭제 시 ResourceNotFoundException 발생")
    void deleteResult_notFound_throwsException() {
        // given
        // 이미 삭제됐거나 존재하지 않는 id 상황 재현
        when(testResultRepository.findByIdAndDeletedFalse(any())).thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> adminService.deleteResult(999L))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
