package org.example.api.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        Hibernate5Module hibernate5Module = new Hibernate5Module();

        // Disable or enable various features as needed
        hibernate5Module.disable(Hibernate5Module.Feature.USE_TRANSIENT_ANNOTATION);
        hibernate5Module.enable(Hibernate5Module.Feature.FORCE_LAZY_LOADING); // Enable force lazy loading if needed

        mapper.registerModule(hibernate5Module);
        return mapper;
    }
}
