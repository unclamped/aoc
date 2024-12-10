input = open("./input", "r")
lines = input.readlines()

time = lines[0]
record_distance = lines[1]

# remove da whiteline
time = time.strip()
record_distance = record_distance.strip()

# remove zhe first word, we already know which is times and which is record_distances
time = time.split(': ')
time = time.pop()
record_distance = record_distance.split(': ')
record_distance = record_distance.pop()

# remove spaces
time = time.replace(" ", "")
record_distance = record_distance.replace(" ", "")

# integer-ify everything
time = int(time)
record_distance = int(record_distance)

print(time)
print(record_distance)

winning_hold_times = []
hold_time = 1

print(f"time is {time}, record distance is {record_distance}")
while True:
    print(hold_time)
    rest_time = time - hold_time
    if hold_time * rest_time > record_distance:
        # we'll just append the ones that are actually winners
        winning_hold_times.append(hold_time)
        print("this beats it! " + str(hold_time))
        break
    hold_time += 1

#ill just hardcode this to save sum time
#winning_hold_times.append(7387245)

# adding a minus one, because otherwise there would be no time to release
hold_time = time - 1

while True:
    print(hold_time)
    rest_time = time - hold_time
    if hold_time * rest_time > record_distance:
        # we'll just append the ones that are actually winners
        winning_hold_times.append(hold_time)
        print("this beats it! " + str(hold_time))
        break
    hold_time -= 1

print(winning_hold_times)
print(winning_hold_times[1] - winning_hold_times[0] + 1)