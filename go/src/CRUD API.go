package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"

	// "log"
	"math/rand"
	// "net/http"

	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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

type Leaderboard struct {
	ID     uint `json:"id,string"`
	Quizid uint `json:"quizid,string"`
	Score  uint `json:"score,string"`
}

type Quiz struct {
	ID    uint   `gorm:"primary_key" json:"id"`
	Name  string `json:"name"`
	Genre string `json:"genre"`
	Type  string `json:"type"`
}

type Question struct {
	ID      uint   `gorm:"primary_key" json:"id"`
	Ques    string `json:"ques"`
	Quizid  uint   `json:"quizid,string"`
	Optiona string `json:"optiona"`
	Optionb string `json:"optionb"`
	Optionc string `json:"optionc"`
	Optiond string `json:"optiond"`
	Vala    bool   `json:"vala"`
	Valb    bool   `json:"valb"`
	Valc    bool   `json:"valc"`
	Vald    bool   `json:"vald"`
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
	db.AutoMigrate(&Leaderboard{})
	fmt.Println("server started")

	r := gin.Default()
	r.POST("/person", CreatePerson)
	r.POST("/person/authenticate", PersonAuthenticate)
	r.POST("/person/", CheckUsername)
	r.POST("/logged", IsLoggedIn)

	private := r.Group("/private")
	private.Use(AuthMiddleware())
	private.POST("/people/", GetPeople) // Creating routes for each functionality
	private.POST("/delquiz/", DeleteQuiz)
	private.POST("/quiz", CreateQuiz)
	private.POST("/ques", CreateQues)
	private.GET("/quizzes/", ViewQuizzes)
	private.POST("/delques", DeleteQues)
	private.POST("/viewques/", ViewQues)
	private.POST("/delperson/", DeletePerson)
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:8080"}
	r.Use((cors.New(config)))
	r.Run(":8080") // Run on port 8080

}

func Logout(c *gin.Context) {
	session, err := store.Get(c.Request, "session-name")
	fmt.Println(err)
	session.Options.MaxAge = -1
	session.Save(c.Request, c.Writer)
	c.JSON(200, "ok")
}

func CheckUsername(c *gin.Context) {

	var person Person
	c.BindJSON(&person)
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	var check []Person
	var count int
	db.Where("user_name = ?", person.UserName).Find(&check).Count(&count)
	if count != 0 {
		c.Header("Content-Type", "application/json")
		c.Header("access-control-allow-origin", "http://localhost:3000")
		c.Header("access-control-allow-credentials", "true")

		c.JSON(200, false)
	} else {
		c.Header("Content-Type", "application/json")
		c.Header("access-control-allow-origin", "http://localhost:3000")
		c.Header("access-control-allow-credentials", "true")

		c.JSON(200, true)
	}
	db.Close()
}

func DeletePerson(c *gin.Context) {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	var person Person

	body, err := ioutil.ReadAll(c.Request.Body)
	fmt.Println(err)
	json.Unmarshal(body, &person)
	fmt.Println("id===", person.ID)

	var person2 Person
	db.Where("id = ?", person.ID).Delete(&person2)

	c.Header("Content-Type", "application/json")
	c.Header("access-control-allow-origin", "http://localhost:3000")
	c.Header("access-control-allow-credentials", "true")

	c.JSON(200, true)

	db.Close()
}

func DeleteQuiz(c *gin.Context) {
	fmt.Println("delete quiz called")
	db, err = gorm.Open("sqlite3", "./gorm.db")
	var quiz Quiz

	body, err := ioutil.ReadAll(c.Request.Body)
	fmt.Println(err)
	json.Unmarshal(body, &quiz)
	fmt.Println("id===", quiz.ID)

	var quiz2 Quiz
	db.Where("id = ?", quiz.ID).Delete(&quiz2)

	c.Header("Content-Type", "application/json")
	c.Header("access-control-allow-origin", "http://localhost:3000")
	c.Header("access-control-allow-credentials", "true")

	c.JSON(200, true)

	db.Close()
}

func DeleteQues(c *gin.Context) {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	var ques Question
	body, err := ioutil.ReadAll(c.Request.Body)
	fmt.Println(err)
	json.Unmarshal(body, &ques)
	var ques2 Question
	db.Where("id == ?", ques.ID).Delete(&ques2)
	c.Header("Content-Type", "application/json")
	c.Header("access-control-allow-origin", "http://localhost:3000")
	c.Header("access-control-allow-credentials", "true")

	c.JSON(200, true)

	db.Close()
}

