package nz.org.cdntrust.pointschangenetworklistener.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import nz.org.cdntrust.pointschangenetworklistener.models.PointsChangeRequest;
import nz.org.cdntrust.pointschangenetworklistener.models.ProtectedPointsChangeRequest;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class PointsController {

    private static final String CHANGES_FILE_NAME = "changesFromAPI.json";
    private static final String PASSWORD_EXPECTED = "leadersarelame";

    private List<PointsChangeRequest> requests;

    public PointsController() {
        this.requests = new ArrayList<>();
    }

    // Basic GET endpoint that can be queried by client devices as a means of checking if this APi is up and reachable
    @GetMapping("/healthcheck")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("All okay!");
    }

    @PostMapping("/changepoints")
    public ResponseEntity<String> notifyPointsChange(@RequestBody PointsChangeRequest request) {
        // "changesFromAPI.json"
        requests.add(request);

        return ResponseEntity.ok("Successfully received points change request");
    }

    @PostMapping("/changepointsprotected")
    public ResponseEntity<String> notifyPointsChangeProtected(@RequestBody ProtectedPointsChangeRequest request) {
        // "changesFromAPI.json"
        if(!request.password.equals(PASSWORD_EXPECTED)) {
            return ResponseEntity.badRequest().body("Incorrect password");
        }
        requests.add(request);

        return ResponseEntity.ok("Successfully received points change request");
    }

    @Scheduled(fixedRate = 1000)
    private void writeChangeRequestsToFile() {
        if (requests.isEmpty()) return;

        // Check if file is empty, if not empty, don't write anything
        var file = new File(CHANGES_FILE_NAME);
        try {
            file.createNewFile(); // Only creates if it does not already exist
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }

        var mapper = new ObjectMapper();
        if (file.length() != 0) return;

        // Sum up all requests
        Map<String, Integer> changes = new HashMap<>();
        for (var request : requests) {
            for (var entry : request.pointChanges.entrySet())
            if (!changes.containsKey(entry.getKey())) {
                changes.put(entry.getKey(), entry.getValue());
            } else {
                changes.replace(entry.getKey(), changes.get(entry.getKey()) + entry.getValue());
            }
        }

        try {
            mapper.writeValue(file, changes);
            requests.clear();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
