import { describe,  it, expect, test} from "vitest";
import app from "../../src/index.mjs"
import request from "supertest"
import { renew } from "supertest/lib/cookies";

describe('Product', () => {  
    const endPoint = "/api/product"
    it("Add Product", async() => {
        const res = await request(app).post(`${endPoint}/create`).send("test no data");
        expect(res.status).toBe(401);
    })
    it("Gets all products", async() => {
        const res = await request(app).get(endPoint);
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    })
})
