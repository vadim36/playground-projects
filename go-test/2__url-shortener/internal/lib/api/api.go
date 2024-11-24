package api

import (
	"net/http"
)

func GetRedirect(url string) (string, error) {
	const operation = "api.GetRedirect"

	client := &http.Client{
		CheckRedirect: func(request *http.Request, via []*http.Request) error {
			return http.ErrUseLastResponse
		},
	}

	response, err := client.Get(url)
	if err != nil {
		return "", err
	}

	defer func() { _ = response.Body.Close() }()
	return response.Header.Get("Location"), nil
}