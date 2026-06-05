package sthing.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table (name = "admin")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) //접근 권한
public class AdminEntity { //관리자

    @Id
    @Column (nullable = false, unique = true)
    private String adminId;

    // 관리자명
    @Column (nullable = false)
    private String name;

    // 비밀번호
    @Column (nullable = false)
    private String pw;

    // 계정 생성 시각
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @Builder
    public AdminEntity(String adminId, String name, String pw) {
        this.adminId = adminId;
        this.name = name;
        this.pw = pw;
    }
}
