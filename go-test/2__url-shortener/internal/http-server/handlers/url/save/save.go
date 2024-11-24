package save

import (
	"errors"
	"io"
	"log/slog"
	"net/http"
	"url-shortener/internal/lib/api/response"
	"url-shortener/internal/lib/logger/sl"
	"url-shortener/internal/lib/random"
	"url-shortener/internal/storage"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
	"github.com/go-playground/validator/v10"
)

type Request struct {
	URL   string `json:"url" validate:"required,url"`
	Alias string `json:"alias,omitempty"`
}

type Response struct {
	response.Response
	Alias string `json:"alias,omitempty"`
}

//go:generate go run github.com/vektra/mockery/v2@v2.43 --name=URLSaver
type URLSaver interface {
	SaveURL(urlToSave string, alias string) (string, error)
}

const aliasString = 6

func New(log *slog.Logger, urlSaver URLSaver) http.HandlerFunc {
	return func(writer http.ResponseWriter, req *http.Request) {
		const operation = "http-server.handlers.url.save.New"

		log := log.With(
			slog.String("operation", operation),
			slog.String("request_id", middleware.GetReqID(req.Context())),
		)

		var request Request
		err := render.DecodeJSON(req.Body, &request)
		if err != nil {
			if errors.Is(err, io.EOF) {
				log.Error("request body is empty")
				render.JSON(writer, req, response.Error("empty request"))
				return
			}

			log.Error("request body isn't valid")
			render.JSON(writer, req, response.Error("bad request"))
			return
		}

		log.Info("request body decoded", slog.Any("request", request))

		if err := validator.New().Struct(request); err != nil {
			log.Error("invalid request, %s", sl.Err(err))
			render.JSON(writer, req, response.Error("bad request"))			
			return
		}

		alias := request.Alias
		isAliasExist := true
		if alias == "" {
			isAliasExist = false
			alias = random.NewRandomString(aliasString)
		}

	  message, err := urlSaver.SaveURL(request.URL, alias)
		_ = message
		if err != nil {
			if errors.Is(err, storage.ErrURLExists) {
				log.Info("%s: %w", sl.Err(storage.ErrURLExists), slog.String("url", request.URL))
				
				if isAliasExist {
					render.JSON(writer, req, response.Error("please add url to request"))
					return
				}
				
				render.JSON(writer, req, response.Error("url already Exist"))
				return
			}

			log.Error("failed to add url, %s: %w", operation, err)
			render.JSON(writer, req, response.Error("failed to add url"))
			return
		}
		
		log.Info("url added")

		render.JSON(writer, req, Response{
			Response: response.OK(), 
			Alias: alias,
		})
	}
}