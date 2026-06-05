package sthing.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

// api 문서 기본 정보 설정 - http://localhost:8080/swagger-ui/index.html 에서 확인
@OpenAPIDefinition(
    info = @Info(
            title = "기묘한 이야기 성격 테스트 API",
            version = "1.0",
            description = "테스트 결과 저장/조회 및 관리자 API"
    )
)
@Configuration
public class SwaggerConfig {
}
