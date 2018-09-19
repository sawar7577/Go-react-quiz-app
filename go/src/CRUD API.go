package main

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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
	ID        uint `gorm:"primary_key" json:"id"`
	Questions []Question
}

type Question struct {
	ID      uint   `gorm:"primary_key" json:"id"`
	Ques    string `json:"ques"`
	Options []Option
}

type Option struct {
	ID     uint `gorm:"primary_key" json:"id"`
	option string
	val    bool
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

	r := gin.Default()
	r.POST("/person", CreatePerson)
	r.POST("/person/", CheckUsername)
	r.POST("/person/authenticate", PersonAuthenticate)
	r.Use((cors.Default()))
	r.Run(":8080") // Run on port 8080
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
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, false)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, true)
	}
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
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, person)
	db.Close()
}

func PersonAuthenticate(c *gin.Context) {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	var person Person
	c.BindJSON(&person)
	var check []Person
	var count int
	db.Where("user_name = ? AND password = ?", person.UserName,person.Password).Find(&check).Count(&count)
	if count == 1 {
		c.JSON(200, check)
	} else {
		c.JSON(404, check)
	}
	db.Close()
}
