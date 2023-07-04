from django.http import JsonResponse
import random

def create_sudoku(diff):
    diff_map = {'beginner': (35, 81), 'easy': (30, 34), 'medium': (25, 29), 'hard': (20, 24), 'veryhard': (0, 19)}
    low, high = diff_map[diff]
    clues = random.randint(low, high)
    grid = [[set([i for i in range(1,10)]) for _ in range(9)] for _ in range(9)]
    filled = [[False for _ in range(9)] for _ in range(9)]
    while clues > 0:
        x = random.randint(0,8)
        y = random.randint(0,8)
        
        clues-=1
    print(grid, clues)
    return '000000000000000000000000000000000000000000000000000000000000000000000000000000000'

def puzzle(request):
    queries = request.GET
    difficulties = ['beginner', 'easy', 'medium', 'hard', 'veryhard']
    diff = ''
    if 'difficulty' in queries:
        if queries['difficulty'] in difficulties:
            diff = queries['difficulty']

        else:
            diff = random.choice(difficulties)
    else:
        diff = random.choice(difficulties)

    
    


    return JsonResponse({diff:create_sudoku(diff)}, safe=False)

