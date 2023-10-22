import { Branch } from "../models/index.js";

class BranchController {
	async create(req, res) {

    
		const branch = await Branch.create({ name: req.body.name });
		return res.json({ branch });
	}
}

export default new BranchController();
