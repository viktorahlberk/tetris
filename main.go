package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math"
	"net/http"
	"sort"
)

type SortByScore []Score

type Response struct {
	IsTopScore bool
	Place      int
	ScoreBoard []Score
	Procent    float32
}

type Score struct {
	Name  string
	Score float32
	Time  string
}

var scores []Score

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/index.html")
	})
	http.HandleFunc("/scores", scoreHandler)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
	fmt.Println("http://localhost:8081")
	http.ListenAndServe(":8081", nil)
}

func scoreHandler(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("scoreHandler func")
	switch r.Method {
	case "GET":
		scores = sortScores(scores)
		fmt.Println("Allscores: ", scores)
		json.NewEncoder(w).Encode(scores)

	case "POST":
		response := Response{}
		scores = sortScores(scores)
		requestBody, _ := ioutil.ReadAll(r.Body)
		score := Score{}
		score.Score = 0
		json.Unmarshal(requestBody, &score)

		if len(scores) > 0 {
			if isTopScore(score) {
				response.IsTopScore = true
				response.Place = 1
				//fmt.Println(response.IsTopScore)
			} else {
				response.Place = calculatePlace(score)
				response.Procent = float32(math.Ceil(float64(calculateProcent(score))))
			}
		}

		scores = append(scores, score)
		//fmt.Println(scores)
		scores = sortScores(scores)
		response.ScoreBoard = scores
		//fmt.Println(response)
		//w.Header().Set("","")
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		r, _ := json.Marshal(response)
		w.Write(r)
		//json.NewEncoder(w).Encode(response)
	}
}

func sortScores(list []Score) []Score {

	sort.Sort(SortByScore(list))
	return list

}

func (a SortByScore) Len() int           { return len(a) }
func (a SortByScore) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a SortByScore) Less(i, j int) bool { return a[i].Score > a[j].Score }

func isTopScore(s Score) bool {
	return s.Score > scores[0].Score
}

func calculatePlace(s Score) int {
	for i, sc := range scores {
		if s.Score > sc.Score || s.Score == sc.Score {
			return i + 1
		}
	}
	return 0
}
func calculateProcent(s Score) float32 {
	/*allscores := 0
	allscores = s.Score
	for _, v := range scores {
		allscores += v.Score
	}
	procent := (allscores / s.Score) * len(scores)
	return 100 - procent*/
	topScore := scores[0].Score
	p := (s.Score / topScore) * 100
	return p
}
