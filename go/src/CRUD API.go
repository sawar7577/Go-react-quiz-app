package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/rs/cors"

	// "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB // declaring the db globally
var err error

type Person struct {
	ID        string `gorm:"primary_key" json:"id"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	UserName  string `json:"username"`
	Password  string `json:"password"`
}

type Quiz struct {
	ID    uint   `gorm:"primary_key" json:"id"`
	Name  string `json:"name"`
	Genre string `json:"genre"`
	Type  string `json:"type"`
}

type Question struct {
	ID     uint   `gorm:"primary_key" json:"id"`
	Ques   string `json:"ques"`
	Quizid string `json:"quizid"`
}

type Option struct {
	ID         uint   `gorm:"primary_key" json:"id"`
	option     string `json:"option"`
	QuestionId string `json:"questionid"`
	val        bool   `json:"val"`
}

func init() {
	rand.Seed(time.Now().UnixNano())
}

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

func randSeq() string {
	b := make([]rune, 10)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func giveSeq() string {
	var id string
	id = randSeq()
	var check []Person
	var count int
	db.Where("id = ?", id).Find(&check).Count(&count)
	for count != 0 {
		id = randSeq()
		db.Where("id = ?", id).Find(&check).Count(&count)
	}
	return id
}

var store = sessions.NewCookieStore([]byte("secret-password"))

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
	db.AutoMigrate(&Person{})
	db.AutoMigrate(&Quiz{})
	db.AutoMigrate(&Question{})
	db.AutoMigrate(&Option{})
	fmt.Println("server started")
	r := mux.NewRouter()

	r.HandleFunc("/person", CreatePerson).Methods("POST")
	r.HandleFunc("/person/authenticate", PersonAuthenticate).Methods("POST")
	r.HandleFunc("/person/", CheckUsername).Methods("POST")
	r.HandleFunc("/logged",IsLoggedIn).Methods("POST")
	private := r.PathPrefix("/private").Subrouter()
	private.Use(AuthMiddleware)
	private.HandleFunc("/quiz", CreateQuiz)
	handler := cors.Default().Handler(r)
	c := cors.New(cors.Options{
		// AllowedOrigins: []string{"http://foo.com", "http://foo.com:8080"},
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		// Enable Debugging for testing, consider disabling in production
		Debug: true,
	})
	handler = c.Handler(handler)
	log.Fatal(http.ListenAndServe(":8080", handler))
}

func CheckUsername(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var person Person
	decoder.Decode(&person)

	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	var check []Person
	var count int
	db.Where("user_name = ?", person.UserName).Find(&check).Count(&count)
	if count != 0 {
		respondJSON(w, http.StatusOK, false)
	} else {
		respondJSON(w, http.StatusOK, true)
	}
	db.Close()
}

func respondJSON(w http.ResponseWriter, status int, payload interface{}) {
	response, err := json.Marshal(payload)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write([]byte(response))
}

func CreatePerson(w http.ResponseWriter, r *http.Request) {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	decoder := json.NewDecoder(r.Body)
	var person Person
	decoder.Decode(&person)
	person.ID = giveSeq()
	db.Create(&person)
	respondJSON(w, http.StatusOK, person)
	db.Close()
}

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		session, err := store.Get(r, "session-name")
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(session.Values["user"])
		if session.Values["user"] == nil {
			respondJSON(w, 404, "authentication-required")
			return
		}
		next.ServeHTTP(w, r)
	})
}

func IsLoggedIn(w http.ResponseWriter, r *http.Request) {
	session, err := store.Get(r, "session-name")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(session.Values["user"])
	if session.Values["user"] == nil {
		respondJSON(w, 404, false)
	} else {
		respondJSON(w, 200, true)
	}
}

func CreateQuiz(w http.ResponseWriter, r *http.Request) {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	var quiz Quiz
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&quiz)
	db.Create(&quiz)
	respondJSON(w, http.StatusOK, quiz)
	db.Close()
}

func PersonAuthenticate(w http.ResponseWriter, r *http.Request) {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	decoder := json.NewDecoder(r.Body)
	var person Person
	decoder.Decode(&person)
	var check []Person
	var count int
	session, err := store.Get(r, "session-name")
	if err != nil {
		fmt.Println(err)
	}
	db.Where("user_name = ? AND password = ?", person.UserName, person.Password).Find(&check).Count(&count)

	if count == 1 {
		session.Values["user"] = person.UserName
		session.Save(r, w)
		fmt.Println(session.Values["user"])
		respondJSON(w, http.StatusOK, person)

	} else {
		respondJSON(w, 404, person)
	}
	db.Close()
}
