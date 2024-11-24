package main

import (
	"fmt"
	"net/http"
	"text/template"
)

func main() {
	staticFiles := http.FileServer(http.Dir("./assets"))
	http.HandleFunc("/", pageHandler)
	http.Handle("/assets/", http.StripPrefix("/assets/", staticFiles))

	fmt.Println("Listening on port 8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
	fmt.Println("Server stopped")
}

var pageTemplate = template.Must(template.ParseFiles("./views/index.html"))

func pageHandler(w http.ResponseWriter, r *http.Request) {
	pageTemplate.Execute(w, nil)
}