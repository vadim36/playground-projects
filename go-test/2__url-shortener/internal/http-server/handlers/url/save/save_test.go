package save_test

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
	"url-shortener/internal/http-server/handlers/url/save"
	"url-shortener/internal/http-server/handlers/url/save/mocks"
	"url-shortener/internal/lib/logger/discardlogger"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

func TestSaveHandler(test *testing.T) {
	cases := []struct {
		name  				string
		alias 				string
		url   				string
		responseError string
		mockError     error
	}{
		{
			name: "Success",
			alias: "test_alias",
			url: "https://google.com",
		},
		{
			name: "Empty alias",
			alias: "",
			url: "https://google.com",
		},
		{
			name: "Empty URL",
			alias: "test_alias",
			url: "",
			responseError: "bad request",
		},
		{
			name: "Invalid URL",
			alias: "test_alias",
			url: "invalid url",
			responseError: "bad request",
		},
		{
			name: "SaveURL Error",
			alias: "test_alias",
			url: "https://google.com",
			responseError: "failed to add url",
			mockError: errors.New("unexpected error"),
		},
	}

	for _, testCase := range cases {
		testCase := testCase

		test.Run(testCase.name, func(test *testing.T) {
			test.Parallel()
			urlSaveMock := mocks.NewURLSaver(test)

			if testCase.responseError == "" || testCase.mockError != nil {
				urlSaveMock.On("SaveURL", testCase.url, mock.AnythingOfType("string")).
					Return(string("url created"), testCase.mockError).
					Once()
			}

			handler := save.New(discardlogger.NewDiscardLogger(), urlSaveMock)
			input := fmt.Sprintf(`{"url": "%s", "alias": "%s"}`, testCase.url, testCase.alias)
			request, err := http.NewRequest(http.MethodPost, "/save", bytes.NewReader([]byte(input)))
			require.NoError(test, err)
			
			requestRecoder := httptest.NewRecorder()
			handler.ServeHTTP(requestRecoder, request)
			require.Equal(test, requestRecoder.Code, http.StatusOK)
			body := requestRecoder.Body.String()

			var response save.Response
			require.NoError(test, json.Unmarshal([]byte(body), &response))
			require.Equal(test, testCase.responseError, response.Error)
		})
	}
}