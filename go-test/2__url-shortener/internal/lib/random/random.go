package random

import (
	"math/rand"
	"time"
)

func NewRandomString(size int) string {
	random := rand.New(rand.NewSource(time.Now().UnixNano()))

	chars := []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
		"abcdefghijklmnopqrstuvwxyz" +
		"0123456789")

	buffer := make([]rune, size)
	for index := range buffer {
		buffer[index] = chars[random.Intn(len(chars))]
	}

	return string(buffer)
}