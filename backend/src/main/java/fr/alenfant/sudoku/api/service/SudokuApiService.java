package fr.alenfant.sudoku.api.service;

import fr.alenfant.sudoku.api.dto.GridFromApiDto;
import fr.alenfant.sudoku.api.model.Grid;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.net.http.HttpHeaders;
import java.util.Arrays;

public class SudokuApiService {
    public static final String URL_API = "https://sudoku-game-and-api.netlify.app/api/sudoku";

    private static SudokuApiService sudokuApiService;

    private final RestTemplate restTemplate;

    private SudokuApiService() {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setSupportedMediaTypes(Arrays.asList(MediaType.TEXT_PLAIN, MediaType.APPLICATION_JSON));
        this.restTemplate = new RestTemplate();
        this.restTemplate.getMessageConverters().addFirst(converter);
    }

    public static SudokuApiService getSudokuApiService() {
        if (SudokuApiService.sudokuApiService == null) {
            SudokuApiService.sudokuApiService = new SudokuApiService();
        }
        return SudokuApiService.sudokuApiService;
    }

    public Grid getNewGridFromApi() {
        GridFromApiDto result = this.restTemplate.getForObject(URL_API, GridFromApiDto.class);
        Grid grid = new Grid();
        grid.setSolution(result.getDataConverted());
        grid.setEasy(result.getEasyConverted());
        grid.setMedium(result.getMediumConverted());
        grid.setHard(result.getHardConverted());
        return grid;
    }
}
