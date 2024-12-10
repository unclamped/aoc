input = open(",,/input", "r")
lines = input.readlines()

for line_index, line in enumerate(lines):
    lines[line_index] = line.strip()
lines[0] = lines[0].split(': ')
lines[0] = lines[0].pop()
lines[0] = lines[0].split(' ')

source_numbers = [int(i) for i in lines[0]]
unmatched_source_numbers = [int(i) for i in lines[0]]
destination_numbers = []

#print(source_numbers)
#print(lines)

# 1 is seed to soil, 2 is soil to fert, 3 fert to water, 4 wat to light, 5 light to temp, 6 temp to humidity, 7 humid to location
stage = 0
line_index = 0

while line_index < len(lines):
    line = lines[line_index]
    
    #print(line)

    #if line is blank
    if not line:
        line_index += 1
        #print('blank line')
        continue

    #if there's a new stage
    if line[len(line) - 1] == ":":
        if stage != 0:
            if len(unmatched_source_numbers) != 0:
                for source_number in unmatched_source_numbers:
                    destination_numbers.append(source_number)
                # print(destination_numbers)
        stage += 1
        #print('new stage')
        if destination_numbers:
            source_numbers = destination_numbers
            unmatched_source_numbers = source_numbers
            destination_numbers = []
        line_index += 1
        continue

    #if we can start checking for numbers
    if stage > 0:
        line = line.strip()
        line = line.split(" ")

        #print(line)
        stage_numbers = [int(i) for i in line]

        #print(stage_numbers)

        #stage_numbers[0] is the original, stage_numbers[0] + stage_numbers[2] - 1 is with an added range
        #stage_numbers[1] is the original, stage_numbers[1] + stage_numbers[2] - 1 is with an added range

        for source_number in source_numbers:
            if source_number >= stage_numbers[1] and source_number <= stage_numbers[1] + stage_numbers[2] - 1:
                extender = source_number - stage_numbers[1]
                destination_numbers.append(stage_numbers[0] + extender)
                unmatched_source_numbers.remove(source_number)

        #print(destination_numbers)

    line_index += 1

print(min(destination_numbers))