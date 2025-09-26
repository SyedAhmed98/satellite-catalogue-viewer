# satellite-catalogue-viewer

## Description

A viewer application that reads 3le data and visualises satellite data around Earth.

## Technologies

Written in TypeScript using ThreeJS to handle the OpenGL implemenation. Jest is being used for unit tests.

## Learnings
This section will be used to track things that I have learnt during the development of this project.

- Learning to parse 3LE
    - There is a possible downside with the current implmentation where if the 3le file is large enough more data than necessary is being loaded into memory. Which could be avoided by reading the data lines by line.
- Learn shaders for render effects

## Useful Documentation

- [3le Documentation SpaceTrack](https://www.space-track.org/documentation#tle-alpha5)
- [Two Line Element Wiki](https://en.wikipedia.org/wiki/Two-line_element_set)
