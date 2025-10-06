package fr.alenfant.sudoku.api.repository;

import fr.alenfant.sudoku.api.model.Grid;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GridRepository extends CrudRepository<Grid, Long> {
}
