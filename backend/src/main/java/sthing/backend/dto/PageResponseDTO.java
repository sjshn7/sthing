package sthing.backend.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * 페이징처리 응답 공통 DTO
 * page 객체를 그대로 반환하면 불필요한 메타데이터가 많이 포함되므로 직접 필요한 것만 추린다
 */
@Getter
public class PageResponseDTO<T> {
    private final List<T> content; //현재 페이지 데이터 목록
    private final int totalPages; //전체 페이지 수
    private final long totalElements; //전체 데이터 수
    private final int currentPage; //현재 페이지 번호(0부터 시작)

    public PageResponseDTO(Page<T> page) {
        this.content = page.getContent();
        this.totalPages = page.getTotalPages();
        this.totalElements = page.getTotalElements();
        this.currentPage = page.getNumber();
    }
}
