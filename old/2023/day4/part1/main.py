input = open("./input", "r")
lines = input.readlines()

import re

total_point_sum = 0

for line in lines:
    line = line.strip()
    char_index = 0
    winning_numbers = []
    elf_numbers = []
    matching_numbers = []
    point_sum = 0

    line = line.split(': ')
    line = line.pop()
    line = line.split(' | ')
    line[0] = re.sub(r" +", " ", line[0]).split(" ")
    line[1] = re.sub(r" +", " ", line[1]).split(" ")
    for numbers in line:
        while("" in numbers):
            numbers.remove("")
    
    numbers = [int(i) for i in numbers]
    
    #print(line)

    winning_numbers = line[0]
    elf_numbers = line[1]

    for number in elf_numbers:
        for win_number in winning_numbers:
            if number == win_number:
                matching_numbers.append(number)

    print(matching_numbers)


    if matching_numbers:
        point_sum = 1
        matching_numbers.pop()

    for i in matching_numbers:
        point_sum += point_sum

    total_point_sum += point_sum

print(total_point_sum)