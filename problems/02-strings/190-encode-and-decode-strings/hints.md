Use a length-prefix method. For each string `s`, encode it as `len(s) + '#' + s`. This ensures that we know exactly how many characters to read next, avoiding collisions with '#' itself.
