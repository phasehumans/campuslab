Given an R x C integer grid representing an image, where each value is the color of a pixel, perform a flood fill starting from the pixel (sr, sc) with newColor.

The flood fill recolors the starting pixel and every pixel connected to it: two pixels are connected if they share a side (up, down, left or right) and have the same color as the starting pixel. All of those pixels get newColor; every other pixel keeps its color. Rows and columns are 0-indexed.

**Input Format:**
- First line: R C
- Next R lines: C integers representing the image
- Last line: sr sc newColor

**Output Format:**
- R lines of C space-separated integers representing the modified grid.
