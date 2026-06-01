package sthing.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") //cors 설정 적용 경로 범위
                .allowedOrigins("http://localhost:5173") //프론트
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") //허용할 http 메서드 목록
                .allowedHeaders("*") //모든 헤더 허용
                .allowCredentials(true) //쿠키/인증 정보 포함 요청 허용
                .maxAge(3600); //preflight 결과를 1시간 캐시
    }
}
