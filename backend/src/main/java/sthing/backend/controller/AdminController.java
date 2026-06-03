package sthing.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sthing.backend.dto.AdminLoginRequestDTO;
import sthing.backend.dto.AdminLoginResponseDTO;
import sthing.backend.service.AdminService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponseDTO> login(@RequestBody AdminLoginRequestDTO requestDTO) {
        return ResponseEntity.ok(adminService.login(requestDTO));
    }
}
