#include <stdio.h>

int calc_coins(int dividendSum, const int* coinsValues);
const int coinsValues[] = {25, 10, 5, 1};

int main(void)
{
  int cash;
  printf("Enter the amount of cash: ");
  scanf("%d", &cash);
  int coins = calc_coins(cash, coinsValues);
  printf("Coins: %d\n", coins);
  return 0;
}

int calc_coins(int dividendSum, const int* coinsValues) {
  int coinsNumber = 0;
  int dividend = dividendSum;

  for (int i = 0; i < sizeof(coinsValues); i++) {
    int div = dividend / coinsValues[i];
    int remainder = dividend % coinsValues[i];
    coinsNumber += div;

    if (remainder == 0) {
      i = sizeof(coinsValues);
    }
    
    dividend = remainder;
  }

  return coinsNumber;
}