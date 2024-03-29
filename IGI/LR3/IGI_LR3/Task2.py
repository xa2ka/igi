from Decorators import MeasureTime
from InputFunctions import GetIntInput


@MeasureTime
def Task2():
    """
    Organize a loop that takes integers from the keyboard and 
    counts the number of numbers less than the number 10. The end
    of the cycle is the input of the number 100.
    """
    lst=[]

    count = 0  # Initialize the counter

    while True:  # Infinite loop
        num = GetIntInput("Enter an integer: ")  # User input
        
        if num == 100:  # Check for loop termination
            break
        
        if num < 10:  # Check the condition (number less than 10)
            count += 1  # Increment the counter

    print("Number of numbers less than 10:", count)  # Output the result

