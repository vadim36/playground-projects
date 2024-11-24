package response

type Response struct {
	Status string `json:"status"`
	Error  string `json:"error,omitempty"`
}

const (
	StatusOk = "OK"
	StatusError = "Error"
)

func OK() Response {
	return Response{ Status: StatusOk }
}

func Error(message string) Response {
	return Response{ Status: StatusError, Error: message }
}