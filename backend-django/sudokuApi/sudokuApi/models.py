from django.db import models
from django.conf import settings

class Sudoku(models.Model):

    puzzle = models.CharField(max_length=82)
    difficulty = models.CharField(max_length=10)

    def __str__(self) -> str:
        return self.puzzle
    
    
    