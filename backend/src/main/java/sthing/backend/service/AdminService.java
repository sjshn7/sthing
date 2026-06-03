package sthing.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import sthing.backend.dto.AdminLoginRequestDTO;
import sthing.backend.dto.AdminLoginResponseDTO;
import sthing.backend.entity.AdminEntity;
import sthing.backend.exception.InvalidCredentialsException;
import sthing.backend.repository.AdminRepository;
import sthing.backend.security.JwtTokenProvider;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

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
}
