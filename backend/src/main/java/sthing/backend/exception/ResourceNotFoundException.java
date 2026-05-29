package sthing.backend.exception;

// 커스텀 예외 클래스
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
