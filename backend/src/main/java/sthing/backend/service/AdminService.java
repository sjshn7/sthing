package sthing.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import sthing.backend.dto.*;
import sthing.backend.entity.AdminEntity;
import sthing.backend.exception.InvalidCredentialsException;
import sthing.backend.repository.AdminRepository;
import sthing.backend.repository.TestResultRepository;
import sthing.backend.security.JwtTokenProvider;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final TestResultRepository testResultRepository;

    // 관리자 로그인
    // adminId로 DB 조회. 없으면 메세지 반환
    public AdminLoginResponseDTO login(AdminLoginRequestDTO requestDTO) {
        AdminEntity admin = adminRepository.findById(requestDTO.getAdminId())
                .orElseThrow(() -> new InvalidCredentialsException("아이디 또는 비밀번호가 틀렸습니다."));

        // DB에는 BCrypt 해시값이 저장되어 있음. matches()가 입력값을 해시해서 비교
        if (!passwordEncoder.matches(requestDTO.getPw(), admin.getPw())) {
            throw new InvalidCredentialsException("아이디 또는 비밀번호가 틀렸습니다.");
        }

        return new AdminLoginResponseDTO(jwtTokenProvider.createToken(admin.getAdminId()));
    }

    // 대시보드
    public DashboardResponseDTO getDashboard() {
        // 총 참여자
        long totalCount = testResultRepository.countByDeletedFalse();

        // 오늘 참여자: 오늘 00:00:00 기준으로 카운트
        LocalDateTime startOfToday = LocalDate.now().atStartOfDay();
        long todayCount = testResultRepository.countByCreatedAtAfterAndDeletedFalse(startOfToday);

        // MBTI별 분포: Object[] -> Map 변환
        Map<String, Long> mbtiDistribution = new LinkedHashMap<>();
        for (Object[] row : testResultRepository.countGroupByMbti()) {
            mbtiDistribution.put((String) row[0], (Long) row[1]);
        }

        // 일별 추이(최근 7일)
        LocalDateTime sevenDaysAgo = LocalDate.now().minusDays(6).atStartOfDay();
        Map<String, Long> dailyTrend = new LinkedHashMap<>();
        for (Object[] row : testResultRepository.countGroupByDate(sevenDaysAgo)) {
            dailyTrend.put(row[0].toString(), (Long) row[1]);
        }

        return new DashboardResponseDTO(totalCount, todayCount, mbtiDistribution, dailyTrend);
    }

    // 결과 목록 조회
    public PageResponseDTO<TestResultListItemDTO> getResults(int page, String mbti, LocalDate date) {
        // 한 페이지에 20개씩, 0부터 시작
        Pageable pageable = PageRequest.of(page, 20);

        // entity page -> dto page로 변환 후 PageResponseDTO 감싸서 반환
        Page<TestResultListItemDTO> result = testResultRepository
                .findAllWithFilter(mbti, date, pageable)
                .map(TestResultListItemDTO::new); //각 entity를 dto로 변환

        return new PageResponseDTO<>(result);

    }
}
