const Student = require("../../models/student.model");
const Course = require("../../models/course.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/generateToken");
const checkAuth = require("../../utils/auth");
const { DynamicCourses } = require("./service");
module.exports = {
  Query: {},
  Mutation: {
    createStudent: async (_, args) => {
      const { email, password, name } = args.studentInput;
      const student = await Student.findOne({ email });
      if (student) {
        throw new Error("Student Already Exists");
      }
      try {
        const hashPassword = await bcrypt.hash(password, 12);
        const newStudent = new Student({
          email,
          password: hashPassword,
          name,
        });
        await newStudent.save();
        return newStudent;
      } catch (err) {
        throw new Error(err);
      }
    },
    loginStudent: async (_, { email, password }) => {
      const student = await Student.findOne({ email });
      if (!student) {
        throw new Error("Invalid Details");
      }

      const match = await bcrypt.compare(password, student.password);

      if (!match) {
        throw new Error("Invalid Details");
      }
      const token = generateToken(student, "STUDENT");
      return {
        ...student._doc,
        token,
      };
    },
    anrollCourse: async (_, { courseId }, context) => {
      const student = checkAuth(context, "STUDENT");
      const findStudent = await Student.findById(student._id);
      const findCourse = await Course.findById(courseId);
      if (!findCourse) {
        throw new Error("Course Not Found");
      }

      //TODO: check if student alreay anroll course
      const match = findCourse.students.find(
        (course) => course._id.toString()=== findStudent._id.toString()
      );
      console.log("match",match)
      if (match) {
        throw new Error("You Already Enroll this Course");
      } else {
        findCourse.students.push(findStudent._id);
        findStudent.anrollcourses.push(courseId);
        await findCourse.save();
        await findStudent.save();
        return {
          ...findStudent._doc,
          anrollcourses: DynamicCourses.bind(this, courseId),
        };
      }
    },
  },
};
