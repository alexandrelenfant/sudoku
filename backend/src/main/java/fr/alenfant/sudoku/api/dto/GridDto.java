package fr.alenfant.sudoku.api.dto;

import lombok.Data;

import java.util.List;

@Data
public class GridDto {
    private Long id = null;

    private String difficulty = null;

    private List<Integer> data = null;
}
