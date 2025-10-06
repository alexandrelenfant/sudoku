package fr.alenfant.sudoku.api.controller;

import fr.alenfant.sudoku.api.dto.GridDto;
import fr.alenfant.sudoku.api.model.Grid;
import fr.alenfant.sudoku.api.service.GridService;
import fr.alenfant.sudoku.api.service.RandomNumberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class GridController {
    @Autowired
    private GridService gridService;

    @GetMapping
    @ResponseBody
    public GridDto getGrid(
            @RequestParam(required = false, name="id") final Long id,
            @RequestParam(required = false, name="difficulty", defaultValue="random") String difficulty
    ) {
        GridDto gridDto = new GridDto();
        if("random".equals(difficulty)) {
            int difficultyNumber = RandomNumberService.getInstance().getRandomInt(0, 2);
            difficulty = 0 == difficultyNumber ? "easy" : 1 == difficultyNumber ? "normal" : "hard";
        }
        gridDto.setDifficulty(difficulty);

        Grid grid = null == id ? gridService.createGrid() : gridService.getGrid(id);
        gridDto.setId(grid.getId());

        switch(gridDto.getDifficulty()) {
            case "hard":
                gridDto.setData(grid.getHard());
                break;
            case "normal":
                gridDto.setData(grid.getMedium());
                break;
            default:
                gridDto.setData(grid.getEasy());
                break;
        }
        return gridDto;
    }

    @PostMapping("/check/{id}")
    @ResponseBody
    public boolean checkGrid(
            @PathVariable("id") final Long id,
            @RequestBody List<Integer> data
    ) {
        return gridService.checkGrid(id, data);
    }
}
