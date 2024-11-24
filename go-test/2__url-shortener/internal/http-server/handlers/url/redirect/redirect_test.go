package redirect_test

import (
	"errors"
	"net/http/httptest"
	"testing"
	"url-shortener/internal/http-server/handlers/url/redirect"
	"url-shortener/internal/http-server/handlers/url/redirect/mocks"
	"url-shortener/internal/lib/api"
	"url-shortener/internal/lib/logger/discardlogger"

	"github.com/go-chi/chi"
	"github.com/stretchr/testify/require"
)

func TestRedirectHandler(test *testing.T) {
	cases := []struct{
		name  				string
		alias 				string
		url           string
		responseError string
		mockError     error
	}{
		{
			name: "Success",
			alias: "kKr1zn",
			url: "https://google.com",
		},
		{
			name: "Empty Alias Request",
			alias: "bad alias",
			responseError: "bad request",
			mockError: errors.New("bad request"),
		},
		{
			name: "Non-existing Alias",
			alias: "donotexist",
			responseError: "bad request",
			mockError: errors.New("bad request"),
		},
	}

	for _, testCase := range cases {
		testCase := testCase

		test.Run(testCase.name, func(test *testing.T) {
			test.Parallel()
			urlGetterMock := mocks.NewUrlGetter(test)

			if testCase.responseError == "" || testCase.mockError != nil {
				urlGetterMock.On("GetURL", testCase.alias).
					Return(testCase.url, testCase.mockError).Once()
			}

			router := chi.NewRouter()
			router.Get("/url/{alias}", redirect.New(discardlogger.NewDiscardLogger(), urlGetterMock))
			testServer := httptest.NewServer(router)
			defer testServer.Close()

			redirectedUrl, err := api.GetRedirect(testServer.URL + "/url/" + testCase.alias)
			require.NoError(test, err)
			require.Equal(test, testCase.url, redirectedUrl)
		})
	}
}