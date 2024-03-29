from math import cos, factorial
from Decorators import MeasureTime
from InputFunctions import GetFloatInput

def CalculateMyCos(x, eps):
    Result = 0
    n = 0
    while eps is not None and abs(cos(x) - Result) > eps and n + 1 < 500:
        Result += ((-1) ** n) * ((x ** (2 * n)) / factorial(2 * n))
        n += 1
    if eps is not None:
        print(f"x = {x}, n = {n}, F(x) = {Result}, Math F(x) = {cos(x)}, eps = {eps}")
    else:
        print("Incorrect input")
    return


@MeasureTime
def Task1():
    """Create a program to calculate the value of a function by 
    decomposing the function into a power series. Set the accuracy of eps calculations.
    
    This function takes user input for `x` and `eps` and calculates the value of a function
    by decomposing it into a power series. It checks the accuracy of `eps` and continues
    until the user enters incorrect input or chooses to exit.
    """
    while True:
        x = GetFloatInput("Please write your x: ")
        eps = GetFloatInput("Please write your eps: ")
        
        if abs(eps) > 1 or eps < 0:
            print("Incorrect input!")
            continue

        CalculateMyCos(x, eps)
        return     