const Student = require('../models/student');

exports.getAddUserPage = (req, res, next) => {
    res.render('admin/add-user');
}

exports.postAddUser = (req, res, next) => {
    const studentId = req.body.studentId;
    const studentName = req.body.studentName;
    const email = req.body.email;
    const Class = req.body.class;
    const year = req.body.year;
    const city = req.body.city;
    const country = req.body.country;
    const student = new Student({
        studentId: studentId,
        studentName: studentName,
        email: email,
        class: Class,
        year: year,
        city: city,
        country: country
    });

    student.save()
        .then((result) => {
            console.log(result)
            res.redirect('/admin/dashboard');
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getEditStudent = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/admin/dashboard');
    }
    const stId = req.params.studentId;
    Student.findById(stId)
        .then((student) => {
            if(!student) {
                return res.redirect('/admin/dashboard')
            }
            res.render('admin/edit-user', {
                student: student,
                editing: editMode
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.postEditStudent = (req, res, next) => {
    const stId = req.body.studentId2;
    const updatedStudentId = req.body.studentId;
    const updatedStudentName = req.body.studentName;
    const updatedEmail = req.body.email;
    const updatedClass = req.body.class;
    const updatedYear = req.body.year;
    const updatedCity = req.body.city;
    const updatedCountry = req.body.country;

    Student.findById(stId)
        .then((student) => {
            student.studentId = updatedStudentId;
            student.studentName = updatedStudentName;
            student.email = updatedEmail;
            student.class = updatedClass;
            student.year = updatedYear;
            student.city = updatedCity;
            student.country = updatedCountry;
            return student.save()
        })
        .then((result) => {
            console.log('student Updated');
            res.redirect('/admin/dashboard');
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.postDeleteStudent = (req, res, next) => {
    const stId = req.body.studentId2;

    Student.findByIdAndDelete(stId)
        .then(() => {
            console.log('student deleted');
            res.redirect('/admin/dashboard');
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getStudents = (req, res, next) => {
    Student.find()
        .then((student) =>{
            res.render('admin/users', {
                students: student
            })
        })
        .catch((err) => {
            console.log(err);
        })
}