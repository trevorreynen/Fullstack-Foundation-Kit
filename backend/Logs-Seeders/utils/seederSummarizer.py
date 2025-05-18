# Run by:  python seederSummarizer.py
'''
    This simple python script takes in two seeder logs and creates a csv file which can be used
    to find the seeded users who have the most posts, if they comment, and if they also replied to comments:

    Example:
        User,# Posts,Top-level Commenter,Reply Commenter
        fabiola.lynch,40,,
        maybelle_veum49,40,,
        aracely.schulist,39,,
        elenora_douglas,39,,
        jairo_franecki,39,,Yes
        julianne_hand90,39,,
        neva11,39,Yes,Yes                <-- This is a decent seeded user to test with
        ramiro_kilback-moore,39,Yes,
        delmer_langworth,38,,
        gia_steuber,38,,
'''

# Imports
import csv
import re


# Config Variables
SEED2_POSTS_PATH = '../seed2Posts_2025-05-15T21-31-37.908Z.txt'
SEED3_COMMENTS_PATH = '../seed3Comments_2025-05-15T21-31-59.139Z.txt'
OUTPUT_CSV_PATH = 'seeder_summarized.csv'


def clean(username: str) -> str:
    return username.replace('...', '').strip().lower()


# Parse users from seed2
def parse_users(seed2_lines):
    pattern = r"Creating \d+ posts for user ([\w\.\-_]+)"
    users = [match.group(1) for line in seed2_lines if (match := re.search(pattern, line))]

    return sorted(set(clean(u) for u in users))


# Parse post counts from seed2
def parse_post_counts(seed2_lines):
    pattern = r"Creating (\d+) posts for user ([\w\.\-_]+)"
    post_counts = {}

    for line in seed2_lines:
        match = re.search(pattern, line)

        if match:
            count = int(match.group(1))
            user = clean(match.group(2))
            post_counts[user] = count

    return post_counts


# Parse top-level and reply commenters
def parse_comment_roles(seed3_lines):
    top_level = set()
    reply_level = set()
    top_section = True

    for line in seed3_lines:
        if '[success] Top-level comments complete:' in line:
            top_section = False
            continue

        match = re.search(r"User ([\w\.\-_]+) .*comments\.\.\.", line)

        if match:
            username = clean(match.group(1))

            if top_section:
                top_level.add(username)
            else:
                reply_level.add(username)

    return top_level, reply_level


def main():
    # Load files
    with open(SEED2_POSTS_PATH, 'r', encoding='utf-8') as f:
        seed2_lines = f.readlines()

    with open(SEED3_COMMENTS_PATH, 'r', encoding='utf-8') as f:
        seed3_lines = f.readlines()

    user_list = parse_users(seed2_lines)
    post_map = parse_post_counts(seed2_lines)
    top_level_set, reply_set = parse_comment_roles(seed3_lines)
    rows = []

    for username in user_list:
        posts = post_map.get(username, 0)
        row = [
            username,
            posts,
            'Yes' if username in top_level_set else '',
            'Yes' if username in reply_set else ''
        ]
        rows.append(row)

    # Sort by post count descending.
    rows.sort(key=lambda r: int(r[1]) if r[1] != '' else 0, reverse=True)

    with open(OUTPUT_CSV_PATH, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['User', '# Posts', 'Top-level Commenter', 'Reply Commenter'])
        writer.writerows(rows)


    print(f'CSV created: {OUTPUT_CSV_PATH}')


if __name__ == '__main__':
    main()