func ViewQues(c *gin.Context) {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	body, err := ioutil.ReadAll(c.Request.Body)
	fmt.Println(err)
	var dat map[string]interface{}
	json.Unmarshal(body, &dat)
	// fmt.Println("id=+=", dat["id"])
	var ques2 []Question
	db.Where("quizid == ?", dat["id"]).Find(&ques2)
	c.Header("Content-Type", "application/json")
	c.Header("access-control-allow-origin", "http://localhost:3000")
	c.Header("access-control-allow-credentials", "true")
	c.JSON(200, ques2)
	db.Close()
}

func CreateQues(c *gin.Context) {
	fmt.Println("create ques called")
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	var ques Question
	body, err := ioutil.ReadAll(c.Request.Body)
	fmt.Println(err)
	json.Unmarshal(body, &ques)
	db.Create(&ques)
	c.Header("Content-Type", "application/json")
	c.Header("access-control-allow-origin", "http://localhost:3000")
	c.Header("access-control-allow-credentials", "true")

	c.JSON(200, ques)
	db.Close()
}

func CreateQuiz(c *gin.Context) {
	fmt.Println("create quiz called")
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	var quiz Quiz
	c.BindJSON(&quiz)
	db.Create(&quiz)
	c.Header("Content-Type", "application/json")
	c.Header("access-control-allow-origin", c.Request.Header.Get("Origin"))
	c.Header("access-control-allow-credentials", "true")

	c.JSON(200, quiz)
	db.Close()
}

func CreatePerson(c *gin.Context) {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	var person Person
	c.BindJSON(&person)
	person.ID = giveSeq()
	db.Create(&person)

	c.Header("Content-Type", "application/json")
	c.Header("access-control-allow-origin", "http://localhost:3000")
	c.Header("access-control-allow-credentials", "true")

	c.JSON(200, person)
	db.Close()
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		session, err := store.Get(c.Request, "session-name")
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println("authmiddlewar")
		fmt.Println(session.Values["user"])
		if session.Values["user"] == nil {
			c.AbortWithStatus(404)
			return
		}
		c.Next()
	}
}

func IsLoggedIn(c *gin.Context) {
	fmt.Println("log check")
	session, err := store.Get(c.Request, "session-name")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(session.Values["user"])
	if session.Values["user"] == nil {
		c.Header("access-control-allow-credentials", "true")
		c.Header("access-control-allow-origin", "http://localhost:3000")
		c.Header("Content-Type", "application/json")

		c.JSON(404, false)
	} else {
		c.Header("access-control-allow-credentials", "true")
		c.Header("access-control-allow-origin", "http://localhost:3000")
		c.Header("Content-Type", "application/json")

		c.JSON(200, true)
	}
}

func ViewQuizzes(c *gin.Context) {
	fmt.Println("bkl")
	db, err = gorm.Open("sqlite3", "./gorm.db")
	var quizzes []Quiz
	if err := db.Find(&quizzes).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(quizzes)
		c.Header("access-control-allow-credentials", "true")
		c.Header("access-control-allow-origin", "http://localhost:3000")
		c.Header("Content-Type", "application/json")

		c.JSON(200, quizzes)
	}
	db.Close()
}

func GetPeople(c *gin.Context) {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	var people []Person
	if err := db.Find(&people).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(people)
		c.Header("access-control-allow-credentials", "true")
		c.Header("access-control-allow-origin", "http://localhost:3000")
		c.Header("Content-Type", "application/json")

		c.JSON(200, people)
	}
	db.Close()
}
func PersonAuthenticate(c *gin.Context) {
	fmt.Println("function person authenticate")
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	var person Person
	c.BindJSON(&person)
	var check []Person
	var count int
	session, err := store.Get(c.Request, "session-name")
	if err != nil {
		fmt.Println(err)
	}
	db.Where("user_name = ? AND password = ?", person.UserName, person.Password).Find(&check).Count(&count)
	if count == 1 {

		session.Values["user"] = person.UserName
		session.Save(c.Request, c.Writer)
		c.Header("access-control-allow-credentials", "true")
		c.Header("access-control-allow-origin", "http://localhost:3000")
		c.Header("Content-Type", "application/json")
		c.JSON(200, person)
	} else {

		c.Header("access-control-allow-credentials", "true")
		c.Header("access-control-allow-origin", "http://localhost:3000")
		c.Header("Content-Type", "application/json")

		c.JSON(404, person)
	}
	db.Close()
}
