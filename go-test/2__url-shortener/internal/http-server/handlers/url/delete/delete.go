package delete

import (
	"log/slog"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"

	"url-shortener/internal/lib/api/response"
)

type UrlDeletter interface {
	DeleteURL(alias string) (string, error)
}

type Response struct {
	response.Response
	Message string
}


func New(log *slog.Logger, urlDeletter UrlDeletter) http.HandlerFunc {
	return func(writer http.ResponseWriter, req *http.Request) {
		const operation = "http-server.handlers.url.delete.New"

		log := log.With(
			slog.String("operation", operation),
			slog.String("request_id", middleware.GetReqID(req.Context())),
		)

		alias := chi.URLParam(req, "alias")
		if alias == "" {
			log.Info("empty alias")
			render.JSON(writer, req, response.Error("bad request"))
			return
		}

		message, err := urlDeletter.DeleteURL(alias)
		if err != nil {
			log.Error("failed to delete url")
			render.JSON(writer, req, response.Error("internal error"))
			return
		}

		render.JSON(writer, req, Response{
			Response: response.OK(),
			Message: message,
		})
	}
}