#include <stdio.h>

void build_grid(int tend);

int main(void)
{
  int height;
  do {
    printf("Input the number of rows ");
    scanf("%d", &height);
  }
  while (height < 0 || height > 10);
  build_grid(height);
  return 0;
}

void build_grid(int tend) {
    for (int rowIndex = 1; rowIndex <= tend; rowIndex++) {
    for (int columnIndex = tend + 1; columnIndex > 0; columnIndex--) {
      if (columnIndex <= rowIndex) {
        printf("#");
      } else {
        printf(" ");
      }
    }
    
    printf("\n");
  }
}