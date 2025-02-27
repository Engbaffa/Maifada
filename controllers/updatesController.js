const createUpdate = async (req, res) => {
  const { title, body, levelId, sessionId, deadlineDate } = req.body;
  if (!title || !body || !deadlineDate) {
    return res
      .status(400)
      .jsno({ message: "Title, Body and Deadlines are mandatory" });
  }
  if (!levelId && !sessionId) {
    return res
      .status(400)
      .jsno({ message: "Either Level or Session are mandatory" });
  }

  try {
    if (levelId) {
      const levelExists = await Prisma.level.findUnique({
        where: {
          id: parseInt(levelId),
        },
      });
      if (!levelExists) {
        return res.status(400).json({ message: "Level doese'nt exists" });
      }
    }
    if (sessionId) {
      const sessionExists = await Prisma.level.findUnique({
        where: {
          id: parseInt(levelId),
        },
      });
      if (!sessionExists) {
        return res.status(400).json({ message: "Level doese'nt exists" });
      }
    }

    const newUpdate = await Prisma.update.create({
      data: {
        title,
        body,
        levelId: parseInt(levelId) || null,
        sessionId: parseInt(sessionId) || null,
        deadlineDate,
      },
    });
    if (!newUpdate) {
      return res.json({ message: "new update not creaated" });
    }
    return res.status(201).json({ message: "New update created " + newUpdate });
  } catch (error) {
    console.error("Error Creating Update:", error);
    if (error instanceof prisma.prismaClientKnownRequestError) {
      return res
        .status(500)
        .json({ message: "Database error", error: error.message });
    }
    return res
      .status(500)
      .json({ message: "Error Creating Update", error: error.message });
  }
};

const getAllUpdates = async (req, res) => {
  try {
    const allUpdates = await prisma.update.findMany({
      where: {
        deadlineDate: deadlineDate > new Date(),
      },
    });
    if (!allUpdates || allUpdates.length === 0) {
      return res.status(400).json({ message: "No updated found" });
    }
    return res.status(200).json(allUpdates);
  } catch (error) {
    console.error("Error Getting Updates:", error);
    if (error instanceof prisma.prismaClientKnownRequestError) {
      return res
        .status(500)
        .json({ message: "Database error", error: error.message });
    }
    return res
      .status(500)
      .json({ message: "Error Getting Updates", error: error.message });
  }
};

const getUpdateById = async (req, res) => {
  const { id } = req.body;
  try {
    const update = await prisma.update.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!update) {
      return res.status(400).json({ message: "update not available" });
    }
  } catch (error) {
    console.error("Error getting update " + error);
    if (error instanceof pris.prismaClientKnownRequestError) {
      return res
        .status(500)
        .json({ message: "Database Error ", error: error.message });
    }
    return res
      .status(500)
      .json({ message: "Error getting student ", error: error.message });
  }
};

const editUpdate = async (req, res) => {
  const { id } = req.params;
  const { title, body, levelId, sessionId } = req.body;
  try {
    const update = await prisma.findUnique({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        body,
        levelId: parseInt(levelId),
        sessionId: parseInt(sessionId),
      },
    });
  } catch (error) {
    console.error("Error Editing Update ", error);
    if (error instanceof prisma.prismaClientKnownRequestError) {
      return res
        .status(500)
        .json({ message: "Database Error ", error: error.message });
    }
    return res
      .status(500)
      .json({ message: "Error Editing Update", error: error.message });
  }
};

const deleteUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUpdate = await prisma.update.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!deletedUpdate) {
      return res.status(400).json({ message: "Update not deleted" });
    }
    return res.status(200).json({ message: "Updare deleted" });
  } catch (error) {
    console.error("Error deleting update ", error);
    if (error instanceof prisma.prismaClientKnownRequestError) {
      return res
        .status(500)
        .json({ message: "Database Error ", error: error.message });
    }
  }
};

export { createUpdate, getAllUpdates, getUpdateById, deleteUpdate, editUpdate };
/* 
set duration fro the update, 
deadline.
to fetch cheak and see if hte deadline is passed to get 

*/
