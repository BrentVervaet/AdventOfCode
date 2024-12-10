def parse_files(rules_file, updates_file):
    with open(rules_file, 'r') as rf:
        rules = [tuple(map(int, line.strip().split('|'))) for line in rf.readlines()]
    with open(updates_file, 'r') as uf:
        updates = [list(map(int, line.strip().split(','))) for line in uf.readlines()]
    return rules, updates

def is_update_ordered(update, rules):
    # Filter rules to only include pages in the update
    relevant_rules = [rule for rule in rules if rule[0] in update and rule[1] in update]
    # Check if each rule is respected
    for a, b in relevant_rules:
        if update.index(a) > update.index(b):
            return False
    return True

def order_update(update, rules):
    # Create a graph of rules
    from collections import defaultdict, deque
    
    # Build adjacency list and in-degree count
    graph = defaultdict(list)
    in_degree = {page: 0 for page in update}

    for a, b in rules:
        if a in update and b in update:  # Only consider relevant rules
            graph[a].append(b)
            in_degree[b] += 1

    # Perform topological sorting (Kahn's algorithm)
    ordered_pages = []
    zero_in_degree_queue = deque([page for page in update if in_degree[page] == 0])

    while zero_in_degree_queue:
        current = zero_in_degree_queue.popleft()
        ordered_pages.append(current)

        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                zero_in_degree_queue.append(neighbor)

    return ordered_pages if len(ordered_pages) == len(update) else update

def find_middle_page(update):
    n = len(update)
    return update[n // 2]  # Middle page based on the original order

def sum_middle_pages(rules_file, updates_file):
    rules, updates = parse_files(rules_file, updates_file)
    middle_pages_sum = 0
    
    for update in updates:
        if is_update_ordered(update, rules):
            continue  # Skip correctly ordered updates
        
        # Order the incorrectly ordered update
        ordered_update = order_update(update, rules)
        middle_pages_sum += find_middle_page(ordered_update)
    
    return middle_pages_sum

# File paths
rules_file = "rules.txt"
updates_file = "updates.txt"

# Output the result
print(sum_middle_pages(rules_file, updates_file))