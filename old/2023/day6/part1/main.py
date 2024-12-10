input = open("./input", "r")
lines = input.readlines()

times = lines[0]
record_distances = lines[1]

total_ways_sum = 0

# remove da whiteline
times = times.strip()
record_distances = record_distances.strip()

# remove extra spaces
times = " ".join(times.split())
record_distances = " ".join(record_distances.split())

# remove zhe first word, we already know which is times and which is record_distances
times = times.split(': ')
times = times.pop()
record_distances = record_distances.split(': ')
record_distances = record_distances.pop()

# split into individual element for each number there is, separate by space
times = times.split(" ")
times = [int(i) for i in times]
record_distances = record_distances.split(" ")
record_distances = [int(i) for i in record_distances]

#print(times)
#print(record_distances)

for time_index, time in enumerate(times):
    record_distance = record_distances[time_index]

    winning_hold_times = []
    hold_time = 1

    print(f"time is {time}, record distance is {record_distance}")
    while hold_time < time:
        print(hold_time)
        rest_time = time - hold_time
        if hold_time * rest_time > record_distance:
            # we'll just append the ones that are actually winners
            winning_hold_times.append(hold_time)
            print("this beats it! " + str(hold_time))
        hold_time += 1

    print(winning_hold_times)
    if total_ways_sum:
        total_ways_sum *= len(winning_hold_times)
    else:
        total_ways_sum += len(winning_hold_times)
    
print(total_ways_sum)