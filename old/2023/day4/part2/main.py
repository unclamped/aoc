input = open("./input", "r")
lines = input.readlines()

import re

winning_cards = []
total_card_sum = 0

for line in lines:
    # remove newline
    line = line.strip()
    char_index = 0
    card_number = ''
    winning_numbers = []
    elf_numbers = []
    matching_numbers = []

    line = line.split(': ')
    for char in line[0]:
        if char.isdigit():
            card_number += char
    card_number = int(card_number)
    print(card_number)
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
    winning_cards.append([card_number, len(matching_numbers), 1])
print(winning_cards)

for card_index, card in enumerate(winning_cards):
    for i in range(card[1]):
        winning_cards[card_index + i + 1][2] += card[2]
    total_card_sum += card[2]

print(winning_cards)

print(total_card_sum)