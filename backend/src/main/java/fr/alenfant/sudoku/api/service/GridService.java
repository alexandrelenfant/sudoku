package fr.alenfant.sudoku.api.service;

import fr.alenfant.sudoku.api.model.Grid;
import fr.alenfant.sudoku.api.repository.GridRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Data
@Service
public class GridService {
    @Autowired
    private GridRepository gridRepository;

    public Grid createGrid() {
        return gridRepository.save(SudokuApiService.getSudokuApiService().getNewGridFromApi());
    }

    public Grid getGrid(Long id) {
        return gridRepository.findById(id).orElseGet(this::createGrid);
    }

    /**
     *
     * @param id Grid identifier
     * @param data Grid data
     * @return Valid boxes data
     * @throws NoSuchElementException Exception thrown if the grid is not register in the database
     */
    public boolean checkGrid(Long id, List<Integer> data) {
        List<Integer> validBoxes = new ArrayList<>();
        Grid grid = gridRepository.findById(id).orElseThrow();
        List<Integer> solution = grid.getSolution();
        for (int i = 0; i < data.size(); ++i) {
            if(!solution.get(i).equals(data.get(i)))
                return false;
        }
        return true;
    }
}
