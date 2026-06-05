package sthing.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * 요청마다 토큰 검증
 * 모든 HTTP 요청이 컨트롤러에 도달하기 전에 이 필터를 거침
 * 요청 -> Authorization 헤더에서 토큰 추출 -> 유효한 토큰이면 adminId를 SecurityContext에 저장 -> 다음 필터로 넘김 (컨트롤러까지 도달)
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = resolveToken(request);

        if (token != null && jwtTokenProvider.validateToken(token)) {
            String adminId = jwtTokenProvider.getAdminId(token);
            UsernamePasswordAuthenticationToken authentication =
                    // Spring Security에게 '이 요청은 인증됨' 을 알리는 객체. 세 번째 인자(권한 목록)는 빈 리스트 
                    new UsernamePasswordAuthenticationToken(adminId, null, List.of());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    // 'Bearer eyJ...' 형태에서 'Bearer' 제거 후 순수 토큰만 반환
    private String resolveToken(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            return bearer.substring(7);
        }
        return null;
    }
}
