import { describe,  it, expect, test} from "vitest";
import app from "../../../src/index.mjs"
import request from "supertest"


describe("Test the Signup", () => {
    const endPoint = "/api/auth/signup"
    const userPayLoad = {
        email: "test1313123@gmail.com", password: "test123", name: "test",  role: "test"
    };

    it("Should register a user", async() => {
        const res = await request(app).post(endPoint).send(userPayLoad);
        expect(res.status).toBe(201)    
        expect(res.body).toBeDefined();
    })
})