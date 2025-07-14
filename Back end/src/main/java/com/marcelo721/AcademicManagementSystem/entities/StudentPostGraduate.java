package com.marcelo721.AcademicManagementSystem.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentPostGraduate extends Student {

    // cursos que o aluno já cursou para alunos de graduação
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "postgraduate_previous_courses", joinColumns = @JoinColumn(name = "student_code"))
    @Column(name = "subject_name")
    private List<String> previousCourses = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "advisor_id")
    private Teacher advisor;
}
