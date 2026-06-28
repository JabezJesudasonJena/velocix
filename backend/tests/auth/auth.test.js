import { describe,  it, expect, test} from "vitest";
import app from "../../src/index.mjs"
import request from "supertest"


describe("Test the Signup", () => {
    const endPoint = "/api/auth/signup"
    const userPayLoad = {
        email: "test1313123@gmail.com", password: "test123", name: "test",  role: "consumer"
    };

    it("Should register a user", async() => {
        const res = await request(app).post(endPoint).send(userPayLoad);
        expect(res.status).toBe(400);    
        //expect(res.body).toBeDefined();
    })

    it("Should sign in a user", async() => {
        const res = await request(app).post("/api/auth/signin").send(userPayLoad);
        expect(res.status).toBe(200);
    })
})