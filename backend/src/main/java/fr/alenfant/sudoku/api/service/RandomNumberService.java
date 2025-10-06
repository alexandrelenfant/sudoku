package fr.alenfant.sudoku.api.service;

import java.util.Random;

public class RandomNumberService {
    private static RandomNumberService randomNumberService;

    private final Random rand;

    public static RandomNumberService getInstance() {
        if (RandomNumberService.randomNumberService == null) {
            RandomNumberService.randomNumberService = new RandomNumberService();
        }
        return RandomNumberService.randomNumberService;
    }

    private RandomNumberService() {
        this.rand = new Random();
    }

    public int getRandomInt(int min, int max) {
        return rand.nextInt((max - min) + 1) + min;
    }
}
