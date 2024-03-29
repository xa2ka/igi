from Decorators import MeasureTime

def FindingNumOfDigitsAndLowaerCase(str): 
    count=0

    for char in str:
        if char.islower() or char.isdigit():
            count+=1
    print(f"Number of digits and lowercase letters: {count}")
    return

@MeasureTime
def Task3():
    """"
    In the line entered from the keyboard, count the number
    of lowercase letters and numbers.
    """

    str = input("Write your string: ")
    FindingNumOfDigitsAndLowaerCase(str)