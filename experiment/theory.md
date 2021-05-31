Recursion simply means applying a function as a part of the definition of that same function. Suppose we have to find the factorial of a number. The mathematical factorial function is defined as being the product of all the numbers up to and including the number, and the factorial of 1 is 1. Thinking about this, we see that another way to express this is that the factorial of N is equal to N times the factorial of (N-1).

Thus:

1! = 1 2! = 1 x 2 = 1! x 2 3! = 1 x 2 x 3 = 2! x 3 = 6 --- --- N! = 1 x 2 x 3 x .... (N-2) x (N-1) x N = (N-1)! x N

  

So we can express this as:

factorial(n): if n == 1: return 1 else: return n * factorial(n-1)

The important thing to remember when creating a recursive function is to give an 'end-conditions' or the 'base cases'. We don't want the function to keep calling itself forever, do we? Somehow, it should know when to stop. So, we give it a base case. Like here the base case is for n=1. The key to making this work is that there must be a terminating condition such that the function branches to a non-recursive solution at some point.

Hence a feasible recursive solution will have the following two properties:

1.  A simple base case (or cases), and
2.  A set of rules which reduce all other cases toward the base case.
