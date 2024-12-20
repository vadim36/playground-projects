#include <stdio.h>

int main(void) {
  char name[] = "";
  printf("Print your name ");
  scanf("%s", &name);
  printf("Hello %s\n", name);
  
  return 0;
}