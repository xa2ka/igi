FROM python:latest


RUN git clone https://github.com/smartiqaorg/geometric_lib /app/geometric_lib

#Копируем файлы проекта в рабочую директорию образа
 WORKDIR /app
 COPY . /app

 #Запускаем скрипт при запуске контейнера
 CMD ["python","script.py"]
