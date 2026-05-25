**_Recursion_** is a fundamental programming technique where a function calls itself to solve a problem. The function continues to call itself with smaller or simpler inputs until it reaches a base case—a condition where the answer is straightforward and no further recursion is needed.

Recursion works by breaking a complex problem into smaller sub-problems of the same type. Each recursive call solves a smaller part, and the results are combined to solve the original problem. This approach is especially useful for problems that naturally divide into similar sub-tasks, such as mathematical sequences, tree traversals, and sorting algorithms.

**Example:**
Imagine you have a set of nesting dolls, each placed inside a larger doll. The smallest doll is the base case. To count all dolls, you can define a function that counts the current doll and then calls itself to count the dolls inside. This continues until you reach the smallest doll, which has no contents.

**Simple Recursive Function:**
To calculate the sum of numbers from 1 to n:

```
sum(n):
    if n <= 0:
        return 0
    else:
        return n + sum(n-1)
```

**How it works:**

- _Base case_: When n is 0 or less, the function returns 0. This stops the recursion.
- _Recursive case_: When n is greater than 0, the function calls itself with n-1. This repeats until the base case is reached.
- _Solution_: The function adds n to the sum of numbers from 1 to n-1, building up the answer step by step.

For example, calling sum(4) will compute 4 + sum(3), then 3 + sum(2), and so on, until sum(0) returns 0. The final result is 10.

**Key Points for Writing Recursive Functions:**

1. Define a clear base case that stops the recursion.
2. Write the recursive case to reduce the problem size with each call.
3. Ensure the function always reaches the base case to avoid infinite recursion.

Recursion is a powerful tool for solving problems in computer programming. With practice, you will learn to identify when recursion is appropriate and how to structure recursive solutions effectively.

> For a visual explanation, watch this FreeCodeCamp video:

<iframe width="315" height="90" src="https://www.youtube-nocookie.com/embed/IJDJ0kBx2LM?si=dtiXrVeo-nItieqs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
