package sthing.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sthing.backend.dto.TestResultResponseDTO;
import sthing.backend.dto.TestResultSaveRequestDTO;
import sthing.backend.service.TestResultService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/results")
public class ResultController {

    private final TestResultService testResultService;

    // 테스트 결과 저장 (201)
    @PostMapping
    public ResponseEntity<TestResultResponseDTO> save(@RequestBody TestResultSaveRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(testResultService.save(requestDTO));
    }

    // 공유 링크로 결과 조회 (200)
    @GetMapping("/{shareId}")
    public ResponseEntity<TestResultResponseDTO> findByShareId(@PathVariable String shareId) {
        return ResponseEntity.ok(testResultService.findByShareId(shareId));
    }
}
