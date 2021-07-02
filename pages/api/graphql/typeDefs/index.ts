import { readFileSync } from "fs";

const user: string = readFileSync(__dirname + "/user.gql", { encoding: "utf-8" })
const ad: string = readFileSync(__dirname + "/ad.gql", { encoding: "utf-8" })
const query: string = readFileSync("./query.gql", { encoding: "utf-8" })

export default [user, ad, query]