package nz.org.cdntrust.pointschangenetworklistener;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PointsChangeNetworkListenerApplication {

    public static void main(String[] args) {
        SpringApplication.run(PointsChangeNetworkListenerApplication.class, args);
    }

}
