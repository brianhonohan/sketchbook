# Ecosystem

## Idea:
Randomly generate a terrain with a set of resources that organisms will compete over.


## Config Options
The Javascript parses the following URL parameters:

| Param         | Description                                          | Data type | Approx Range | Default |
|---------------|------------------------------------------------------|-----------|--------------|---------|
| cellWidth     | Controls the resolution of the terrain.              | Integer   | 1-100        | 5       |
| scale         | Controls the approximate zoom-scale of the terrain.  | Float     |              | 0.02    |
| noise.octaves | The `lod` parameter into P5JS's `noiseDetail`        | Integer   | 1-10         | 10      |
| noise.falloff | The `falloff` parameter into P5JS's `noiseDetail`    | Float   | 0 - 1         | 0.6     |


## Snapshot:

![screenshot](docs/screenshot-01.png)

