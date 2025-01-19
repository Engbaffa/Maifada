const createStudentLevel = async (req, res) => {
  const { id, sid } = req.body;
  if (!id || !sid) {
    return res.status(400).json({ message: "Alll fields are required" });
  }
  try {
    const studentLevel = await Prisma.studentLevel.create({
      data: {
        levelId: parseInt(id),
        studentId: parseInt(sid),
      },
    });
    if (!studentLevel) {
      return res.status(400).json({ message: "All fields are required" });
    }
    return res.status(200).json(studentLevel);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
const getStudentLevelById = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Al fields are mandatory" });
  }
  try {
    const student = await prisma.studentLevel.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!student) {
      return res.status(400).json({ message: "Student no dey" });
    }
    return res.status(200).json(student);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
const getAllStudentLevels = async (req, res) => {
  try {
    const allstudents = await prisma.studentLevel.findMany({});
    if (!allstudents) {
      return res.status(400).json({ message: "Students no dey" });
    }
    return res.status(200).json(allstudents);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
const deleteStudentLevel = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID IS REQUIRED" });
  }
  try {
    const deletedStudent = await prisma.studentLevel.delete({
      where: {
        id: parentInt(id),
      },
    });
    if (!deletedStudent) {
      return res.status(400).json({ message: "ALL Fields are mandatory" });
    }
    return res.status(200).json(deletedStudent);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
const updateStudentLevel = async (req, res) => {
  const { id } = req.params;
  const { studentId, levelId } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const updatedStudent = await prisma.studentLevel.update({
      where: {
        id: parseInt(id),
      },
      data: {
        studentId: parseInt(studentId),
        levelId: parseInt(levelId),
      },
    });
    if (!updatedStudent) {
      return res.status(400).json({ message: "student not updated" });
    }
    return res.status(200).json(updatedStudent);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};
const allStudentLevel = async (req, res) => {
  try {
    const students = await prisma.studentLevel.findMany({
      include: {
        payments,
        semesters,
      },
    });
    if (!students) {
      return res.status(400).json({ message: "Student no dey" });
    }
    return res.status(200).json(students);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};

export {
  createStudentLevel,
  getAllStudentLevels,
  getStudentLevelById,
  allStudentLevel,
  updateStudentLevel,
  deleteStudentLevel,
};
