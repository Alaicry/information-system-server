import jwt from "jsonwebtoken";

const generateJwt = (id, email, role, firstName, lastName) => {
	return jwt.sign(
		{ id, email, role, firstName, lastName },
		process.env.SECRET_KEY,
		{
			expiresIn: "24h",
		}
	);
};

export default generateJwt;
