FROM ubuntu:latest AS cpp-build
RUN apt-get update && apt-get install -y build-essential
WORKDIR /app
COPY solver.cpp ./
RUN g++ -o solver solver.cpp -static

FROM golang:1.19 AS go-build
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY *.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /go-server

FROM ubuntu:latest
WORKDIR /app
COPY --from=cpp-build /app/solver ./solver
COPY --from=go-build /app/go-server ./go-server

EXPOSE 8080
CMD ["./go-server"]