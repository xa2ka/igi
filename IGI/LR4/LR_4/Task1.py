import csv
import pickle

class Student:
    def __init__(self,name,run_result,jump_result):
        self.name = name
        self.run_result = run_result
        self.jump_result=jump_result

class GTOStandarts:
    def __init__(self,run_norm=0,jump_norm=0):
        self.run_norm=run_norm
        self.jump_norm=jump_norm


class DataManager:
    def __init__(self,students_file):
        self.students_file=students_file

    def SaveStudents(self,students):
        pass
    
    def LoadStudents(self,studens):
        pass

    def CheckGTOResults(self,gto_standards,students):
        failed_students=[]
        passed_students=[]
        top_students=[]

        for student in students:
            if student.run_result > gto_standards.run_norm or student.jump_result > gto_standards.jump_norm:
                failed_students.append(student)
            else:
                passed_students.append(student)

        sorted_students=sorted(passed_students,key=lambda x: x.run_result + x.jump_result,reverse=True)
        
        top_students=sorted_students[:3]        

        return failed_students,passed_students,top_students
    

class GTOManagerCSV(DataManager):
    
    def save_students(self,students):
        with open(self.students_file,'w',newline='') as file:
            writer=csv.writer(file)
            writer.writerow(['Name','Run Result', 'Jump Result'])
            for student in students:
                writer.writerow([student.name,student.run_result,student.jump_result])
   
    def load_students(self):
        students = []
        with open(self.students_file, 'r') as file:
            reader = csv.reader(file)
            next(reader)  
            for row in reader:
                name, run_result, jump_result = row
                student = Student(name, float(run_result), float(jump_result))
                students.append(student)
        return students


class GTOManagerCSVPickle(DataManager):
    def save_students(self, students):
        with open(self.students_file, 'wb') as file:
            pickle.dump(students, file)

    def load_students(self):
        with open(self.students_file, 'rb') as file:
            students = pickle.load(file)
        return students
    

students = [
    Student("Иван", 12.5, 4.2),
    Student("Мария", 14.3, 3.8),
    Student("Алексей", 11.9, 4.5),
    Student("Елена", 13.2, 4.0),
    Student("Дмитрий", 15.1, 3.6),
]

csv_manager = GTOManagerCSV('students.csv')

csv_manager.save_students(students)
print("Данные сохранены в файл CSV.")

loaded_students = csv_manager.load_students()


run_norm=int(input("Введите норму для бега(s): "))

jump_norm=int(input("Введите норму для прыжка(s): "))

GTO_Standarts=GTOStandarts(run_norm,jump_norm)

failed_students, passed_students, top_students = csv_manager.CheckGTOResults(GTO_Standarts,loaded_students)

print("Ученики, не выполнившие нормы ГТО:")
for student in failed_students:
    print(student.name)

print("\nКоличество учеников, сдавших нормы ГТО:", len(passed_students))

print("\nТоп 3 учеников:")
for student in top_students:
    print(student.name)

pickle_manager = GTOManagerCSVPickle('students.pickle')

pickle_manager.save_students(students)
print("Данные сохранены с помощью модуля pickle.")

loaded_students = pickle_manager.load_students()

failed_students, passed_students, top_students = pickle_manager.CheckGTOResults(GTO_Standarts,loaded_students)

print("Ученики, не выполнившие нормы ГТО:")
for student in failed_students:
    print(student.name)

print("\nКоличество учеников, сдавших нормы ГТО:", len(passed_students))

print("\nТоп 3 учеников:")
for student in top_students:
    print(student.name)    