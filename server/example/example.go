package main

import "log"

import "io"
import "net/http"
import "os/exec"



func main() {
	log.Print("SERVER LISTENING1")
	gameHandler := func(w http.ResponseWriter, req *http.Request){
		// if err := exec.Command("make", "clean").Run(); err != nil{
		// 	log.Fatalf("make clean failed: %v", err)
		// }
		// if err := exec.Command("make", "solver").Run(); err != nil{
		// 	log.Fatalf("make run failed: %v", err)
		// }
		cmd := exec.Command("./solver")
		stdout, stderr := cmd.StdoutPipe()
		if stderr != nil {
			log.Fatal(stderr)
		}

		if err := cmd.Start(); err != nil {
			log.Fatal(err)
		}

		output, err := io.ReadAll(stdout)
		log.Printf("%v", output);
		if err != nil {
			log.Fatal(err)
		}
		err = cmd.Wait()
		if err != nil {
			log.Fatalf("Command finished with error:")
		}

		w.Header().Set("Access-Control-Allow-Origin", "http://0.0.0.0:8080")
		if(output != nil){
			io.WriteString(w, string(output))
		}
		
	}

	http.HandleFunc("/game", gameHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
	log.Print("SERVER LISTENING")
}

