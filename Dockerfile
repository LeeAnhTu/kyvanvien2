# Đặt file này ở GỐC repo (cùng cấp với thư mục api/, kyvanvien/, my-appadmin/)
# Tên file khi commit lên GitHub: Dockerfile (không phải Dockerfile.root)

FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY api/pom.xml .
RUN mvn -B dependency:go-offline
COPY api/src ./src
RUN mvn -B clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
