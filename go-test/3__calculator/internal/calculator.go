package calculator

import (
	"fmt"
	"math"
	"os"
)

func CalcCore(action string, numbers []int) (float64, error) {
	switch action {
		case "add":
			return float64(numbers[0] + numbers[1]), nil;
		case "sub":
			return float64(numbers[0] - numbers[1]), nil;
		case "mul":
			return float64(numbers[0] * numbers[1]), nil;
		case "div":
			return float64(numbers[0] / numbers[1]), nil;
		case "sqrt":
			return float64(math.Sqrt(float64(numbers[0]))), nil;
		default:
			return 0, fmt.Errorf("UNEXPECTED ACTION");
	}
}

type CalcCoreType = func(action string, numbers []int) (float64, error)

func CalcAction(action string) (CalcCoreType, int, error) {
	switch action {
		case "add":
			return CalcCore, 2, nil
		case "sub":
			return CalcCore, 2, nil
		case "mul":
			return CalcCore, 2, nil
		case "div":
			return CalcCore, 2, nil
		case "sqrt":
			return CalcCore, 1, nil
		default:
			return nil, 0, fmt.Errorf("UNEXPECTED ACTION");
	}
}

func CalcCmd() error {
	var action string;
	var numbers = make([]int, 2);

	fmt.Println("Calculator started; Input please your command");
	fmt.Fscan(os.Stdin, &action);

	calc, requiredNumbers, err := CalcAction(action);

	if err != nil {
		panic(err)
	}

	var enterNumberLooped = 0;
	for enterNumberLooped < requiredNumbers {
		fmt.Println("Enter number...");
		fmt.Fscan(os.Stdin, &numbers[enterNumberLooped]);
		enterNumberLooped++;
	}

	result, err := calc(action, numbers)

	if err != nil {
		panic(err);
	}

	fmt.Println("RESULT:", result);

	return nil
}