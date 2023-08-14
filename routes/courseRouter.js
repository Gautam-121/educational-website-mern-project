const express = require("express")
const router = express.Router()
const {registeredCourse , registerIstructor , registerdOnlineCourse , getCourses , getOnlineCourses} = require("../controller/courseController.js")

router.route("/registerInstructor").post(registerIstructor)

router.route("/registeredCourse").post(registeredCourse)

router.route("/registerdOnlineCourse").post(registerdOnlineCourse)

router.route("/getCourses").get(getCourses)

router.route("/getOnlineCourses").get(getOnlineCourses)


module.exports = router