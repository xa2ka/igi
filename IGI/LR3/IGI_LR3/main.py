from InputFunctions import GetIntInput
from Task1 import Task1
from Task2 import Task2
from Task3 import Task3
from Task4 import Task4
from Task5 import Task5






while True:
    choice = GetIntInput("please, enter the number of task or '0' for end: ")

    match choice:
        case 1:
            Task1()
        case 2:
            Task2()
        case 3:
            Task3()
        case 4:
            Task4()
        case 5:
            Task5()
        case 0:
            break
        case _:
            print("incorrect input.")