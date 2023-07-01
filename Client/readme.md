<h1 align="center"><b>Boss 2.0 API</b></h1>

<h4 align="center"> 🧑‍💻 API to retrieve past BOSS bidding results data </h4>
<h6 align="center"> By: Siang Meng (https://github.com/DemonDia) </h6>

<p align ="center">
<img src="https://img.shields.io/github/license/DemonDia/Boss-2.0?style=flat-square" alt="licence"/>
<img src="https://img.shields.io/github/forks/DemonDia/Boss-2.0?style=flat-square" alt="forks"/>
<img src="https://img.shields.io/github/stars/DemonDia/Boss-2.0?style=flat-square" alt="stars"/>
<img src="https://img.shields.io/github/issues/DemonDia/Boss-2.0?style=flat-square" alt="issues"/>
</p>

# Table of Contents  
- [Tech stacks 🤖](#tech-stacks-)
- [Links 🔗](#links-)
- [Schema 📦](#schema-)
- [Endpoints 📍](#endpoints-)
	- [Get module names](#modsnamettermyyear)
	- [Get module codes](#modscodettermyyear)
	- [Get professor names](#modsprofttermyyear)
	- [Get median of professor & module](modsmedianroundwindowcodeprof)
	- [Get median of module, grouped by professors](modsmedianmodprofroundwindowcode)
- [Try me 💪](#try-me-)
- [Feedbacks/Suggestions 📓](#feedbackssuggestions-)




## Tech Stacks 🤖

<hr/>

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


## Links 🔗

> [API Live Link](https://boss2-0.onrender.com/)
> [MongoDB Atlas](https://www.mongodb.com/atlas/database)


## Schema 📦
<hr/>

| Name                   | Description                                                                          | Data Type | Format (if any)                   |
| :--------------------- | :----------------------------------------------------------------------------------- | :-------- | :-------------------------------- |
| Term                   | The academic term and year which a module is at                                      | String    | {year}-{year} Term {term_number}} |
| Session                | Type of Academic Session                                                             | String    | -                                 |
| Bidding_Window         | The bidding window which the module is available at                                  | String    | Round {round} Window {window}     |
| Course_Code            | The course code of a module.                                                         | String    | -                                 |
| Description            | The name of the module                                                               | String    | -                                 |
| Section                | The section of the module                                                            | String    | G{section_number}                 |
| Vacancy                | The number of vacancies                                                              | Integer   | -                                 |
| Opening_Vacancy        | The number of vacancies opened                                                       | Integer   | -                                 |
| Before_Process_Vacancy | The number of vacancies before the BOSS bidding window ends                          | Integer   | -                                 |
| DICE                   | The number of time that module is dropped due to DICE (Drop if Course Exceeds))      | Integer   | -                                 |
| After_Process_Vacancy  | The number of vacancies after the BOSS bidding window ends                          | Integer   | -                                 |
| Enrolled_Students      | The number of students enrolled                                                      | Integer   | -                                 |
| Median_Bid             | The median bid of a module after the window ends                                     | Integer   | -                                 |
| Min_Bid                | The min/lowest bid of a module after the window ends                                 | Integer   | -                                 |
| Instructor             | The name of the Instructor/Professor that is teaching that module at a given section | String    | -                                 |
| School_Department      | The school which the module belongs to. Eg: SOA stands for School of Accountancy     | String    | SO{school_letter}                 |

## Endpoints 📍
<hr/>

<h4>GET methods</h4>

<h5>/mods/name/t/{term}/y/{year}</h5>

Get the names of all the available modules for each academic term

<h6>Parameters</h6>

| Name | Required | Type    | Description                                                                             |
| ---- | -------- | ------- | --------------------------------------------------------------------------------------- |
| term | required | Integer | The term inside the academic term. Eg: 1, 2 , 3A, 3B                                    |
| year | required | String  | The year inside the academic term. Eg: Academic years starting in 2023 will be: 2023-24 |

<h6>Response</h6>

```json
// successful (status 200)
{
	"data":[
		"mod_name_1",
		"mod_name_2",
		....
	]
}
```

<h5>/mods/code/t/{term}/y/{year}</h5>

Get the course codes of all the available modules for each academic term

<h6>Parameters</h6>

| Name | Required | Type    | Description                                                                             |
| ---- | -------- | ------- | --------------------------------------------------------------------------------------- |
| term | required | Integer | The term inside the academic term. Eg: 1, 2 , 3A, 3B                                    |
| year | required | String  | The year inside the academic term. Eg: Academic years starting in 2023 will be: 2023-24 |

<h6>Response</h6>

```json
// successful (status 200)
{
	"data":[
		"mod_code_1",
		"mod_code_2",
		....
	]
}
```

<h5>/mods/prof/t/{term}/y/{year}</h5>

Get all the professor names for each academic term

<h6>Parameters</h6>

| Name | Required | Type    | Description                                                                             |
| ---- | -------- | ------- | --------------------------------------------------------------------------------------- |
| term | required | Integer | The term inside the academic term. Eg: 1, 2 , 3A, 3B                                    |
| year | required | String  | The year inside the academic term. Eg: Academic years starting in 2023 will be: 2023-24 |

<h6>Response</h6>

```json
// successful (status 200)
{
	"data":[
		"professor_name_1",
		"professor_name_2",
		....
	]
}
```

<h5>/mods/median/{round}/{window}/{code}/{prof}</h5>

Get median bidss for a module taken by a given professor

<h6>Parameters</h6>

| Name   | Required | Type    | Description                                                  |
| ------ | -------- | ------- | ------------------------------------------------------------ |
| round  | required | Integer | The round for each bidding period.                           |
| window | required | Integer | The window for each bidding round per bidding period.        |
| code   | required | String  | The course code of any given module.                         |
| prof   | required | String  | The name of the instructor that is teaching the given module |

<h6>Response</h6>

```json
// successful (status 200)
{
	"data":[
		{
			"median_Bid": 15.99,
			"Term": "2021-22 Term 1"
		},
		....
	]
}

// no results (status 404)
{
	"message": "No records found"
}

// other errors (status 500)
{
	"message": "Something went wrong" 
}
```

<h5>/mods/median/mod/prof/{round}/{window}{code}</h5>

Get median bids for a module taken, grouped based on the professor

<h6>Parameters</h6>

| Name   | Required | Type    | Description                                           |
| ------ | -------- | ------- | ----------------------------------------------------- |
| round  | required | Integer | The round for each bidding period.                    |
| window | required | Integer | The window for each bidding round per bidding period. |
| code   | required | String  | The course code of any given module.                  |

<h6>Response</h6>

```json
// successful (status 200)
{
	"data":{
		"Prof name":[
			{
				"Median_Bid":10,
				"Term": "2019-20 Term 1"
			},
			....
		],
		....
	}
}

// no results (status 404)
{
	"message": "No records found"
}

// other errors (status 500)
{
	"message": "Something went wrong" 
}
```

## Try me 💪
<hr/>

1. Clone this repository
2. Go to your project directory
3. Type the following in your terminal:
``` 
pip install -r requirements.txt 
npm install

```

4. Create your .env file to store environment variables. It should look something like this:


```
MONGODB_URL = <your_mongodb_url>
```
**NOTE: I suggest using MongoDb Atlas for this. You can start using it [here](https://www.mongodb.com/atlas/database)**.

5. Type this in the terminal to seed the data into the database

```
python seeding.py 
```

7. Type this in the terminal to run the ExpressJS API

```
npm run dev
```

8. Have fun! ❤️

## Feedbacks/Suggestions 📓
<hr/>

Create an issue in this repository 👍

