package sthing.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sthing.backend.entity.AdminEntity;

public interface AdminRepository extends JpaRepository<AdminEntity, String> {
    // 상속만으로 findById 등 기본 crud 자동 생성
}
