package sthing.backend.dto;

import lombok.Getter;

@Getter
public class AdminLoginResponseDTO {
    private final String token; //프론트에 돌려줄 token

    public AdminLoginResponseDTO(String token) {
        this.token = token;
    }
}
