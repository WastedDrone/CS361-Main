title = input("Please enter title: ")
content = input("Please enter content: ")

with open("notes.txt", "a") as file:
   file.write(title)
   file.write("Content" + content)

def open_note():
    openNote = input("Please write note title you would like to read: ")
    with open(openNote, "r") as file:
        note = file.read()
    return note

def edit_note():
    editNote = input("Please enter note title to edit")
    with open(editNote, "a") as file:
        file.write(editNote + "/n")
    return editNote

def view_note():
    title = input("Enter note title: ")

    with open("notes.txt", "r") as file:
        notes = file.read()

    # Add your if/else statement here
    if title in notes:
       return print("found it")

    else:
       return print("not found")
view_note()

def read_titles():
    with open("notes.txt", "r") as file:
        lines = file.readlines()
    for i in 
    if title in lines:
        print("titles: ")
    else:
        print ("not found.")