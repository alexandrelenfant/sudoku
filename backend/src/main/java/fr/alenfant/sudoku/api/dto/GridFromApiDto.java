package fr.alenfant.sudoku.api.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

@Data
public class GridFromApiDto implements Serializable {
    private int[][] data;

    private int[][] easy;

    private int[][] medium;

    private int[][] hard;

    public List<Integer> getDataConverted() {
        return Arrays.stream(data).flatMapToInt(Arrays::stream).boxed().toList();
    }

    public List<Integer> getEasyConverted() {
        return Arrays.stream(easy).flatMapToInt(Arrays::stream).boxed().toList();
    }

    public List<Integer> getMediumConverted() {
        return Arrays.stream(medium).flatMapToInt(Arrays::stream).boxed().toList();
    }

    public List<Integer> getHardConverted() {
        return Arrays.stream(hard).flatMapToInt(Arrays::stream).boxed().toList();
    }
}
