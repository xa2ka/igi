from Decorators import MeasureTime
from InputFunctions import GetIntInput


text = "So she was considering in her own mind, as well as she could, for the hot day made her feel very sleepy and stupid,\
      whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when\
          suddenly a White Rabbit with pink eyes ran close by her."

def SplittingText(text):
    lst = text.split(" ")

    for i in range(len(lst)):
        lst[i] = lst[i].replace(",", "")
    return lst

def SearchNumOfWordsFirstConsonant(lst):
    consonant_count = 0
    consonants = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"

    for word in lst:
        if word and word[0] in consonants:
            consonant_count += 1

    print("Number of words starting with a consonant:", consonant_count)


def SearchWordsConsecutiveLetters(lst):
    matching_words = []

    for i, word in enumerate(lst):
        for j in range(len(word) - 1):
            if word[j] == word[j + 1]:
                matching_words.append((word, i + 1))

    print("Words with consecutive identical letters and their indices:")
    for word, index in matching_words:
        print("Word:", word, "Index:", index)
    return

def SortWords(lst):    
    word_list = [word.lower() for word in lst]
        # Sorting words in alphabetical order
    word_list.sort()

    print("Words in alphabetical order:")
    for word in word_list:
        print(word)



@MeasureTime
def Task4(): 
    """"" 
    a) determine the number of words that begin with a consonant;
    b) find words containing two identical letters in a row and their
    ordinal numbers;
    c) print the words in alphabetical order
    """
    lst=""
    choice=GetIntInput("how do you want to input text?\n\
                       1)From Task?\n\
                       2)User input\n\
                       0)Exit\n\
                       Write your answer: ")

    match choice:
        case 1:
            lst=text
        case 2:
            lst = input("Write your text: ")
        case 0:
            return
        case _:
            print("incorrect input.")
    
    lst = SplittingText(text)

    while True:
        print("please, enter option from 1 to 3 or '0' to exit:\n\
                           1)count of words with first consonant\n\
                           2)Words with consecutive identical letters and their indices\n\
                           3)Words in alphabetical order \n")
        
        choice = GetIntInput("please, enter option from 1 to 3 or '0' to exit: ")

        if choice == 1:
            SearchNumOfWordsFirstConsonant(lst)
        elif choice == 2:
            SearchWordsConsecutiveLetters(lst)
        elif choice == 3:
            SortWords(lst)
        elif choice == 0:
            return
        else:
            print("incorrect input.")
            continue