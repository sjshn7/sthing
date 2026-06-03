package sthing.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdminLoginRequestDTO {
    // 프론트에서 받을 adminId, pw
    private String adminId;
    private String pw;
}
