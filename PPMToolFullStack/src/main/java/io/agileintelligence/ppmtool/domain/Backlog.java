package io.agileintelligence.ppmtool.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Contain the project tasks.
 * Decouple the task list from the project.
 * Make loading of project object more efficient (when we only need project info, not everything)
 */
@Entity
public class Backlog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer PTSequence = 0;
    private String projectIdentifier;

    // One to one with project

    // One to many project tasks

    public Backlog() {

    }

    public Long getId() {
        return id;
    }
}
