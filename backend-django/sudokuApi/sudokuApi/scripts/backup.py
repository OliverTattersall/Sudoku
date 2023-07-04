#Sudoku Generator Algorithm - www.101computing.net/sudoku-generator-algorithm/
from random import randint, shuffle
from time import sleep
#A backtracking/recursive function to check all possible combinations of numbers until a solution is found
def solveGrid(grid):
    # global counter
    #Find next empty cell
    for i in range(0,81):
        row=i//9
        col=i%9
        if grid[row][col]==0:
            for value in range (1,10):
                #Check that this value has not already be used on this row
                if not(value in grid[row]):
                #Check that this value has not already be used on this column
                    if not value in (grid[0][col],grid[1][col],grid[2][col],grid[3][col],grid[4][col],grid[5][col],grid[6][col],grid[7][col],grid[8][col]):
                        #Identify which of the 9 squares we are working on
                        square=[grid[i][(col//3)*3 : (col//3 + 1) * 3] for i in range(row//3*3, (row//3+1)*3)]
                        if not value in (square[0] + square[1] + square[2]):
                            grid[row][col]=value
                            if checkGrid(grid):
                                # counter+=1
                                break
                            else:
                                if solveGrid(grid):
                                    return True
            break
    grid[row][col]=0

#A function to check if the grid is full
def checkGrid(grid):
    for row in range(0,9):
        for col in range(0,9):
            if grid[row][col]==0:
                return False

    #We have a complete grid!  
    return True 
#A backtracking/recursive function to check all possible combinations of numbers until a solution is found
def fillGrid(grid):
    numberList=[1,2,3,4,5,6,7,8,9]
    # global counter
    #Find next empty cell
    for i in range(0,81):
        row=i//9
        col=i%9
        if grid[row][col]==0:
            shuffle(numberList)      
            for value in numberList:
                #Check that this value has not already be used on this row
                if not(value in grid[row]):
                    #Check that this value has not already be used on this column
                    if not value in (grid[0][col],grid[1][col],grid[2][col],grid[3][col],grid[4][col],grid[5][col],grid[6][col],grid[7][col],grid[8][col]):
                        #Identify which of the 9 squares we are working on
                        square=[grid[i][(col//3)*3 : (col//3 + 1) * 3] for i in range(row//3*3, (row//3+1)*3, 1)]

                        #Check that this value has not already be used on this 3x3 square
                        if not value in (square[0] + square[1] + square[2]):
                            grid[row][col]=value
                            if checkGrid(grid):
                                return True
                            else:
                                if fillGrid(grid):
                                    return True
            break
    grid[row][col]=0             
    
def make_sudoku(diff):
    diff_map = {'beginner': (35, 81), 'easy': (30, 34), 'medium': (25, 29), 'hard': (20, 24), 'veryhard': (0, 19)}
    low, high = diff_map[diff]
    clues = 81 - randint(low, high)
    #initialise empty 9 by 9 grid
    grid = [[0 for _ in range(9)] for _ in range(9)]

    
    #shuffle(numberList)

    
    #Generate a Fully Solved Grid
    fillGrid(grid)

    # attempts = 5 
    # counter=1
    rems = clues
    while rems>0:
        #Select a random cell that is not already empty
        row = randint(0,8)
        col = randint(0,8)
        while grid[row][col]==0:
            row = randint(0,8)
            col = randint(0,8)
        #Remember its cell value in case we need to put it back  
        backup = grid[row][col]
        grid[row][col]=0
        
        #Take a full copy of the grid
        copyGrid = []
        for r in range(0,9):
            copyGrid.append([])
            for c in range(0,9):
                copyGrid[r].append(grid[r][c])
        
        #Count the number of solutions that this grid has (using a backtracking approach implemented in the solveGrid() function)
        # counter=0      
        # solveGrid(copyGrid)
        rems-=1   
        # print(rems)
        #If the number of solution is different from 1 then we need to cancel the change by putting the value we took away back in the grid
        # if counter!=1:
        #     grid[row][col]=backup
        #     #We could stop here, but we can also have another attempt with a different cell just to try to remove more numbers
        #     attempts -= 1


    return grid



# l = make_sudoku(81 - 20)
# print(l)
# count = 0
# for i in range(9):
#     for j in range(9):
#         if l[i][j]==0:
#             count+=1

# print(count)