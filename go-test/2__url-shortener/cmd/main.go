package main

import (
	"log"
	"log/slog"
	"net/http"
	"os"
	"url-shortener/internal/config"
	"url-shortener/internal/http-server/handlers/url/redirect"
	"url-shortener/internal/http-server/handlers/url/save"
	"url-shortener/internal/http-server/handlers/url/delete"
	"url-shortener/internal/lib/logger/sl"
	"url-shortener/internal/storage"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error with loading godotenv: %s", err)
	}

	config := config.MustLoad()
	log := setupLogger()

	log.Info("starting url-shortener", slog.String("env", config.Env))
	log.Debug("debug messages are enable")

	storage, err := storage.New()
	if err != nil {
		slog.Error("failed to init storage, %s", sl.Err(err)	)
		os.Exit(1)
	}

	_ = storage

	router := chi.NewRouter()
	router.Use(middleware.RequestID)
	router.Use(middleware.Logger)

	router.Post("/url", save.New(log, storage))
	router.Get("/url/{alias}", redirect.New(log, storage))
	router.Delete("/url/{alias}", delete.New(log, storage))

	log.Info("starting server", slog.String("address", config.Address))

	server := &http.Server{
		Addr: config.Address,
		Handler: router,
		ReadTimeout: config.Timeout,
		WriteTimeout: config.Timeout,
		IdleTimeout: config.IdleTimeout,
	}

	if err := server.ListenAndServe(); err != nil {
		log.Error("failed to start server")
	}

	log.Error("server stopped")
}

func setupLogger() *slog.Logger {
	log := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}))
	return log	
}