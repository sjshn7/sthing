package sthing.backend.exception;

/**
 * 로그인 실패 시 401 응답
 */
public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }
}
