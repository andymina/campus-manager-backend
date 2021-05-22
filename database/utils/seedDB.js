const { Campus, Student } = require('../models');

const seedDB = async () => {
	const dummy_campus = await Campus.create({
		name: "Hunter College",
		imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Hunter_College_logo.svg/1200px-Hunter_College_logo.svg.png",
		address: "695 Park Ave, New York, NY 10065",
		description: "This is a school in NYC."
	});
	const dummy_campus2 = await Campus.create({
		name: "Harvard",
		imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png",
		address: "86 Brattle Street, Cambridge, MA 02138",
		description: "This is a school in MA."
	});

	const dummy_student = await Student.create({
			firstname: "Joe",
      lastname: "Shmo",
			email: "joes@gmail.com",
			imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Stick_Figure.svg/1200px-Stick_Figure.svg.png",
			gpa: 3.2
		});

	await dummy_student.setCampus(dummy_campus);

}

module.exports = seedDB;
