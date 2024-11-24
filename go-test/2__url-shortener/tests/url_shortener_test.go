package url_shortener_test

import (
	"net/http"
	"net/url"
	"testing"
	"url-shortener/internal/http-server/handlers/url/save"
	"url-shortener/internal/lib/api"

	"github.com/brianvoe/gofakeit"
	"github.com/gavv/httpexpect/v2"
	"github.com/stretchr/testify/require"
)

const host = "localhost:8000"

func TestUrlShortener_HappyPath(test *testing.T) {
	address := url.URL{
		Scheme: "http",
		Host: host,
	}
	client := httpexpect.Default(test, address.String())
	client.POST("/url").WithJSON(save.Request{URL: gofakeit.URL()}).
		Expect().Status(200).JSON().Object().ContainsKey("alias")
}

func TestUrlShortener_SaveRedirect(test *testing.T) {
	testCases := []struct{
		name  string
		url   string
		alias string
		err   string
	} {
		{
			name: "Valid Case",
			url: gofakeit.URL(),
			alias: gofakeit.Word() + gofakeit.Word(),
		},
		{
			name: "Invaliad URL",
			url: "invalid_url",
			alias: gofakeit.Word(),
			err: "bad request",
		},
		{
			name: "Empty Alias",
			url: gofakeit.URL(),
			alias: "",
		},
	}

	for _, testCase := range testCases {
		testCase := testCase
		
		test.Run(testCase.name, func (test *testing.T) {
			address := url.URL{
				Scheme: "http",
				Host: host,
			}

			client := httpexpect.Default(test, address.String())

			response := client.POST("/url").WithJSON(save.Request{
				URL: testCase.url,
				Alias: testCase.alias,
			}).Expect().Status(http.StatusOK).JSON().Object()

			if testCase.err != "" {
				response.NotContainsKey("alias")
				response.Value("error").String().IsEqual(testCase.err)
				return
			}

			alias := testCase.alias

			if testCase.alias != "" {
				response.Value("alias").String().IsEqual(testCase.alias)
			} else {
				response.Value("alias").String().NotEmpty()
				alias = response.Value("alias").String().Raw()
			}

			testRedirect(test, alias, testCase.url)
		})
	}
}

func testRedirect(test *testing.T, alias string, urlToRedirect string) {
	address := url.URL{
		Scheme: "http",
		Host: host,
		Path: "/url/" + alias,
	}

	redirectedUrl, err := api.GetRedirect(address.String())
	require.NoError(test, err)
	require.Equal(test, urlToRedirect, redirectedUrl)
}