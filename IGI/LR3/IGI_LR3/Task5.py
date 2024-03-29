from InputFunctions import ListInput,GetFloatInput,GetIntInput,RandomSequenceInput
from Decorators import MeasureTime

def process_list(lst, C):
    """Function to perform the main task"""
    positive_count = 0
    product = 1.0
    max_abs_value = None
    max_abs_index = None

    for i, num in enumerate(lst):
        if num > C:
            positive_count += 1

        if max_abs_value is None or abs(num) > abs(max_abs_value):
            max_abs_value = num
            max_abs_index = i

    if max_abs_index is not None and max_abs_index < len(lst) - 1:
        product = 1.0
        for num in lst[max_abs_index + 1:]:
            product *= num

    print("Number of positive elements in the list greater than C:", positive_count)
    print("Product of the elements in the list after the maximum absolute value:", product)
    return

@MeasureTime
def Task5():
    """""
    Find the number of positive elements of the list, large numbers C 
    (parameter C is entered from the keyboard by the user) and the product
    of the list items located after the maximum modulo element
    """
    lst = []
    choice=GetIntInput("how do you want to complete the sequence?\n\
                       1)Random\n\
                       2)User input\n\
                       0)Exit\n")

    match choice:
        case 1:
            lst=RandomSequenceInput()
        case 2:
            lst = ListInput()
        case 0:
            return
        case _:
            print("incorrect input.")
    
    C = GetFloatInput("Enter the number C: ")
    process_list(lst,C)
    print(lst)
    return 



