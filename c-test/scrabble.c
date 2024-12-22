#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#define MAX_LIMIT 256

int compare_strings(char a[], char b[]);

int main(void)
{
  char firstPlayerString[MAX_LIMIT];
  char secondPlayerString[MAX_LIMIT];

  printf("Player 1 ");
  scanf("%s", firstPlayerString);
  printf("Player 2 ");
  scanf("%s", secondPlayerString);

  int result = compare_strings(firstPlayerString, secondPlayerString);
  switch (result) {
    case 1: 
      printf("Player 1 has won");
      break;
    case 2: 
      printf("Player 2 has won");
      break;
    default: 
      printf("Tie!");
  }
  
  return 0;
}

int compare_strings(char a[], char b[]) {
  if (strlen(a) > strlen(b)) {
    return 1;
  }

  if (strlen(a) < strlen(b)) {
    return 2;
  }

  return 0;
}