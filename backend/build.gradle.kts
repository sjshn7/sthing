plugins {
	java
	id("org.springframework.boot") version "3.5.14"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "sthing"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-security") //Spring Security 프레임워크
	implementation("io.jsonwebtoken:jjwt-api:0.12.6") //JWT 생성/파싱 API
	runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.6") //JWT 실제 구현체 (런타임에만 필요)
	runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.6") //JWT, JSON 변환용
	compileOnly("org.projectlombok:lombok")
	runtimeOnly("com.mysql:mysql-connector-j")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testCompileOnly("org.projectlombok:lombok")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
	testAnnotationProcessor("org.projectlombok:lombok")
	implementation("org.springframework.boot:spring-boot-starter-thymeleaf")

}

tasks.withType<Test> {
	useJUnitPlatform()
}
