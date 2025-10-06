#!/bin/sh
if ! [ -f "./target/sudoku.jar" ]; then
  mvn clean && mvn package
fi
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8082 -jar ./target/sudoku.jar