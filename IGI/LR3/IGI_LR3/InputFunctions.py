import random 


def GetIntInput(string):
    while True:
        try:
            input_ = input(f"{string}")
            if input_ == "None":
                raise ValueError("None is not a valid input.")
            else:
                input_ = int(input_)
                return input_
        except ValueError as e:
            print(str(e))

def GetFloatInput(string):
    while True:
        try:
            input_ = input(f"{string}")
            if input_ == "None":
                raise ValueError("None is not a valid input.")
            else:
                input_ = float(input_)
                return input_
        except ValueError as e:
            print(str(e))
                
def UserSequenceInput():
    lst=[]
    numbers=input(("Please,write your sequence:"))
    lst = [float(num) for num in numbers.split()]
    
def RandomSequenceGenerator():
    size = random.randint(10, 101)
    for _ in range(size):
        yield random.uniform(1, 1000)

def RandomSequenceInput():
    sequence = list(RandomSequenceGenerator())
    print("Randomly generated list:\n", sequence)
    return sequence

def ListInput():
    lst = []
    while True:
        try:
            n = int(input("Enter the number of list elements: "))
            if n <= 0:
                raise ValueError
            break
        except ValueError:
            print("Error: Please enter a positive integer number.")

    for i in range(n):
        while True:
            try:
                value = float(input(f"Enter element {i + 1}: "))
                lst.append(value)
                break
            except ValueError:
                print("Error: Please enter a real number.")

    return lst