package storage

import (
	"database/sql"
	"errors"
	"fmt"
	"os"

	"github.com/lib/pq"
)

type Storage struct {
	db *sql.DB
}

var (
	ErrURLExists = errors.New("url has already exist")
)

func New() (*Storage, error) {
	const operation = "storage.New"

	connectionString := os.Getenv("DATABASE_URL")

	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", operation, err)
	}

	return &Storage{db: db}, nil
}

func (storage *Storage) SaveURL(urlToSave string, alias string) (string, error) {
	const operation = "storage.SaveURL"

	result, err := storage.db.Exec("INSERT INTO url(url, alias) VALUES($1, $2)", urlToSave, alias)
	if err != nil {
		if err.(*pq.Error).Code == "23505" {
			return "", fmt.Errorf("%s: %w", operation, ErrURLExists)
		}
		return "", fmt.Errorf("%s, %w", operation, err)	
	}

	_ = result

	return "url created", nil
}

type Url struct {
	url_id string
	alias  string
	url    string
}

func (storage *Storage) GetURL(alias string) (string, error) {
	const operation = "storage.GetURL"

	rows, err := storage.db.Query("SELECT * from url where alias = $1", alias)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return "", errors.New("such a url wasn't founded")
		}

		return "", fmt.Errorf("%s, %w", operation, err)	
	}

	defer rows.Close()

	rows.Next()
	url := Url{}
	err = rows.Scan(&url.url_id, &url.alias, &url.url)
	if err != nil {
		return "", fmt.Errorf("%s, %w", operation, err)	
	}

	return url.url, nil
}

func (storage *Storage) DeleteURL(alias string) (string, error) {
	const operation = "storage.DeleteURL"

	result, err := storage.db.Exec("DELETE FROM Url where alias = $1", alias)
	if err != nil {
		return "", fmt.Errorf("%s, %w", operation, err)	
	}

	_ = result
	return "url deleted", nil
}