from django.http import JsonResponse
import random
# from sudokuApi.scripts.sudokuscripts import create_sudoku
from sudokuApi.scripts.sudokuscripts import make_sudoku

# def clear_num(grid, num, x, y):
#     grid[y][x] = set()
#     boxx = x//3
#     boxy = y//3
#     for i in range(9):
#         if num in grid[y][i]:
#             grid[y][i].remove(num)
#         if num in grid[i][x]:
#             grid[i][x].remove(num)

#     for i in range(3):
#         for j in range(3):
#             if num in grid[boxy + i][boxx + j]:
#                 grid[boxy + i][boxx + j].remove(num)

#     print(grid)

#     return


# def create_sudoku(diff):
#     diff_map = {'beginner': (35, 81), 'easy': (30, 34), 'medium': (25, 29), 'hard': (20, 24), 'veryhard': (0, 19)}
#     low, high = diff_map[diff]
#     clues = random.randint(low, high)
#     grid = [[0 for _ in range(9)] for _ in range(9)]
#     op_grid = [[set([i for i in range(1,10)]) for _ in range(9)] for _ in range(9)]
#     filled = [[False for _ in range(9)] for _ in range(9)]
#     clues = 1
#     while clues > 0:
#         x = random.randint(0,8)
#         y = random.randint(0,8)
#         if not filled[y][x]:
#             filled[y][x] = True
#             grid[y][x] = random.choice(list(op_grid[y][x]))
#             clear_num(op_grid, grid[y][x], x, y)

#             clues-=1
#     # print(op_grid)
#     return '000000000000000000000000000000000000000000000000000000000000000000000000000000000'

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
        print(diff)
        diff = random.choice(difficulties)
        print(diff)

    
    puzzle = make_sudoku(diff)
    puzzle = ','.join(list(map(lambda x : ''.join(list(map(str, x))), puzzle)))
    # puzzle = 
    # print(puzzle)

    return JsonResponse({diff: puzzle}, safe=False)

