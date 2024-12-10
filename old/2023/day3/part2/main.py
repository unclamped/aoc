input = open("./input", "r")
lines = input.readlines()

total_ratio_sum = 0
gear_matrix = [[[] for i in range(140)] for i in range(140)]

#print(gear_matrix)

for line_index, line in enumerate(lines):
    #print('\n')
    #print(line)

    char_index = 0

    while char_index < len(line):
        if line[char_index].isdigit():
            start_index = char_index # 6
            end_index = char_index # 8

            part_number = line[char_index]
            while line[char_index + 1].isdigit():
                part_number += line[char_index + 1]
                char_index += 1
                end_index += 1
            char_index += 1

            part_number = int(part_number)
            found_part_number = False

            while (end_index >= start_index or found_part_number):
                # if its on the left
                if start_index != 0:
                    if line[start_index - 1] == '*':
                        found_part_number = True
                        gear_matrix[line_index][start_index - 1].append(part_number)
                        #print(str(part_number))
                        break
                # right
                if start_index != 139:
                    if line[start_index + 1] == '*':
                        found_part_number = True
                        gear_matrix[line_index][start_index + 1].append(part_number)
                        #print(str(part_number))
                        break
                # up
                if line_index != 0:
                    if lines[line_index - 1][start_index] == '*':
                        found_part_number = True
                        gear_matrix[line_index - 1][start_index].append(part_number)
                        #print(str(part_number))
                        break
                # down
                if line_index != 139:
                    if lines[line_index + 1][start_index] == '*':
                        found_part_number = True
                        gear_matrix[line_index + 1][start_index].append(part_number)
                        #print(str(part_number))
                        break
                # right up
                if start_index != 139 and line_index != 0:
                    if lines[line_index - 1][start_index + 1] == '*':
                        found_part_number = True
                        gear_matrix[line_index - 1][start_index + 1].append(part_number)
                        #print(str(part_number))
                        break
                # right down
                if start_index != 139 and line_index != 139:
                    if lines[line_index + 1][start_index + 1] == '*':
                        found_part_number = True
                        gear_matrix[line_index + 1][start_index + 1].append(part_number)
                        #print(str(part_number))
                        break
                # left up
                if start_index != 0 and line_index != 0:
                    if lines[line_index - 1][start_index - 1] == '*':
                        found_part_number = True
                        gear_matrix[line_index - 1][start_index - 1].append(part_number)
                        #print(str(part_number))
                        break
                # left down
                if start_index != 0 and line_index != 139:
                    if lines[line_index + 1][start_index - 1] == '*':
                        found_part_number = True
                        gear_matrix[line_index + 1][start_index - 1].append(part_number)
                        #print(str(part_number))
                        break
                start_index += 1
        else: char_index += 1

print(gear_matrix)

for line in gear_matrix:
    for position in line:
        #print(position)
        if len(position) == 2:
            #print(f"${line}, ${position}")
            print("found an asterisk with two part nums!")
            total_ratio_sum += position[0] * position[1]

print(total_ratio_sum)