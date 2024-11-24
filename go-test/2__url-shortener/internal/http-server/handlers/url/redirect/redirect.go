package redirect

import (
	"log/slog"
	"net/http"
	"url-shortener/internal/lib/api/response"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
)

//go:generate go run github.com/vektra/mockery/v2@v2.43 --name=UrlGetter
type UrlGetter interface {
	GetURL(alias string) (string, error)
}

func New(log *slog.Logger, urlGetter UrlGetter) http.HandlerFunc {
	return func(writer http.ResponseWriter, req *http.Request) {
		const operation = "http-server.handlers.url.redirect.New"

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

		url, err := urlGetter.GetURL(alias)
		if err != nil {
			log.Error("failed to get url, %s: %w", operation, err)
			render.JSON(writer, req, response.Error("failed to get url"))
			return
		}

		log.Info("redirecting to %s", slog.String("url", url))
		http.Redirect(writer, req, url, http.StatusFound)
	}
}