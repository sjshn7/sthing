package sthing.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sthing.backend.dto.*;
import sthing.backend.service.AdminService;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponseDTO> login(@RequestBody AdminLoginRequestDTO requestDTO) {
        return ResponseEntity.ok(adminService.login(requestDTO));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponseDTO> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboard());
    }

    // 쿼리 파라미터 필터링 - page, mbti, date 모두 선택사항. 없으면 전체 조회
    @GetMapping("/results")
    public ResponseEntity<PageResponseDTO<TestResultListItemDTO>> getResults(
            @RequestParam(defaultValue = "0") int page, //없으면 0페이지
            @RequestParam(required = false) String mbti, //없으면 null -> 전체
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) { // "2026-06-04" → LocalDate 자동 변환
        return ResponseEntity.ok(adminService.getResults(page, mbti, date));

    }

    // soft delete - 삭제 성공 시 반환할 데이터가 없으므로 204(no content) 반환
    @DeleteMapping("/results/{id}")
    public ResponseEntity<Void> deleteResult(@PathVariable Long id) {
        adminService.deleteResult(id);
        return ResponseEntity.noContent().build();
    }
}
