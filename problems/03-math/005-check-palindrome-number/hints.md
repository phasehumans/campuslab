A negative number can never be a palindrome because of its minus sign.
For a non-negative number, build its reverse digit by digit with `rev = rev * 10 + x % 10` and `x = x / 10`, then compare it with the original. Use a 64-bit variable for the reverse, since reversing a large 32-bit number can overflow.
