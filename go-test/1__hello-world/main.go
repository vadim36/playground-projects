package main

import (
	"flag"
	"fmt"
	"os"
)

func main() {
	greetingsByParam("Vadim");
	greetingsByFlag();
	greetingsByInput();
}

func greetingsByParam(name string) {
	fmt.Println("Hello world", name);
}

func greetingsByFlag() error {
	name := flag.String("name", "", "a name");
	flag.Parse();

	if *name == "" {
		panic("THE NAME FLAG MUST BE SPECIFIED")
	}

	fmt.Println("Hello world", *name);
	return nil;
}

func greetingsByInput() {
	var name string
	fmt.Printf("Print the name:");
	fmt.Fscan(os.Stdin, &name);
	fmt.Printf("Hello world, %s!", name);
}