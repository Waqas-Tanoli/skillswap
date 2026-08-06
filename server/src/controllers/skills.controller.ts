
import { AuthRequest } from "../middleware/auth.middleware";
import Skill from "../models/skill";
export const createSkill = async (req: any, res: any) => {
  const { name, category } = req.body;

  const existing = await Skill.findOne({ name });

  if (existing) {
    return res.status(400).json({
      success: false,
      message: "Skill already exists",
    });
  }

  const skill = await Skill.create({ name, category });

  return res.status(201).json({
    success: true,
    message: "Skill created successfully",
    data: skill,
  });
};

// Get all skills
export const getAllSkills = async (req: any, res: any) => {
  const skills = await Skill.find().sort({ category: 1 });

  return res.status(200).json({
    success: true,
    count: skills.length,
    data: skills,
  });
};

// Get skill by ID
export const getSkillById = async (req: any, res: any) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: skill,
  });
};

// Update skill
export const updateSkill = async (req: any, res: any) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill not found",
    });
  }

  const updated = await Skill.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after" }
  );

  return res.status(200).json({
    success: true,
    message: "Skill updated successfully",
    data: updated,
  });
};

// Delete skill
export const deleteSkill = async (req: any, res: any) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill not found",
    });
  }

  await Skill.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Skill deleted successfully",
  });
};
// Request skill
export const requestSkill = async (
  req: AuthRequest,
  res: any
) => {
  const {
    name,
    category,
  } = req.body;

  const existing =
    await Skill.findOne({
      name: {
        $regex: new RegExp(
          `^${name}$`,
          "i"
        ),
      },
    });

  if (existing) {
    return res.status(400).json({
      success: false,

      message:
        "Skill already exists.",
    });
  }

  const skill =
    await Skill.create({
      name,

      category,

      status: "Pending",

      requestedBy:
        req.user?.id,
    });

  return res.status(201).json({
    success: true,

    message:
      "Skill request submitted successfully.",

    data: skill,
  });
};

// Approve skill
export const approveSkill = async (req: any, res: any) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill not found",
    });
  }

  skill.status = "Approved";
  await skill.save();

  return res.status(200).json({
    success: true,
    message: "Skill approved successfully",
    data: skill,
  });
}

// Reject skill
export const rejectSkill = async (req: any, res: any) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill not found",
    });
  }

  skill.status = "Rejected";
  await skill.save();

  return res.status(200).json({
    success: true,
    message: "Skill rejected successfully",
    data: skill,
  });
}

// Get all approved skills
export const getSkills =
  async (
    req: any,
    res: any
  ) => {
    const skills =
      await Skill.find({
        status: "Approved",
      }).sort({
        category: 1,
        name: 1,
      });

    return res.status(200).json({
      success: true,

      count:
        skills.length,

      data: skills,
    });
  };

  //get all pending skills
  export const getPendingSkills =
  async (
    req: any,
    res: any
  ) => {
    const skills =
      await Skill.find({
        status: "Pending",
      })
        .populate(
          "requestedBy",
          "username email"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,

      count:
        skills.length,

      data: skills,
    });
  };