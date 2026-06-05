package sthing.backend.dto;

import lombok.Getter;

import java.util.Map;

@Getter
public class DashboardResponseDTO {

    private final long totalCount; //총 참여자
    private final long todayCount; //오늘 참여자
    private final Map<String, Long> mbtiDistribution; //MBTI별 분포
    private final Map<String, Long> dailyTrend; //일별 추이
    private final Map<String, Long> topLinkAccess; //링크접속수 TOP 5 (MBTI별 합산)

    public DashboardResponseDTO(long totalCount, long todayCount,
                                Map<String, Long> mbtiDistribution,
                                Map<String, Long> dailyTrend,
                                Map<String, Long> topLinkAccess) {
        this.totalCount = totalCount;
        this.todayCount = todayCount;
        this.mbtiDistribution = mbtiDistribution;
        this.dailyTrend = dailyTrend;
        this.topLinkAccess = topLinkAccess;
    }
}
