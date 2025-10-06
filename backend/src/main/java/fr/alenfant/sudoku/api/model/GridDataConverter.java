package fr.alenfant.sudoku.api.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class GridDataConverter implements AttributeConverter<List<Integer>, String> {
    private static final String SPLIT_CHAR = ";";

    @Override
    public String convertToDatabaseColumn(List<Integer> integers) {
        return integers.stream().map(String::valueOf).collect(Collectors.joining(GridDataConverter.SPLIT_CHAR));
    }

    @Override
    public List<Integer> convertToEntityAttribute(String s) {
        return Stream.of(s.split(SPLIT_CHAR)).map(String::trim).map(Integer::parseInt).collect(Collectors.toList());
    }
}
