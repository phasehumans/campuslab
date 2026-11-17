Check each bit position independently. For each bit of c:
- If c_bit = 1: at least one of a_bit or b_bit must be 1. If both are 0, we need 1 flip.
- If c_bit = 0: both a_bit and b_bit must be 0. Each 1-bit among them requires a flip.
