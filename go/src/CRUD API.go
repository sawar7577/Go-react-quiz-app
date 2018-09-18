package main

import (
	"fmt"

	"github.com/gin-contrib/cors" // Why do we need this package?
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB // declaring the db globally
var err error

type Person struct {
	ID        uint   `gorm:"primary_key" json:"id"`
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

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
	db.AutoMigrate(&Person{})
	fmt.Printf("idhar")

	db.AutoMigrate(&Quiz{})
	db.AutoMigrate(&Question{})
	db.AutoMigrate(&Option{})

	r := gin.Default()
	r.POST("/person", CreatePerson)
	r.Use((cors.Default()))
	r.Run(":8080") // Run on port 8080
}

func CheckUsername(c *gin.Context) {
	username := c.Params.ByName("UserName")
	rows := db.Where("UserName = ?", username).Find(&Person{})
	defer rows.Close()
	if rows != nil {
		c.JSON(200, gin.H{"success": "true"})
	} else {
		c.JSON(200, gin.H{"success": "false"})
	}
}

func CreatePerson(c *gin.Context) {
	var person Person
	c.BindJSON(&person)
	db.Create(&person)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, person)
}