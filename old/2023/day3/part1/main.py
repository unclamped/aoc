input = open("./input", "r")
lines = input.readlines()

special_characters = "@#$%&*-+=/"

total_part_sum = 0

for line_index, line in enumerate(lines):
    print('\n')
    print(line)

    char_index = 0

    while char_index < len(line):
        if line[char_index].isdigit():
            start_index = char_index # 6
            end_index = char_index # 8

            full_number = line[char_index]
            while line[char_index + 1].isdigit():
                full_number += line[char_index + 1]
                char_index += 1
                end_index += 1
            char_index += 1
            # print(full_number)
            stop = False
            while (end_index >= start_index or stop):
                # if its on the left
                if start_index != 0:
                    if line[start_index - 1] in special_characters:
                        total_part_sum += int(full_number)
                        stop = True
                        break
                # right
                if start_index != 139:
                    if line[start_index + 1] in special_characters:
                        total_part_sum += int(full_number)
                        stop = True
                        break
                # up
                if line_index != 0:
                    if lines[line_index - 1][start_index] in special_characters:
                        total_part_sum += int(full_number)
                        stop = True
                        break
                # down
                if line_index != 139:
                    if lines[line_index + 1][start_index] in special_characters:
                        total_part_sum += int(full_number)
                        stop = True
                        break
                # right up
                if start_index != 139 and line_index != 0:
                    if lines[line_index - 1][start_index + 1] in special_characters:
                        total_part_sum += int(full_number)
                        stop = True
                        break
                # right down
                if start_index != 139 and line_index != 139:
                    if lines[line_index + 1][start_index + 1] in special_characters:
                        total_part_sum += int(full_number)
                        stop = True
                        break
                # left up
                if start_index != 0 and line_index != 0:
                    if lines[line_index - 1][start_index - 1] in special_characters:
                        total_part_sum += int(full_number)
                        stop = True
                        break
                # left down
                if start_index != 0 and line_index != 139:
                    if lines[line_index + 1][start_index - 1] in special_characters:
                        total_part_sum += int(full_number)
                        stop = True
                        break
                start_index += 1
        else: char_index += 1

print(total_part_sum)