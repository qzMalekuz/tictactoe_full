const z = require("zod");

const userSchemaZ = z.object({
    username: z.string().min(3),
    password: z.string().min(6)
});

module.export = {
    userSchemaZ
}