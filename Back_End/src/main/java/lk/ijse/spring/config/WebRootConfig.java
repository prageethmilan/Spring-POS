package lk.ijse.spring.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * @author : M-Prageeth
 * @created : 23/06/2022 - 1:07 PM
 **/
@Configuration
@Import(JPAConfig.class)
public class WebRootConfig {

}
