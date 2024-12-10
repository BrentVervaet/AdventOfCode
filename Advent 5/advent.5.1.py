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

def find_middle_page(update):
    n = len(update)
    return (update)[n // 2]  # Middle page is based on sorted order

def sum_middle_pages(rules_file, updates_file):
    rules, updates = parse_files(rules_file, updates_file)
    middle_pages_sum = 0
    
    for update in updates:
        if is_update_ordered(update, rules):
            middle_pages_sum += find_middle_page(update)
    
    return middle_pages_sum

# File paths
rules_file = "rules.txt"
updates_file = "updates.txt"

# Output the result
print(sum_middle_pages(rules_file, updates_file))