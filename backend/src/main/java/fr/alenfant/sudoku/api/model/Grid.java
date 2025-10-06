package fr.alenfant.sudoku.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "grids")
public class Grid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Convert(converter = GridDataConverter.class)
    @Column(name="solution")
    private List<Integer> solution = new ArrayList<>();

    @Convert(converter = GridDataConverter.class)
    @Column(name="easy")
    private List<Integer> easy = new ArrayList<>();

    @Convert(converter = GridDataConverter.class)
    @Column(name="medium")
    private List<Integer> medium = new ArrayList<>();

    @Convert(converter = GridDataConverter.class)
    @Column(name="hard")
    private List<Integer> hard = new ArrayList<>();
}
